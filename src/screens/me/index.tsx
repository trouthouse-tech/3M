import React from 'react';
import {Text, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {MeStackProps} from '../../navigation/me/types';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {ROUTES} from '../../util/routes';

const MeBase = (props: MeStackProps) => {
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
      <Text>Me</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const Me = connect(mapStateToProps, mapDispatchToProps)(MeBase);
