import React from 'react';
import {Text, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {MeStackProps} from '../../navigation/me/types';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {ROUTES} from '../../util/routes';
import {UserState} from '../../store/user/types';
import {LogoutButton} from '../../components/Header/HeaderItems';

type Props = MeStackProps & {
  userReducer: UserState;
};

const MeBase = (props: Props) => {
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
      <Header
        showLogo
        showBottomBorder
        rightButton={{child: LogoutButton, onclick: () => handleSignOut()}}
      />
      <Text>Me</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
});

const mapDispatchToProps = () => ({});

export const Me = connect(mapStateToProps, mapDispatchToProps)(MeBase);
