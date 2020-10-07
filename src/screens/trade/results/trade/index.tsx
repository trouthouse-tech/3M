import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Trade} from '../types';
import {Colors, Fonts} from '../../../../styles';
import {DEVICE_WIDTH} from '../../../../styles/util';
import {Buttons} from 'golfpro-rn-components';

type Props = {
  trade: Trade;
  onPress(): void;
};

const HEADER = ['', 'Strike', 'Cost'];

type RowProps = {
  values: string[];
  showBottomBorder?: boolean;
};

const Row = (props: RowProps) => {
  const showBorder = !!props.showBottomBorder;
  return (
    <View style={[styles.row, showBorder ? styles.showBottomBorder : null]}>
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

export function PotentialTrade(props: Props) {
  const {trade} = props;
  const cost = (trade.legOne.cost + trade.legTwo.cost) * 100;

  const headerRow = <Row values={HEADER} showBottomBorder />;
  const legOne = (
    <Row
      values={['Leg 1', trade.legOne.strike + '', trade.legOne.cost + '']}
      showBottomBorder
    />
  );
  const legTwo = (
    <Row values={['Leg 2', trade.legTwo.strike + '', trade.legTwo.cost + '']} />
  );

  function handleOnPurchase() {
    props.onPress();
  }

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        {headerRow}
        {legOne}
        {legTwo}
      </View>
      <View style={styles.main}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Probability: </Text>
          <Text style={[styles.label, styles.boldedValue]}>30.40%</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Max Profit: </Text>
          <Text style={styles.label}>
            <Text>$90.39 </Text>
            <Text style={styles.boldedValue}>(15.39%) </Text>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Break Even: </Text>
          <Text style={styles.label}>53.11 </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Expiration Date: </Text>
          <Text style={styles.label}>10/20/2020 </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Total Price: </Text>
          <Text style={styles.label}>
            <Text>{trade.legOne.cost + trade.legTwo.cost} x 100 = </Text>
            <Text style={styles.boldedValue}>${cost}</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons.LargeSquareOnPress
            onPress={() => handleOnPurchase()}
            text="Purchase"
            buttonColor={Colors.blue_green}
            textColor={Colors.white}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.dark_blue_green,
    borderRadius: 10,
    marginTop: 20,
  },

  table: {
    margin: 5,
    borderBottomWidth: 0.5,
    width: DEVICE_WIDTH / 1.2,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    height: 90,
  },

  row: {
    flexDirection: 'row',
    height: 30,
    // backgroundColor: 'red',
  },

  column: {
    flex: 1,
    alignItems: 'center',
    height: 30,
  },

  middleColumn: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },

  showBottomBorder: {
    borderBottomWidth: 0.5,
  },

  value: {
    fontSize: Fonts.normal,
    padding: 5,
  },

  main: {
    alignSelf: 'center',
    width: DEVICE_WIDTH / 1.2,
    marginVertical: 10,
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
