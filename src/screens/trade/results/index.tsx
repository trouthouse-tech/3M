import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TradeStackProps} from '../../../navigation/trade/types';
import {PotentialTrade} from './trade';
import Header from '../../../components/Header';
import {BackButton} from '../../../components/Header/HeaderItems';
import {SimpleTicker} from '../../../components/tickers/simple';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {TradeState} from '../../../store/trade/types';
import {DEVICE_WIDTH} from '../../../styles/util';
import {MultiLegOrder, Trade} from '../../../model';
import {ROUTES} from '../../../util/routes';
import {multiLegOrder} from '../../../services/tradier';
import {Fonts} from '../../../styles';

type Props = TradeStackProps & {
  tradeReducer: TradeState;
};

function FormResultsBase(props: Props) {
  console.log('props: ', props);
  // @ts-ignore
  const typeOfTrades = props.route.params.type;
  const {quote} = props.tradeReducer;
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
      },
    );
    props.navigation.push(ROUTES.OpenTrade, {trade: trade});
  }

  return (
    <View style={styles.container}>
      <Header
        leftButton={{
          child: BackButton,
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
