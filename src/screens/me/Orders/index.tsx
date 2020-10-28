import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Header from '../../../components/Header';
import {BackArrow} from '../../../components/Header/HeaderItems';
import {MeStackProps} from '../../../navigation/me/types';
import {TradeState} from '../../../store/trade/types';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {Order, Quote, Spread} from '../../../model';
import {Colors, Fonts} from '../../../styles';
import {DEVICE_WIDTH, White_Shadowed} from '../../../styles/util';
import {getOrder} from '../../../services/tradier/account';
import store from '../../../store';
import {addOrder} from '../../../store/trade/actions';
import {ROUTES} from '../../../util/routes';

type Props = MeStackProps & {
  trade: TradeState;
};

export const OrdersBase = (props: Props) => {
  console.log('OrdersBase props:', props);
  useEffect(() => {
    props.trade.trades.map((orderId) => {
      getOrder(props.trade.accountId, orderId, '').then((tradierOrder) => {
        if (tradierOrder) {
          if (tradierOrder.strategy === 'spread') {
            store.dispatch(addOrder(tradierOrder as Spread));
          }
        }
      });
    });
  }, [props.trade.accountId, props.trade.trades]);

  const trades = props.trade.orders ? (
    props.trade.orders.map((order: Spread) => {
      return (
        <TradierOrder
          order={order}
          key={order.id}
          onPress={() =>
            props.navigation.navigate(ROUTES.Spread, {spread: order})
          }
        />
      );
    })
  ) : (
    <Text>No Orders</Text>
  );

  return (
    <View>
      <Header
        leftButton={{
          child: BackArrow,
          onclick: () => props.navigation.goBack(),
        }}
        showBottomBorder
        showLogo
      />
      {trades}
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
  order: Order;
  onPress(): void;
};

const TradierOrder = (props: TradierOrderProps) => {
  const {order, onPress} = props;
  return (
    <TouchableHighlight onPress={() => onPress()} style={styles.order}>
      <View style={styles.orderInfoContainer}>
        <View style={styles.left}>
          <Text style={styles.symbol}>{order.symbol}</Text>
          <Text style={styles.label}>Cost: 32</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.label}>Status: {order.status}</Text>
          {/*<Text style={styles.label}>Type: {order.side === ''}</Text>*/}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
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
