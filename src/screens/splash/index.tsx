import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Colors, Fonts, Utils} from '../../styles';
import {LargeHallowSquareOnPress} from '../../components/buttons/';
import {LargeSquareOnPress} from '../../components/buttons/';
import TextCarousel from '../../components/TextCarousel';
import {TextCarouselEntries} from '../../util/data';
import {OnboardingStackProps} from '../../navigation/onboarding/types';
import {ROUTES} from '../../util/routes';

export const Splash = (props: OnboardingStackProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo/default-logo.png')}
        />
      </View>
      <View style={styles.carouselContainer}>
        <TextCarousel entries={TextCarouselEntries} />
      </View>
      <View style={styles.form}>
        <LargeHallowSquareOnPress
          onPress={() => props.navigation.push(ROUTES.CredentialCollector)}
          text="Sign Up"
          textColor={Colors.main_green}
          borderColor={Colors.main_green}
        />
        <LargeSquareOnPress
          onPress={() => console.log('sign in')}
          text="Sign In"
          textColor={Colors.white}
        />
      </View>
    </View>
  );
};

const imageSize = Utils.DEVICE_WIDTH / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: Utils.DEVICE_HEIGHT / 10,
  },

  logoContainer: {
    flex: 4,
    justifyContent: 'center',
  },

  logo: {
    // flex: 2,
    height: imageSize,
    width: imageSize,
  },

  form: {
    flex: 5,
    height: Utils.DEVICE_HEIGHT / 5,
    alignItems: 'stretch',
  },

  buttonText: {},

  radioButtonSection: {
    flexDirection: 'row',
  },

  radioButtonText: {
    marginLeft: 5,
    ...Fonts.large,
  },

  carouselContainer: {
    flex: 4,
    width: Utils.DEVICE_WIDTH / 1.2,
    justifyContent: 'center',
  },
});
