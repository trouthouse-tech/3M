import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {HomeStackProps} from '../../navigation/home/types';
import Header from '../../components/Header';
import {ROUTES} from '../../util/routes';
import {UserState} from '../../store/user/types';
import {TradierCredentialsState} from '../../store/tradier/types';

type Props = HomeStackProps & {
  user: UserState;
  tradier: TradierCredentialsState;
};

const HomeBase = (props: Props) => {
  console.log('props: ', props);
  useEffect(() => {
    if (!props.user.hasAuthenticatedTradier) {
      Alert.alert(
        "Let's setup your Tradier account.",
        'The 3M Club has partnered with Tradier to enable trading.',
        [
          {text: 'Do this later', onPress: () => {}, style: 'cancel'},
          {text: 'OK', onPress: () => props.navigation.push(ROUTES.Tradier)},
          // {text: 'Tradier', onPress: () => goToTradier()},
        ],
      );
    } else {
      Alert.alert(
        'Tradier account successfully linked.',
        "Let's go through a quick walk-through of The 3M Club",
        [
          {text: 'Do this later', onPress: () => {}, style: 'cancel'},
          {text: 'OK', onPress: () => console.log('tutorial')},
          // {text: 'Tradier', onPress: () => goToTradier()},
        ],
      );
    }
  });
  return (
    <View>
      <Header showLogo bottomBorder />
      <Text>Home</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  tradier: state.tradier,
});

const mapDispatchToProps = () => ({});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeBase);
