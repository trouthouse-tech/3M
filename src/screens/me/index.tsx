import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {MeStackProps} from '../../navigation/me/types';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {ROUTES} from '../../util/routes';
import {UserState} from '../../store/user/types';
import {LogoutButton} from '../../components/Header/HeaderItems';
import {TradeState} from '../../store/trade/types';
import {DEVICE_WIDTH, White_Shadowed} from '../../styles/util';
import {Colors, Fonts} from '../../styles';
import ActionList from '../../components/ActionList';
import {ActionListProps} from '../../components/ActionList/types';
import {sanFranciscoWeights} from 'react-native-typography';

type Props = MeStackProps & {
  user: UserState;
  trade: TradeState;
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

  const PROFILE_ACTIONS: ActionListProps = {
    items: [
      {
        title: '3M Account',
        route: ROUTES.Edit3MAccount,
        onPress() {
          console.log('Edit 3m account');
        },
      },
      {
        title: 'Edit Tradier Account',
        route: ROUTES.EditTradierAccount,
        async onPress() {
          console.log('Edit Tradier account');
        },
      },
      {
        title: 'Orders',
        route: ROUTES.Orders,
        onPress() {
          props.navigation.navigate(ROUTES.Orders);
          return;
        },
      },
      {
        title: 'Notifications',
        route: ROUTES.Notifications,
        onPress() {
          console.log('Notifications');
          return;
        },
      },
      {
        title: 'Feedback',
        route: ROUTES.Feedback,
        onPress() {
          console.log('Feedback');
          return;
        },
      },
      {
        title: 'Support',
        route: ROUTES.Support,
        onPress() {
          console.log('Support');
          return;
        },
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Header
        showLogo
        showBottomBorder
        rightButton={{child: LogoutButton, onclick: () => handleSignOut()}}
      />
      <Text style={styles.title}>Trades</Text>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <ActionList items={PROFILE_ACTIONS.items} />
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  trade: state.tradeReducer,
});

const mapDispatchToProps = () => ({});

export const Me = connect(mapStateToProps, mapDispatchToProps)(MeBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    ...Fonts.h1,
    alignSelf: 'center',
  },

  order: {
    // height: 100,
    width: DEVICE_WIDTH / 1.2,
    alignSelf: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    ...White_Shadowed,
  },

  orderInfoContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 10,
  },

  left: {
    flex: 2,
  },

  right: {
    flex: 3,
  },

  symbol: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
  },

  label: {
    fontSize: Fonts.normal,
  },

  settingsContainer: {
    flex: 1,
    padding: 15,
  },

  settingsTitle: {
    fontSize: Fonts.normal,
    paddingVertical: 15,
    ...sanFranciscoWeights.medium,
  },
});
