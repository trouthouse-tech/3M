import React from 'react';
import {Text} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {HomeStackParamList} from '../../navigation/home/types';

const HomeBase = (props: HomeStackParamList) => {
  console.log('user: ', props.user);
  return <Text>Home</Text>;
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeBase);
