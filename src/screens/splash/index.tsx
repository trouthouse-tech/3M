import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors, Fonts, Utils} from '../../styles';
import {LargeHallowSquareOnPress} from '../../components/buttons/';
import {LargeSquareOnPress} from '../../components/buttons/';
import TextCarousel from '../../components/TextCarousel';
import {TextCarouselEntries} from '../../util/data';
import {AuthenticationStackProps} from '../../navigation/authentication/types';
import {ROUTES} from '../../util/routes';
import {getInvestor, setLoggedInUser} from '../../services/investor';
import {loginInvestor, updateInvestor} from '../../store/user/actions';
import store from '../../store';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

export const Splash = (props: AuthenticationStackProps) => {
  console.log(
    'Splash isInstructorLoggedIn: ',
    AsyncStorage.getItem('isInvestorLoggedIn'),
  );

  useEffect(() => {
    getLoggedInUser().then((loggedInUser) => {
      console.log('loggedInUser: ', loggedInUser);
      // User did not log out during last session
      if (loggedInUser !== -1) {
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
    setLoggedInUser();
    props.navigation.navigate(ROUTES.Main);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo/default-logo.png')}
        />
      </View>
      <Text style={styles.title}>Welcome to The 3M Club</Text>
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
          onPress={() => props.navigation.push(ROUTES.Login)}
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

  title: {
    ...Fonts.normal,
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
