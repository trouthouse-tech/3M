import React, {useEffect} from 'react';
import {Alert, Text, View, Linking} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {HomeStackProps} from '../../navigation/home/types';
import Header from '../../components/Header';
import {UserState} from '../../store/user/types';
import {ROUTES} from '../../util/routes';
import {ChatButton} from '../../components/Header/HeaderItems';
import {TradeState} from '../../store/trade/types';

type Props = HomeStackProps & {
  user: UserState;
  trade: TradeState;
};

const HomeBase = (props: Props) => {
  // console.log('home props: ', props);
  useEffect(() => {
    if (props.user.tradierIsWaitingForApproval) {
      Alert.alert(
        'Your Tradier account has been created.',
        'The approval process may take up to 1 business day. Please note that certain 3M features will be unavailable until your account is approved.',
        [
          {
            text: 'Attempt Login',
            onPress: () => props.navigation.push(ROUTES.Tradier),
          },
          {text: 'OK', onPress: () => console.log('Success')},
        ],
      );
    }
    const expiration = props.user.tradierAccessTokenExpiration!;
    const isExpired = expiration * 1000 < (Date.now() / 1000 - 86399) * 1000;
    if (isExpired) {
      Alert.alert(
        "Let's setup your Tradier account.",
        'The 3M Club has partnered with Tradier to enable trading.',
        [
          {text: 'Do this later', onPress: () => {}, style: 'cancel'},
          {text: 'OK', onPress: () => props.navigation.push(ROUTES.Tradier)},
          // {text: 'Tradier', onPress: () => goToTradier()},
        ],
      );
    }
  }, [
    props.navigation,
    props.user.tradierAccessTokenExpiration,
    props.user.tradierIsWaitingForApproval,
  ]);

  async function handleChatPressed() {
    const url = 'https://discord.gg/SKbm6tN';
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }

  return (
    <View>
      <Header
        showLogo
        showBottomBorder
        rightButton={{child: ChatButton, onclick: () => handleChatPressed()}}
      />
      <Text>Home</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  trade: state.tradeReducer,
});

const mapDispatchToProps = () => ({});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeBase);
