import React, {useState} from 'react';
import {TradeStackProps} from '../../../navigation/trade/types';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header';
import {BackButton} from '../../../components/Header/HeaderItems';
import {AppState} from '../../../store/types';
import {connect} from 'react-redux';
import {TradeState} from '../../../store/trade/types';
import {Colors, Fonts} from '../../../styles';
import {InlineFormPicker} from './components/InlineFormPicker';
import {HOLDING_PERIOD} from '../../../model';
import {FormTextInput} from './components/FormTextInput';
import {DoubleTextInput} from './components/DoubleTextInput';
import {Buttons} from 'golfpro-rn-components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

type Props = TradeStackProps & {
  tradeReducer: TradeState;
};

const holdingPeriodItems = [
  {
    label: 'Daily',
    value: HOLDING_PERIOD.DAILY,
  },
  {
    label: 'Weekly',
    value: HOLDING_PERIOD.WEEKLY,
  },
  {
    label: 'Monthly',
    value: HOLDING_PERIOD.MONTHLY,
  },
  {
    label: 'Yearly',
    value: HOLDING_PERIOD.YEARLY,
  },
];

export function TradeFormBase(props: Props) {
  console.log('props.route.params.quote: ', props.route.params.quote);
  console.log('props: ', props.tradeReducer);
  const {quote} = props.tradeReducer;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [holdingPeriod, setHoldingPeriod] = useState(-1);
  const [calculatedTrend] = useState('Bullish');
  const [maxRisk, setMaxRisk] = useState('0');
  const [profitTargetPercentage, setProfitTargetPercentage] = useState('0');
  const [profitTargetDollars, setProfitTargetDollars] = useState('0');
  const [maxLossPercentage, setMaxLossPercentage] = useState('0');
  const [maxLossDollars, setMaxLossDollars] = useState('0');

  const contentContainerStyle = {
    contentContainerStyle: styles.container,
  };

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
      <View style={styles.companyInfo}>
        <View style={styles.symbolContainer}>
          <View style={styles.symbolBorder}>
            <Text style={styles.symbol}>{quote?.symbol}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price: </Text>
          <Text style={styles.priceValue}>${quote?.last}</Text>
        </View>
      </View>
      <KeyboardAwareScrollView {...contentContainerStyle}>
        <View style={styles.main}>
          <Text style={styles.title}>
            Please answer a few questions to determine potential trades
          </Text>
          <InlineFormPicker
            label="Holding Period"
            onChange={(text) => {
              console.log('text: ', text);
              // eslint-disable-next-line radix
              setHoldingPeriod(text !== null ? parseInt(text.toString()) : -1);
            }}
            helpText={{
              title:
                'Holding Period answers how long you would like to hold a position for',
              subtitle:
                "Choosing the Daily value indicates that you're looking to exit a position quickly",
            }}
            items={holdingPeriodItems}
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
              // eslint-disable-next-line radix
              setHoldingPeriod(text !== null ? parseInt(text.toString()) : -1);
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
              onPress={() => {}}
              text="Submit"
              borderColor={Colors.blue_green}
              textColor={Colors.blue_green}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = (state: AppState) => ({
  tradeReducer: state.tradeReducer,
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

  companyInfo: {
    height: 75,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
  },

  symbolContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  symbolBorder: {
    borderWidth: 1.5,
    borderRadius: 10,
    // backgroundColor: 'green',
  },

  symbol: {
    fontSize: Fonts.large,
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
  },

  priceContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceLabel: {
    fontSize: Fonts.larger,
  },

  priceValue: {
    fontSize: Fonts.larger,
    fontWeight: 'bold',
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
