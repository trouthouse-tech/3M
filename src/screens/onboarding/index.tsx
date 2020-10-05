import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {LargeButton} from '../../components/buttons';
import {ROUTES} from '../../util/routes';
import {OnboardingStackProps} from '../../navigation/onboarding/types';
import {UserState} from '../../store/user/types';
import {DEVICE_WIDTH} from '../../styles/util';
import {Fonts, Utils} from '../../styles';

type Props = OnboardingStackProps & {
  user: UserState;
};

const OnboardingLandingBase = (props: Props) => {
  // useEffect(() => {
  //   if (!props.user.hasAnsweredOnboardingQuestions) {
  //     Alert.alert(
  //       'Welcome to The 3M Club.',
  //       "Let's get you set up to start trading.",
  //       [
  //         {text: 'Do this later', onPress: () => {}, style: 'cancel'},
  //         {text: 'OK', onPress: () => console.log('hello')},
  //         // {text: 'Tradier', onPress: () => goToTradier()},
  //       ],
  //     );
  //   }
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/logo/newLogo.png')}
          />
        </View>
        <Text style={styles.titleContainer}>
          <Text style={styles.subTitle}>Welcome to The 3M Club! </Text>
          <Text style={styles.subTitle}>
            Let's start by answering a few questions about you as a trader.
          </Text>
        </Text>
        <View style={styles.buttonContainer}>
          <LargeButton
            onPress={() => props.navigation.push(ROUTES.TradingExperience)}
            text="Next"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const OnboardingLanding = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingLandingBase);

const imageSize = Utils.DEVICE_WIDTH / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },

  main: {
    flex: 1,
    width: DEVICE_WIDTH / 1.2,
    // height: DEVICE_HEIGHT / 2,
    // backgroundColor: 'red',
    // marginTop: 50,
  },

  titleContainer: {
    flex: 1,
    fontSize: Fonts.large,
    // backgroundColor: 'blue',
    marginTop: 20,
    alignItems: 'center',
  },

  subTitle: {
    flex: 1,
    fontSize: Fonts.large,
    textAlign: 'center',
  },

  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    // flex: 2,
    height: imageSize,
    width: imageSize,
  },

  buttonContainer: {
    flex: 2,
    // backgroundColor: 'green',
  },
});
