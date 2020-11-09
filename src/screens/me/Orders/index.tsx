import React, {useEffect} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import {BackArrow} from '../../../components/Header/HeaderItems';
import {MeStackProps} from '../../../navigation/me/types';
import {TradeState} from '../../../store/trade/types';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {Spread} from '../../../model';
import {Colors, Fonts} from '../../../styles';
import {DEVICE_WIDTH, White_Shadowed} from '../../../styles/util';
import {getOrder} from '../../../services/tradier/account';
import store from '../../../store';
import {addOrder, addOrderIds, addTrades} from '../../../store/trade/actions';
import {ROUTES} from '../../../util/routes';
import firestore from '@react-native-firebase/firestore';
import {UserState} from '../../../store/user/types';
import {getTrades} from '../../../services/trades';

type Props = MeStackProps & {
  trade: TradeState;
  user: UserState;
};

export const OrdersBase = (props: Props) => {
  // console.log('orders props: ', props.trade);
  useEffect(() => {
    // Listen for instructors that go online
    const subscriber = firestore()
      .collection('orders')
      .doc(props.user.email)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const orderIds: string[] = querySnapshot.data()!.orders;
          store.dispatch(addOrderIds(orderIds));
          getOrdersFromTradier(orderIds);
        }
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [props.trade.accountId, props.trade.orders, props.user.email]);

  // console.log('OrdersBase props:', props);
  useEffect(() => {
    // props.trade.trades
    if (
      Object.keys(props.trade.trades).length !== props.trade.orderIds.length
    ) {
      getTrades(props.user.email!).then((trades) => {
        store.dispatch(addTrades(trades.data!.data()!.trades));
      });
    }
  }, []);

  function getOrdersFromTradier(orderIds: string[]) {
    orderIds.map((orderId) => {
      const index = props.trade.orders.findIndex((x) => {
        // eslint-disable-next-line eqeqeq
        return x.id.toString() == orderId;
      });
      if (index === -1) {
        getOrder(props.trade.accountId, orderId, '').then((tradierOrder) => {
          if (tradierOrder) {
            if (tradierOrder.strategy === 'spread') {
              store.dispatch(addOrder(tradierOrder as Spread));
            }
          }
        });
      }
    });
  }

  const trades = props.trade.orders ? (
    props.trade.orders.map((order: Spread) => {
      return (
        <TradierOrder
          tradeState={props.trade}
          order={order}
          key={order.id}
          onPress={(status: number) => {
            if (status === 0) {
              // open
              props.navigation.navigate(ROUTES.Spread, {spread: order});
            } else if (status === 1) {
              // closed
              notifyUserThatTradeWasSold();
            }
          }}
        />
      );
    })
  ) : (
    <Text>No Orders</Text>
  );

  function notifyUserThatTradeWasSold() {
    Alert.alert('Trade was already sold', '', [
      {text: 'OK', onPress: () => {}},
    ]);
  }

  return (
    <View style={styles.container}>
      <Header
        leftButton={{
          child: BackArrow,
          onclick: () => props.navigation.goBack(),
        }}
        showBottomBorder
        showLogo
      />
      <ScrollView style={styles.scrollView}>{trades}</ScrollView>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  trade: state.tradeReducer,
});

const mapDispatchToProps = () => ({});

export const Orders = connect(mapStateToProps, mapDispatchToProps)(OrdersBase);

type TradierOrderProps = {
  order: Spread;
  onPress(status: number): void;
  tradeState: TradeState;
};

const TradierOrder = (props: TradierOrderProps) => {
  const {order, onPress, tradeState} = props;
  const legOne = tradeState.positions[order.leg[0].option_symbol];
  let status = legOne ? 'Open' : 'Sold';
  if (order.status !== 'filled') {
    status = 'Pending';
  }
  const trade = tradeState.trades[order.id];
  return (
    <TouchableHighlight
      onPress={() => onPress(status === 'Open' ? 0 : 1)}
      style={styles.order}>
      <View style={styles.orderInfoContainer}>
        <View style={styles.left}>
          <Text style={styles.symbol}>{order.symbol}</Text>
          <Text style={styles.label}>
            Cost: ${(trade && trade.totalPrice * 100) || 0}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.label}>Status: {status}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  title: {
    ...Fonts.h1,
    alignSelf: 'center',
  },

  order: {
    // height: 100,
    width: DEVICE_WIDTH / 1.2,
    alignSelf: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    ...White_Shadowed,
  },

  orderInfoContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 10,
  },

  left: {
    flex: 2,
  },

  right: {
    flex: 3,
  },

  symbol: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
  },

  label: {
    fontSize: Fonts.normal,
  },
});
