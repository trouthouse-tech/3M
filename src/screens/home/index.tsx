import React from 'react';
import {Text} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {DashboardStackParamList} from '../../navigation/dashboard/types';

const DashboardBase = (props: DashboardStackParamList) => {
  console.log('user: ', props.user);
  return <Text>Dashboard</Text>;
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardBase);
