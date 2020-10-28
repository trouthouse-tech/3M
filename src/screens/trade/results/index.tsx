import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TradeStackProps} from '../../../navigation/trade/types';
import {PotentialTrade} from './trade';
import Header from '../../../components/Header';
import {BackArrow} from '../../../components/Header/HeaderItems';
import {SimpleTicker} from '../../../components/tickers/simple';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {TradeState} from '../../../store/trade/types';
import {DEVICE_WIDTH} from '../../../styles/util';
import {MultiLegOrder, Trade} from '../../../model';
import {ROUTES} from '../../../util/routes';
import {multiLegOrder} from '../../../services/tradier';
import {Fonts} from '../../../styles';
import {addTradeToFirebase} from '../../../services/trades';
import {UserState} from '../../../store/user/types';
import store from '../../../store';
import {addTrade} from '../../../store/trade/actions';

type Props = TradeStackProps & {
  tradeReducer: TradeState;
  user: UserState;
};

function FormResultsBase(props: Props) {
  // console.log('props: ', props);
  // @ts-ignore
  const typeOfTrades = props.route.params.type;
  const symbol = props.tradeReducer.potentialTrades[0].root_symbol;
  const quote = props.tradeReducer.quotes[symbol];
  const tradeComponents = props.tradeReducer.potentialTrades.map(
    (trade, index) => {
      return (
        <PotentialTrade
          key={index}
          trade={trade}
          onPress={() => handleOnPurchase(trade)}
        />
      );
    },
  );

  async function handleOnPurchase(trade: Trade) {
    console.log('purchase trade: ', trade);
    const multiLeg: MultiLegOrder = {
      account_id: props.tradeReducer.accountId,
      class: 'multileg',
      symbol: trade.root_symbol,
      'option_symbol[0]': trade.legOne.option_symbol,
      'side[0]': 'buy_to_open',
      'quantity[0]': '1',
      'option_symbol[1]': trade.legTwo.option_symbol,
      'side[1]': 'sell_to_open',
      'quantity[1]': '1',
      type: 'market',
      duration: 'day',
      // preview: 'true',
    };

    await multiLegOrder(props.tradeReducer.accountId, multiLeg).then(
      (order) => {
        // console.log('legOne: ', option);
        // console.log('legTwo: ', legTwo);
        console.log('order: ', order);
        const trades = [...props.tradeReducer.trades];
        trades.push(order.id);
        addTradeToFirebase(props.user.email!, trades);
        store.dispatch(addTrade(order.id));
      },
    );
    props.navigation.push(ROUTES.OpenTrade, {trade: trade});
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
      <SimpleTicker
        symbol={quote?.symbol as string}
        last={quote?.last as number}
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.tradeContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            {typeOfTrades === 'Bullish'
              ? 'Bull Call Spreads'
              : 'Bear Put Spreads'}
          </Text>
          {tradeComponents}
        </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = (state: AppState) => ({
  tradeReducer: state.tradeReducer,
  user: state.user,
});
const mapDispatchToProps = () => ({});
export const FormResults = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormResultsBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tradeContainer: {
    width: DEVICE_WIDTH / 1.1,
    alignSelf: 'center',
  },

  title: {
    fontSize: Fonts.larger,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
});
