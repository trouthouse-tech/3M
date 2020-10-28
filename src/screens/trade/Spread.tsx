import React, {useEffect, useState} from 'react';
import {MeStackProps} from '../../navigation/me/types';
import {TradeStackProps} from '../../navigation/trade/types';
import {StyleSheet, Text, View} from 'react-native';
import {GetQuoteResponse, Quote, Spread} from '../../model';
import Header from '../../components/Header';
import {BackArrow} from '../../components/Header/HeaderItems';
import {getQuotes} from '../../services/tradier';
import {UserState} from '../../store/user/types';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import store from '../../store';
import {addQuote} from '../../store/trade/actions';
import {SimpleTicker} from '../../components/tickers/simple';
import {DEVICE_WIDTH} from '../../styles/util';
import {Colors, Fonts} from '../../styles';
import {TradeState} from '../../store/trade/types';
import {Buttons} from 'golfpro-rn-components';

type Props = (MeStackProps | TradeStackProps) & {
  user: UserState;
  trade: TradeState;
};

const HEADER = ['Leg', 'Strike', 'Cost'];

export const SpreadViewBase = (props: Props) => {
  // @ts-ignore
  const spread = props.route.params.spread as Spread;
  const [quote, setQuote] = useState<Quote | null>(null);
  const cost = Math.ceil(
    (spread.leg[0].avg_fill_price - spread.leg[1].avg_fill_price) * 100,
  );
  // console.log('spread: ', spread);

  useEffect(() => {
    if (!props.trade.quotes[spread.symbol]) {
      getQuotes(spread.symbol, props.user.tradierAccessToken!).then(
        (quotes: GetQuoteResponse) => {
          const spreadQuote = quotes.quotes.quote;
          setQuote(spreadQuote);
          store.dispatch(addQuote(spreadQuote));
        },
      );
    } else {
      setQuote(props.trade.quotes[spread.symbol]);
    }
  }, [props.user.tradierAccessToken, spread.id, spread.symbol]);

  const headerRow = <Row values={HEADER} />;
  const legOne = (
    <Row
      values={[
        'Leg 1',
        parseStrike(spread.leg[0].option_symbol.substring(10)) + '',
        spread.leg[0].avg_fill_price + '',
      ]}
      isMiddleRow
    />
  );
  const legTwo = (
    <Row
      values={[
        'Leg 2',
        parseStrike(spread.leg[1].option_symbol.substring(10)) + '',
        spread.leg[1].avg_fill_price + '',
      ]}
    />
  );

  function parseStrike(strike: string) {
    // eslint-disable-next-line radix
    return parseInt(strike) / 1000;
  }

  function handleOnSell() {
    console.log('sell');
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
      <View style={styles.main}>
        <View style={styles.table}>
          {headerRow}
          {legOne}
          {legTwo}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Purchase Price: </Text>
          <Text style={styles.label}>
            <Text style={styles.boldedValue}>${cost}</Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Current Value: </Text>
          <Text style={styles.label}>
            <Text style={styles.boldedValue}>${cost}</Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Change: </Text>
          <Text style={styles.label}>
            <Text>$0.00 </Text>
            <Text style={styles.boldedValue}>(0%) </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Probability: </Text>
          <Text style={styles.label}>
            <Text style={styles.boldedValue}>0% </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Max Profit: </Text>
          <Text style={styles.label}>
            <Text>$5 </Text>
            <Text style={styles.boldedValue}>
              (10%){' '}
            </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Break Even: </Text>
          <Text style={styles.label}>
            <Text>$11 </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Expiration Date: </Text>
          <Text style={styles.label}>10/20/2020 </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Days Held: </Text>
          <Text style={styles.label}>10 </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons.LargeSquareOnPress
            onPress={() => handleOnSell()}
            text="Sell"
            buttonColor={Colors.red}
            textColor={Colors.white}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  trade: state.tradeReducer,
  user: state.user,
});
const mapDispatchToProps = () => ({});
export const SpreadView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpreadViewBase);

type RowProps = {
  values: string[];
  showBottomBorder?: boolean;
  isMiddleRow?: boolean;
};

const Row = (props: RowProps) => {
  const showBorder = !!props.showBottomBorder;
  const isMiddleRow = !!props.isMiddleRow;

  return (
    <View
      style={[
        styles.row,
        showBorder ? styles.showBottomBorder : null,
        isMiddleRow ? styles.middleRow : null,
      ]}>
      <View style={styles.column}>
        <Text style={styles.value}>{props.values[0]}</Text>
      </View>
      <View style={[styles.column, styles.middleColumn]}>
        <Text style={styles.value}>{props.values[1]}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.value}>{props.values[2]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  table: {
    marginTop: 20,
    width: DEVICE_WIDTH / 1.2,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    height: 90,
    borderWidth: 0.5,
  },

  row: {
    flexDirection: 'row',
    height: 30,
    // backgroundColor: 'red',
  },

  middleRow: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },

  column: {
    flex: 1,
    alignItems: 'center',
    height: 30,
    // borderWidth: 0.5,
  },

  middleColumn: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },

  showBottomBorder: {
    // borderBottomWidth: 0.5,
  },

  value: {
    fontSize: Fonts.normal,
    padding: 5,
  },

  main: {
    alignSelf: 'center',
    width: DEVICE_WIDTH / 1.2,
    marginVertical: 10,
    justifyContent: 'space-evenly',
    flex: 1,
  },

  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },

  label: {
    fontSize: Fonts.normal,
  },

  boldedValue: {
    fontWeight: 'bold',
  },

  buttonContainer: {
    width: DEVICE_WIDTH / 1.2,
    alignItems: 'center',
  },
});
