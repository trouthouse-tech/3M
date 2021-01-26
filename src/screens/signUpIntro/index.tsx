import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Utils} from '../../styles';
import {ROUTES} from '../../util/routes';
import {AuthenticationStackProps} from '../../navigation/authentication/types';
import {Buttons} from 'golfpro-rn-components';
import IntroCarousel from '../../components/introCarousel';
import {IntroCarouselEntries} from '../../util/data';

export const SignUpIntro = (props: AuthenticationStackProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <IntroCarousel entries={IntroCarouselEntries} />
      </View>
      <View style={styles.form}>
        <Buttons.LargeHallowSquareOnPress
          onPress={() => props.navigation.push(ROUTES.CredentialCollector)}
          text="Skip"
          textColor={Colors.main_green}
          borderColor={Colors.main_green}
        />
        <Buttons.LargeSquareOnPress
          onPress={() => props.navigation.push(ROUTES.Splash)}
          text="Home"
          textColor={Colors.white}
          buttonColor={Colors.main_green}
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
    // backgroundColor: 'red',
  },

  form: {
    flex: 5,
    height: Utils.DEVICE_HEIGHT / 5,
    alignItems: 'stretch',
  },
  carouselContainer: {
    flex: 12,
    justifyContent: 'center',
  },
});
