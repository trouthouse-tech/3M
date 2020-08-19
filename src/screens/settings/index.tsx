import React from 'react';
import {Text} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {SettingsStackParamList} from '../../navigation/Settings/types';

const SettingsBase = (props: SettingsStackParamList) => {
  console.log('user: ', props.user);
  return <Text>Settings</Text>;
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsBase);
