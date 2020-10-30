import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TradeStackProps} from '../../../navigation/trade/types';
import {PotentialTrade} from './trade';
import Header from '../../../components/Header';
import {BackArrow} from '../../../components/Header/HeaderItems';
import {SimpleTicker} from '../../../components/tickers/simple';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {TradeState} from '../../../store/trade/types';
import {DEVICE_WIDTH} from '../../../styles/util';
import {MultiLegOrder, Position, Spread, Trade} from '../../../model';
import {ROUTES} from '../../../util/routes';
import {
  getPositions,
  getQuotes,
  multiLegOrder,
} from '../../../services/tradier';
import {Fonts} from '../../../styles';
import {addTradeToFirebase} from '../../../services/trades';
import {UserState} from '../../../store/user/types';
import store from '../../../store';
import {
  addOrder,
  addOrderId,
  addPositions,
  addQuote,
  addTrade,
} from '../../../store/trade/actions';
import {getOrder} from '../../../services/tradier/account';
import {addOrderIdToFirebase} from '../../../services/orders';
import {LoadingScreen} from '../../../components/ActivityIndicator';

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
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const tradeComponents = props.tradeReducer.potentialTrades.map(
    (trade, index) => {
      return (
        <PotentialTrade
          key={index}
          trade={trade}
          onPress={() => confirmPurchaseIntent(trade)}
        />
      );
    },
  );

  function confirmPurchaseIntent(trade: Trade) {
    setShowActivityIndicator(true);
    Alert.alert(
      'Are you sure you want to purchase this spread?',
      `Total Cost: $${trade.totalPrice * 100}`,
      [
        {
          text: 'Cancel',
          onPress: () => setShowActivityIndicator(false),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleOnPurchase(trade),
        },
      ],
    );
  }

  async function handleOnPurchase(trade: Trade) {
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
      async (order) => {
        await addOrderIdToFirebaseDocument(props.user.email!, order.id);
        trade.orderId = order.id;
        await addTradeToFirebaseDocument(props.user.email!, trade);
        await getOrder(props.tradeReducer.accountId, order.id, '').then(
          async (tradierOrder) => {
            if (tradierOrder) {
              if (tradierOrder.strategy === 'spread') {
                store.dispatch(addOrder(tradierOrder as Spread));
                await updatePositions(tradierOrder as Spread);
              }
            }
          },
        );
      },
    );
  }

  async function addOrderIdToFirebaseDocument(email: string, orderId: string) {
    const orderIds = [...props.tradeReducer.orderIds];
    orderIds.push(orderId);
    await addOrderIdToFirebase(props.user.email!, orderIds);
    store.dispatch(addOrderId(orderId));
  }

  async function addTradeToFirebaseDocument(email: string, trade: Trade) {
    const tradeIds = Object.keys(props.tradeReducer.trades);
    const trades = tradeIds.map(
      (tradeId) => props.tradeReducer.trades[tradeId],
    );

    trades.push(trade);
    await addTradeToFirebase(props.user.email!, trades);
    store.dispatch(addTrade(trade));
  }

  async function updatePositions(spread: Spread) {
    await getPositions(props.tradeReducer.accountId, '').then((positions) => {
      if (positions) {
        store.dispatch(addPositions(positions));
        positions.map(async (position: Position) => {
          if (!props.tradeReducer.quotes[position.symbol]) {
            await addNewOptionQuote(position.symbol);
          }
        });
        setShowActivityIndicator(false);
        props.navigation.push(ROUTES.Spread, {
          spread,
        });
      }
    });
  }

  async function addNewOptionQuote(newSymbol: string) {
    await getQuotes(newSymbol, props.user.tradierAccessToken!).then(
      (newQuote) => {
        if (newQuote) {
          store.dispatch(addQuote(newQuote.quotes.quote));
        }
      },
    );
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
      {showActivityIndicator && <LoadingScreen />}
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
