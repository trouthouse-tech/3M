import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors, Fonts, Utils} from '../../styles';
import {LargeHallowSquareOnPress} from '../../components/buttons/LargeHallowSquareOnPress';
import {LargeSquareOnPress} from '../../components/buttons/LargeSquareOnPress';
import RadioButton from '../../components/buttons/RadioButton';
import TextCarousel from '../../components/TextCarousel';
import {TextCarouselEntries} from '../../util/data';

export const Splash = () => {
  const [userType, setUserType] = useState(0);
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
          onPress={() => console.log('sign up')}
          text="Sign Up"
          textColor={Colors.main_green}
          borderColor={Colors.main_green}
        />
        <LargeSquareOnPress
          onPress={() => console.log('login')}
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
