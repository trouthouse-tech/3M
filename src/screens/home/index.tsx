import React from 'react';
import {Alert, StyleSheet, Text, View, Linking} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {HomeStackProps} from '../../navigation/home/types';
import Header from '../../components/Header';
import {UserState} from '../../store/user/types';
import {TradierCredentialsState} from '../../store/tradier/types';
import {Fonts} from '../../styles';

type Props = HomeStackProps & {
  user: UserState;
  tradier: TradierCredentialsState;
};

const HomeBase = (props: Props) => {
  console.log('props: ', props);
  // useEffect(() => {
  //   if (!props.user.hasAuthenticatedTradier) {
  //     Alert.alert(
  //       "Let's setup your Tradier account.",
  //       'The 3M Club has partnered with Tradier to enable trading.',
  //       [
  //         {text: 'Do this later', onPress: () => {}, style: 'cancel'},
  //         {text: 'OK', onPress: () => props.navigation.push(ROUTES.Tradier)},
  //         // {text: 'Tradier', onPress: () => goToTradier()},
  //       ],
  //     );
  //   } else {
  //     Alert.alert(
  //       'Tradier account successfully linked.',
  //       "Let's go through a quick walk-through of The 3M Club",
  //       [
  //         {text: 'Do this later', onPress: () => {}, style: 'cancel'},
  //         {text: 'OK', onPress: () => console.log('tutorial')},
  //         // {text: 'Tradier', onPress: () => goToTradier()},
  //       ],
  //     );
  //   }
  // });

  const rightHeaderIcon = <Text style={styles.chatText}>Chat</Text>;

  async function handleChatPressed() {
    const url = 'https://discord.gg/8sV5Gmz';
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  return (
    <View>
      <Header
        showLogo
        bottomBorder
        rightButton={() => handleChatPressed()}
        rightIcon={rightHeaderIcon}
      />
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

const styles = StyleSheet.create({
  chatText: {
    ...Fonts.large,
  },
});
