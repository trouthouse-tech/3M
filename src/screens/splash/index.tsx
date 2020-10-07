import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors, Fonts, Utils} from '../../styles';
import TextCarousel from '../../components/TextCarousel';
import {TextCarouselEntries} from '../../util/data';
import {AuthenticationStackProps} from '../../navigation/authentication/types';
import {ROUTES} from '../../util/routes';
import {getInvestor, setLoggedInUser} from '../../services/investor';
import {loginInvestor, updateInvestor} from '../../store/user/actions';
import store from '../../store';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {Buttons} from 'golfpro-rn-components';
import {LoadingScreen} from '../../components/ActivityIndicator';

export const Splash = (props: AuthenticationStackProps) => {
  // console.log(
  //   'Splash isInstructorLoggedIn: ',
  //   AsyncStorage.getItem('isInvestorLoggedIn'),
  // );
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useEffect(() => {
    getLoggedInUser().then((loggedInUser) => {
      console.log('loggedInUser: ', loggedInUser);
      // User did not log out during last session
      if (loggedInUser !== -1) {
        setShowActivityIndicator(true);
        loginUser();
      } else {
        console.log('nobody');
      }
    });
  });

  /**
   * Check if the User did not logout during their last session
   */
  async function getLoggedInUser(): Promise<number> {
    const isInstructorLoggedIn = await AsyncStorage.getItem(
      'isInvestorLoggedIn',
    );
    console.log('isInvestorLoggedIn: ', isInstructorLoggedIn);
    if (
      isInstructorLoggedIn !== 'false' &&
      isInstructorLoggedIn !== null &&
      isInstructorLoggedIn !== undefined
    ) {
      return 0;
    }
    // User is not logged in
    return -1;
  }

  /**
   * The user did not logout during their last session
   */
  function loginUser() {
    let firstAttempt = true;
    auth().onAuthStateChanged(async (user) => {
      if (!firstAttempt) {
        if (user) {
          // @ts-ignore
          const {email} = user._user;
          // Instructor is logged in
          handleLoggedInInvestor(email);
        }
      }
      firstAttempt = false;
    });
  }

  /**
   * Handle when the User is a Instructor and did not explicitly logout of the application during their
   * last session
   * @param email Used to retrieve Instructor document
   */
  async function handleLoggedInInvestor(email: string) {
    store.dispatch(updateInvestor({email}));
    const investor = await getInvestor(email);
    // Instructor did not finish registering
    if (investor.error) {
      resumeRegistration();
    } else {
      console.log('investor data: ', investor.data!.data());
      await store.dispatch(loginInvestor(email, investor.data!.data()!));
      if (!investor.data!.data()!.hasAnsweredOnboardingQuestions) {
        props.navigation.navigate(ROUTES.Onboarding);
      } else {
        enterMainApplication();
      }
    }
  }

  /**
   * Called when the User previously registered their email but did not finish the rest of their information
   */
  const resumeRegistration = () => {
    props.navigation.navigate(ROUTES.InvestorInfoCollector, {
      isSignedIn: true,
    });
  };

  /**
   * The User has completed registering their profile
   */
  const enterMainApplication = () => {
    setShowActivityIndicator(false);
    setLoggedInUser();
    props.navigation.navigate(ROUTES.Main);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo/newLogo.png')}
        />
      </View>
      <Text style={styles.title}>Welcome to The 3M Club</Text>
      <View style={styles.carouselContainer}>
        <TextCarousel entries={TextCarouselEntries} />
      </View>
      <View style={styles.form}>
        <Buttons.LargeHallowSquareOnPress
          onPress={() => props.navigation.push(ROUTES.CredentialCollector)}
          text="Sign Up"
          textColor={Colors.blue_green}
          borderColor={Colors.blue_green}
        />
        <Buttons.LargeSquareOnPress
          onPress={() => props.navigation.push(ROUTES.Login)}
          text="Sign In"
          textColor={Colors.white}
          buttonColor={Colors.blue_green}
        />
      </View>
      {showActivityIndicator && <LoadingScreen />}
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

  logoContainer: {
    flex: 6,
    justifyContent: 'center',
    // backgroundColor: 'green',
  },

  logo: {
    // flex: 2,
    height: imageSize,
    width: imageSize,
  },

  title: {
    fontSize: Fonts.normal,
  },

  form: {
    flex: 5,
    height: Utils.DEVICE_HEIGHT / 5,
    alignItems: 'stretch',
  },

  buttonText: {},

  carouselContainer: {
    flex: 4,
    width: Utils.DEVICE_WIDTH / 1.2,
    justifyContent: 'center',
  },
});
