import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {MeStackProps} from '../../navigation/me/types';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {ROUTES} from '../../util/routes';
import {UserState} from '../../store/user/types';
import {LogoutButton} from '../../components/Header/HeaderItems';
import {TradeState} from '../../store/trade/types';
import {Order} from '../trade/results/types';
import {DEVICE_WIDTH, White_Shadowed} from '../../styles/util';
import {Colors, Fonts} from '../../styles';

type Props = MeStackProps & {
  user: UserState;
  trade: TradeState;
};

const MeBase = (props: Props) => {
  async function handleSignOut() {
    await AsyncStorage.setItem('isInvestorLoggedIn', 'false');
    auth().signOut();
    props.navigation.reset({
      index: 0,
      routes: [{name: ROUTES.Authentication}],
    });
  }

  const trades = props.trade.orders ? (
    props.trade.orders.map((order) => {
      return TradierOrder(order);
    })
  ) : (
    <Text>No trades</Text>
  );

  return (
    <View>
      <Header
        showLogo
        showBottomBorder
        rightButton={{child: LogoutButton, onclick: () => handleSignOut()}}
      />
      <Text style={styles.title}>Trades</Text>
      {trades}
    </View>
  );
};

const TradierOrder = (order: Order) => {
  return (
    <TouchableHighlight
      onPress={() => console.log('order: ', order.id)}
      style={styles.order}
      key={order.id}>
      <View style={styles.orderInfoContainer}>
        <View style={styles.left}>
          <Text style={styles.symbol}>{order.symbol}</Text>
          <Text style={styles.label}>Cost: 123</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.label}>Status: {order.status}</Text>
          {/*<Text style={styles.label}>Type: {order.side === ''}</Text>*/}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  trade: state.tradeReducer,
});

const mapDispatchToProps = () => ({});

export const Me = connect(mapStateToProps, mapDispatchToProps)(MeBase);

const styles = StyleSheet.create({
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
