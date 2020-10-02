import React from 'react';
import {Text, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {TradeStackProps} from '../../navigation/trade/types';
import Header from '../../components/Header';

const TradeBase = (props: TradeStackProps) => {
  console.log('user: ', props.user);
  return (
    <View>
      <Header showLogo showBottomBorder />
      <Text>Trade</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
});

const mapDispatchToProps = () => ({});

export const Trade = connect(mapStateToProps, mapDispatchToProps)(TradeBase);
