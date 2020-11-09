import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Fonts} from '../../../styles';

type Props = {
  symbol: string;
  last: number;
};

export function SimpleTicker(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.symbolContainer}>
        <View style={styles.symbolBorder}>
          <Text style={styles.symbol}>{props.symbol}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Price: </Text>
        <Text style={styles.priceValue}>
          ${(props.last && props.last.toFixed(2)) || 0}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
  },

  symbolContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  symbolBorder: {
    borderWidth: 1.5,
    borderRadius: 10,
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
});
