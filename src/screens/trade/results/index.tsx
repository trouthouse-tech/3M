import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {POTENTIAL_TRADES} from './data';
import {TradeStackProps} from '../../../navigation/trade/types';
import {PotentialTrade} from './trade';
import Header from '../../../components/Header';
import {BackButton} from '../../../components/Header/HeaderItems';
import {SimpleTicker} from '../../../components/tickers/simple';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {TradeState} from '../../../store/trade/types';
import {DEVICE_WIDTH} from '../../../styles/util';
import {Trade} from './types';
import {ROUTES} from '../../../util/routes';

type Props = TradeStackProps & {
  tradeReducer: TradeState;
};

function FormResultsBase(props: Props) {
  console.log('props: ', props);
  const {quote} = props.tradeReducer;
  const tradeComponents = POTENTIAL_TRADES.map((trade, index) => {
    return (
      <PotentialTrade
        key={index}
        trade={trade}
        onPress={() => handleOnPurchase(trade)}
      />
    );
  });

  function handleOnPurchase(trade: Trade) {
    props.navigation.push(ROUTES.OpenTrade, {trade});
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
        <ScrollView style={styles.tradeContainer}>{tradeComponents}</ScrollView>
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
});
