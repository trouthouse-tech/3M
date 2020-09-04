import React from 'react';
import {Text, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {SettingsStackProps} from '../../navigation/Settings/types';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {ROUTES} from '../../util/routes';

const SettingsBase = (props: SettingsStackProps) => {
  console.log('user: ', props.user);

  async function handleSignOut() {
    await AsyncStorage.setItem('isInvestorLoggedIn', 'false');
    auth().signOut();
    props.navigation.reset({
      index: 0,
      routes: [{name: ROUTES.Authentication}],
    });
  }

  return (
    <View>
      <Header showLogo bottomBorder rightButton={() => handleSignOut()} />
      <Text>Settings</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsBase);
