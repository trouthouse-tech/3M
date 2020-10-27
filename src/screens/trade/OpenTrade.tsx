import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {SimpleTicker} from '../../components/tickers/simple';
import {DEVICE_WIDTH} from '../../styles/util';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {TradeStackProps} from '../../navigation/trade/types';
import {MeStackProps} from '../../navigation/me/types';
import {TradeState} from '../../store/trade/types';
import {Colors, Fonts} from '../../styles';
import {Buttons} from 'golfpro-rn-components';
import {Trade} from '../../model';

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

type Props = (TradeStackProps | MeStackProps) & {
  tradeReducer: TradeState;
};

const HEADER = ['', 'Strike', 'Cost'];

export function OpenTradeBase(props: Props) {
  // @ts-ignore
  const {trade} = props.route.params as Trade;
  console.log('trade: ', trade);
  const {quote} = props.tradeReducer;
  const cost = Math.ceil((trade.legOne.cost - trade.legTwo.cost) * 100);

  const headerRow = <Row values={HEADER} />;
  const legOne = (
    <Row
      values={['Leg 1', trade.legOne.strike + '', trade.legOne.cost + '']}
      isMiddleRow
    />
  );
  const legTwo = (
    <Row values={['Leg 2', trade.legTwo.strike + '', trade.legTwo.cost + '']} />
  );

  // function handleOnPurchase() {
  //   props.onPress();
  // }

  function handleOnSell() {
    Alert.alert('Are you sure you would like to sell?', '', [
      {
        text: 'Confirm',
        onPress: () => {},
      },
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header
        // leftButton={{
        //   child: BackButton,
        //   onclick: () => props.navigation.goBack(),
        // }}
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
            <Text style={styles.boldedValue}>{trade.probability}% </Text>
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
            <Text>${trade.breakEven} </Text>
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
}

const mapStateToProps = (state: AppState) => ({
  tradeReducer: state.tradeReducer,
});
const mapDispatchToProps = () => ({});
export const OpenTrade = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenTradeBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  table: {
    margin: 5,
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
