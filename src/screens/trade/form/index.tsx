import React, {useState} from 'react';
import {TradeStackProps} from '../../../navigation/trade/types';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header';
import {BackArrow} from '../../../components/Header/HeaderItems';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {TradeState} from '../../../store/trade/types';
import {Colors, Fonts} from '../../../styles';
import {InlineFormPicker} from './components/InlineFormPicker';
import {Option} from '../../../model';
import {FormTextInput} from './components/FormTextInput';
import {DoubleTextInput} from './components/DoubleTextInput';
import {Buttons} from 'golfpro-rn-components';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ROUTES} from '../../../util/routes';
import {SimpleTicker} from '../../../components/tickers/simple';
import {UserState} from '../../../store/user/types';
import store from '../../../store';
import {addPotentialTrades} from '../../../store/trade/actions';
import {LoadingScreen} from '../../../components/ActivityIndicator';
import {Leg, Trade} from '../../../model';

type Props = TradeStackProps & {
  tradeReducer: TradeState;
  user: UserState;
};

export function TradeFormBase(props: Props) {
  // console.log('props.route.params.quote: ', props.tradeReducer.quote);
  // console.log('props: ', props);
  // @ts-ignore
  const symbol = props.route.params.symbol;
  const quote = props.tradeReducer.quotes[symbol];
  const [expirationDate, setExpirationDate] = useState('');
  const [assumedTrend, setAssumedTrend] = useState('');
  const [calculatedTrend] = useState('Bullish');
  const [maxRisk, setMaxRisk] = useState('0');
  const [profitTargetPercentage, setProfitTargetPercentage] = useState('0');
  const [profitTargetDollars, setProfitTargetDollars] = useState('0');
  const [maxLossPercentage, setMaxLossPercentage] = useState('0');
  const [maxLossDollars, setMaxLossDollars] = useState('0');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const contentContainerStyle = {
    contentContainerStyle: styles.container,
  };

  async function handleOnSubmit() {
    if (!validateFormFields()) {
      return;
    }
    setShowActivityIndicator(true);
    let filteredOptions: Option[];
    if (assumedTrend === 'Bullish') {
      filteredOptions = props.tradeReducer.options.calls;
    } else {
      filteredOptions = props.tradeReducer.options.puts;
    }

    const optionsWithExpirationDate = getOptionsWithExpiration(filteredOptions);

    // Trades to show user that will be stored in redux
    let potentialTrades = [];

    if (assumedTrend === 'Bullish') {
      potentialTrades = await createPotentialBullCallSpreads(
        optionsWithExpirationDate,
      );
    } else {
      potentialTrades = await createPotentialBearPutSpreads(
        optionsWithExpirationDate,
      );
    }

    const tradesBelowMaxRisk = getTradesBelowMaxRisk(potentialTrades);
    store.dispatch(addPotentialTrades(tradesBelowMaxRisk));

    setShowActivityIndicator(false);
    props.navigation.push(ROUTES.FormResults, {type: assumedTrend});
  }

  function validateFormFields() {
    if (assumedTrend === '') {
      Alert.alert('Please provide a value for assumed trend', '', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return false;
      // eslint-disable-next-line radix
    } else if (parseInt(maxRisk) <= 0) {
      Alert.alert('Please specify a max risk that is greater than 0', '', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return false;
    }
    return true;
  }

  function getOptionsWithExpiration(options: Option[]) {
    return options.filter((option) => {
      const selectedDate = addOneDayToDate(new Date(expirationDate));
      const optionExpirationDate = addOneDayToDate(
        new Date(option.expiration_date),
      );
      return compareDates(selectedDate, optionExpirationDate);
    });
  }

  function addOneDayToDate(date: Date) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    newDate.setFullYear(date.getFullYear());
    newDate.setMonth(date.getMonth());
    return newDate;
  }

  function compareDates(dateOne: Date, dateTwo: Date) {
    return (
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getDate() === dateTwo.getDate() &&
      dateOne.getFullYear() === dateTwo.getFullYear()
    );
  }

  async function createPotentialBullCallSpreads(options: Option[]) {
    const trades: Trade[] = [];
    // console.log('options: ', options);
    options.sort((a, b) => {
      return a.strike - b.strike;
    });

    for (let i = 0; i < options.length; i++) {
      for (let j = i + 1; j < options.length - 1; j++) {
        const legOne = generateLeg(options[i]);
        const legTwo = generateLeg(options[j]);

        const breakEven = legOne.strike + (legOne.cost - legTwo.cost);
        const trade = generateTrade(legOne, legTwo);
        trade.breakEven = breakEven;
        trade.root_symbol = options[0].root_symbol;
        trades.push(trade);
      }
    }

    // const order: OptionOrder = {
    //   account_id: 'VA17211781',
    //   class: 'option',
    //   symbol: option.root_symbol,
    //   option_symbol: legTwo.symbol,
    //   side: 'sell_to_open',
    //   quantity: '1',
    //   type: 'market',
    //   duration: 'day',
    //   preview: 'true',
    // };
    console.log('trades: ', trades);

    // Show highest percentage at the top
    return trades.sort((a, b) => (a.totalPrice < b.totalPrice ? 1 : -1));
  }

  async function createPotentialBearPutSpreads(options: Option[]) {
    const trades: Trade[] = [];
    // console.log('options: ', options);
    options.sort((a, b) => {
      return b.strike - a.strike;
    });
    for (let i = 0; i < options.length; i++) {
      for (let j = i + 1; j < options.length - 1; j++) {
        const legOne = generateLeg(options[i]);
        const legTwo = generateLeg(options[j]);

        const breakEven = legOne.strike - (legOne.cost - legTwo.cost);
        const trade = generateTrade(legOne, legTwo);
        trade.breakEven = breakEven;
        trade.root_symbol = options[0].root_symbol;

        trades.push(trade);
      }
    }

    // Show highest percentage at the top
    return trades.sort((a, b) => (a.totalPrice < b.totalPrice ? 1 : -1));
  }

  function generateLeg(option: Option) {
    return {
      strike: option.strike,
      cost: option.ask,
      expiration: option.expiration_date,
      option_symbol: option.symbol,
    };
  }

  /**
   * Generate local version of trades to maintain trade statistics
   * @param legOne
   * @param legTwo
   */
  function generateTrade(legOne: Leg, legTwo: Leg) {
    const tradeExpirationDate = legOne.expiration;
    const totalPrice = parseFloat((legOne.cost - legTwo.cost).toFixed(2));
    const maxProfitDollars =
      Math.abs(legOne.strike - legTwo.strike) * 100 -
      (legOne.cost - legTwo.cost);
    const maxProfitPercentage = parseFloat(
      (maxProfitDollars / totalPrice).toFixed(2),
    );

    const trade: Trade = {
      legOne,
      legTwo,
      probability: 0,
      maxProfitDollars,
      maxProfitPercentage,
      expirationDate: tradeExpirationDate,
      totalPrice,
      breakEven: 0,
      root_symbol: '',
      orderId: '',
    };

    return trade;
  }

  /**
   * Don't show trades that exceed desired amount spent
   * @param trades
   */
  function getTradesBelowMaxRisk(trades: Trade[]) {
    return trades.filter((trade) => {
      // eslint-disable-next-line radix
      return trade.totalPrice < parseInt(maxRisk) / 100;
    });
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
      <KeyboardAwareScrollView {...contentContainerStyle}>
        <View style={styles.main}>
          <Text style={styles.title}>
            Please answer a few questions to determine potential trades
          </Text>
          <InlineFormPicker
            label="Expiration"
            onChange={(text) => {
              setExpirationDate(text !== null ? text : '');
            }}
            items={props.tradeReducer.options.expirationDates.map((date) => {
              const millisecondsToExpiration =
                new Date(date).getTime() - Date.now();
              const daysToExpiration =
                millisecondsToExpiration / (1000 * 3600 * 24);
              const label = date + ` (${Math.ceil(daysToExpiration)} days)`;
              return {label: label, value: date};
            })}
            size={1}
          />
          <FormTextInput
            label="Trend"
            onChange={() => {}}
            isMutable={false}
            value={calculatedTrend}
            helpText={{
              title: `Based on {INSERT FORMULA}, this position is currently in a ${calculatedTrend} trend`,
              subtitle: '',
            }}
          />
          <InlineFormPicker
            label="Assumed Trend"
            onChange={(text) => {
              console.log('text: ', text);
              setAssumedTrend(text !== null ? text : '');
            }}
            helpText={{
              title: 'Where do you think this stock is headed?',
              subtitle: '',
            }}
            items={[
              {
                label: 'Bullish',
                value: 'Bullish',
              },
              {
                label: 'Bearish',
                value: 'Bearish',
              },
            ]}
            size={0}
          />
          <FormTextInput
            label="What is your max risk?"
            onChange={(number) => setMaxRisk(number)}
            isMutable
            value={maxRisk}
            isNumber
          />
          <DoubleTextInput
            label="What is your profit target?"
            inputs={[
              {
                value: profitTargetPercentage,
                label: 'custom %',
                onChange(text: string) {
                  setProfitTargetPercentage(text);
                },
                isMutable: true,
                isNumber: true,
              },
              {
                value: profitTargetDollars,
                label: 'custom $',
                onChange(text: string) {
                  setProfitTargetDollars(text);
                },
                isMutable: true,
                isNumber: true,
              },
            ]}
          />
          <DoubleTextInput
            label="What is your max loss?"
            inputs={[
              {
                value: maxLossPercentage,
                label: 'custom %',
                onChange(text: string) {
                  setMaxLossPercentage(text);
                },
                isMutable: true,
                isNumber: true,
              },
              {
                value: maxLossDollars,
                label: 'custom $',
                onChange(text: string) {
                  setMaxLossDollars(text);
                },
                isMutable: true,
                isNumber: true,
              },
            ]}
          />
          <View style={styles.buttonContainer}>
            <Buttons.LargeHallowSquareOnPress
              onPress={() => handleOnSubmit()}
              text="Submit"
              borderColor={Colors.main_green}
              textColor={Colors.main_green}
            />
          </View>
        </View>
        {showActivityIndicator && <LoadingScreen />}
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = (state: AppState) => ({
  tradeReducer: state.tradeReducer,
  user: state.user,
});
const mapDispatchToProps = () => ({});
export const TradeForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeFormBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  main: {},

  title: {
    fontSize: Fonts.large,
    textAlign: 'center',
    marginVertical: 15,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
