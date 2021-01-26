import React, {useEffect, useState} from 'react';
import {MeStackProps} from '../../navigation/me/types';
import {TradeStackProps} from '../../navigation/trade/types';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  GetQuoteResponse,
  MultiLegOrder,
  Quote,
  Spread,
  Trade,
} from '../../model';
import Header from '../../components/Header';
import {BackArrow} from '../../components/Header/HeaderItems';
import {getQuotes, multiLegOrder} from '../../services/tradier';
import {UserState} from '../../store/user/types';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import store from '../../store';
import {
  addOrder,
  addOrderId,
  addQuote,
  removePosition,
} from '../../store/trade/actions';
import {SimpleTicker} from '../../components/tickers/simple';
import {DEVICE_WIDTH} from '../../styles/util';
import {Colors, Fonts} from '../../styles';
import {TradeState} from '../../store/trade/types';
import {Buttons} from 'golfpro-rn-components';
import {getOrder} from '../../services/tradier/account';
import moment from 'moment';
import {addOrderIdToFirebase} from '../../services/orders';
import {LoadingScreen} from '../../components/ActivityIndicator';

type Props = (MeStackProps | TradeStackProps) & {
  user: UserState;
  trade: TradeState;
};

const HEADER = ['Leg', 'Strike', 'Cost'];

export const SpreadViewBase = (props: Props) => {
  // console.log('spread props: ', props.trade);
  // @ts-ignore
  const spread = props.route.params.spread as Spread;
  // console.log('spread: ', spread);
  const [quote, setQuote] = useState<Quote | null>(null);
  const cost = Math.ceil(
    (spread.leg[0].avg_fill_price - spread.leg[1].avg_fill_price) * 100,
  );
  const [currentLegOne, setCurrentLegOne] = useState<Quote>(
    props.trade.quotes[spread.leg[0].option_symbol],
  );
  const [currentLegTwo, setCurrentLegTwo] = useState<Quote>(
    props.trade.quotes[spread.leg[1].option_symbol],
  );
  const [trade] = useState(props.trade.trades[spread.id]);
  // console.log('trade: ', trade);

  const daysHeld = currentLegOne
    ? new Date(currentLegOne.trade_date).getTime()
    : 0;
  const differenceInTime = new Date().getTime() - daysHeld;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  // console.log('currentLegOne: ', currentLegOne);
  // console.log('currentLegTwo: ', currentLegTwo);

  const currentCost =
    currentLegOne &&
    currentLegTwo &&
    (currentLegOne.last - currentLegTwo.last) * 100;

  useEffect(() => {
    if (props.trade.positions[spread.leg[0].option_symbol] && !currentLegOne) {
      setCurrentLegOne(props.trade.quotes[spread.leg[0].option_symbol]);
    } else if (
      props.trade.positions[spread.leg[1].option_symbol] &&
      !currentLegTwo
    ) {
      setCurrentLegTwo(props.trade.quotes[spread.leg[1].option_symbol]);
    }
  }, [currentLegOne, currentLegTwo, props.trade.positions, props.trade.quotes]);

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
  }, [
    props.user.tradierAccessToken,
    spread.id,
    spread.symbol,
    props.trade.quotes,
    quote,
  ]);

  const headerRow = <Row values={HEADER} />;
  const legOne = (
    <Row
      values={[
        'Leg 1',
        parseStrike(spread.leg[0].option_symbol) + '',
        spread.leg[0].avg_fill_price + '',
      ]}
      isMiddleRow
    />
  );
  const legTwo = (
    <Row
      values={[
        'Leg 2',
        parseStrike(spread.leg[1].option_symbol) + '',
        spread.leg[1].avg_fill_price + '',
      ]}
    />
  );

  function parseStrike(strike: string) {
    const parsedStrike = strike.substring(strike.length - 8);
    // eslint-disable-next-line radix
    return parseInt(parsedStrike) / 1000;
  }

  function confirmSellIntent() {
    setShowActivityIndicator(true);
    Alert.alert(
      'Are you sure you want to sell this spread?',
      `Sell for: $${currentCost.toFixed(2)}`,
      [
        {
          text: 'Cancel',
          onPress: () => setShowActivityIndicator(false),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleOnSell(),
        },
      ],
    );
  }

  async function handleOnSell() {
    const longPosition = props.trade.positions[trade.legOne.option_symbol];
    const shortPosition = props.trade.positions[trade.legTwo.option_symbol];
    const multiLeg: MultiLegOrder = {
      account_id: props.trade.accountId,
      class: 'multileg',
      symbol: trade.root_symbol,
      'option_symbol[0]': longPosition.symbol,
      'side[0]': 'sell_to_close',
      'quantity[0]': '1',
      'option_symbol[1]': shortPosition.symbol,
      'side[1]': 'buy_to_close',
      'quantity[1]': '1',
      type: 'market',
      duration: 'day',
      // preview: 'true',
    };

    await multiLegOrder(props.trade.accountId, multiLeg).then(async (order) => {
      await addOrderIdToFirebaseDocument(props.user.email!, order.id);
      await getOrder(props.trade.accountId, order.id, '').then(
        async (tradierOrder) => {
          if (tradierOrder) {
            if (tradierOrder.strategy === 'spread') {
              store.dispatch(addOrder(tradierOrder as Spread));
              await updatePositions(tradierOrder as Spread);
            }
          }
        },
      );
    });
  }

  async function addOrderIdToFirebaseDocument(email: string, orderId: string) {
    const orderIds = [...props.trade.orderIds];
    orderIds.push(orderId);
    await addOrderIdToFirebase(props.user.email!, orderIds);
    store.dispatch(addOrderId(orderId));
  }

  async function updatePositions(spreadToRemove: Spread) {
    store.dispatch(removePosition(spreadToRemove.leg[0].option_symbol));
    store.dispatch(removePosition(spreadToRemove.leg[1].option_symbol));
    // props.navigation.goBack();
    setShowActivityIndicator(false);
    props.navigation.popToTop();
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
            <Text style={styles.boldedValue}>
              ${(currentCost && currentCost.toFixed(2)) || 0}
            </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Change: </Text>
          <Text style={styles.label}>
            <Text>${(currentCost - cost).toFixed(2) || 0} </Text>
            <Text style={styles.boldedValue}>
              ({((currentCost - cost) / cost).toFixed(2)}%){' '}
            </Text>
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
            <Text>${trade.maxProfitDollars} </Text>
            <Text style={styles.boldedValue}>
              ({trade.maxProfitPercentage}%){' '}
            </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Break Even: </Text>
          <Text style={styles.label}>
            <Text>${trade.breakEven.toFixed(2)} </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Expiration Date: </Text>
          <Text style={styles.label}>
            {currentLegOne && moment(currentLegOne.expiration_date).format('L')}{' '}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Days Held: </Text>
          <Text style={styles.label}>{Math.floor(differenceInDays + 0.5)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons.LargeSquareOnPress
            onPress={() => confirmSellIntent()}
            text="Sell"
            buttonColor={Colors.red}
            textColor={Colors.white}
          />
        </View>
      </View>
      {showActivityIndicator && <LoadingScreen />}
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
