import React from 'react';
import {Text, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {HomeStackProps} from '../../navigation/home/types';
import Header from '../../components/Header';

const HomeBase = (props: HomeStackProps) => {
  console.log('user: ', props.user);
  return (
    <View>
      <Header showLogo bottomBorder />
      <Text>Home</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeBase);
