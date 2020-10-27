import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
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
import {
  getAccount,
  getHistory,
  getOrders,
  getPositions,
} from '../../services/tradier';
import {addAccountId, addOrders} from '../../store/trade/actions';

export const Splash = (props: AuthenticationStackProps) => {
  // console.log(
  //   'Splash isInstructorLoggedIn: ',
  //   AsyncStorage.getItem('isInvestorLoggedIn'),
  // );
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  /**
   * Check if the User did not logout during their last session
   */
  async function getLoggedInUser(): Promise<number> {
    const isInstructorLoggedIn = await AsyncStorage.getItem(
      'isInvestorLoggedIn',
    );
    // console.log('isInvestorLoggedIn: ', isInstructorLoggedIn);
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
   * Called when the User previously registered their email but did not finish the rest of their information
   */
  const resumeRegistration = useCallback(() => {
    props.navigation.navigate(ROUTES.InvestorInfoCollector, {
      isSignedIn: true,
    });
  }, [props.navigation]);

  /**
   * The User has completed registering their profile
   */
  const enterMainApplication = useCallback(() => {
    setShowActivityIndicator(false);
    setLoggedInUser();
    props.navigation.navigate(ROUTES.Main);
  }, [props.navigation]);

  /**
   * Handle when the User is a Instructor and did not explicitly logout of the application during their
   * last session
   * @param email Used to retrieve Instructor document
   */
  const handleLoggedInInvestor = useCallback(
    async (email: string) => {
      store.dispatch(updateInvestor({email}));
      const investor = await getInvestor(email);
      // Instructor did not finish registering
      if (investor.error) {
        resumeRegistration();
      } else {
        const investorData = investor.data!.data()!;
        // console.log('investor data: ', investorData);
        store.dispatch(loginInvestor(email, investorData));
        await getTradierAccountDetails(investorData.tradierAccessToken);
        if (!investorData.hasAnsweredOnboardingQuestions) {
          // Finish onboarding
          props.navigation.navigate(ROUTES.Onboarding);
        } else {
          enterMainApplication();
        }
      }
    },
    [enterMainApplication, props.navigation, resumeRegistration],
  );

  /**
   * Retrieve accountId and trades
   * @param token AccessToken used to authenticate with Trader APIs
   */
  async function getTradierAccountDetails(token: string) {
    await getAccount(token).then(async (tradierAccount) => {
      store.dispatch(addAccountId(tradierAccount.account_number));
      getOrders('').then((orders) => {
        if (orders) {
          store.dispatch(addOrders(orders));
        }
      });
      getPositions('').then((positions) => {
        console.log('positions: ', positions);
      });
      getHistory('').then((history) => {
        console.log('history: ', history);
      });
    });
  }

  /**
   * The user did not logout during their last session
   */
  const loginUser = useCallback(() => {
    let firstAttempt = true;
    auth().onAuthStateChanged(async (user) => {
      if (!firstAttempt) {
        if (user) {
          // @ts-ignore
          const {email} = user._user;
          // Instructor is logged in
          await handleLoggedInInvestor(email);
        }
      }
      firstAttempt = false;
    });
  }, [handleLoggedInInvestor]);

  useEffect(() => {
    if (!showActivityIndicator) {
      getLoggedInUser().then((loggedInUser) => {
        // console.log('loggedInUser: ', loggedInUser);
        // User did not log out during last session
        if (loggedInUser !== -1) {
          setShowActivityIndicator(true);
          loginUser();
        } else {
          console.log('Nobody is currently logged in');
        }
      });
    }
  }, [loginUser, showActivityIndicator]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoIcon}
          source={require('../../../assets/images/logo/finalLogoIcon.png')}
        />
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo/finalLogo.png')}
        />
      </View>
      <View style={styles.carouselContainer}>
        <TextCarousel entries={TextCarouselEntries} />
      </View>
      <View style={styles.form}>
        <Buttons.LargeHallowSquareOnPress
          onPress={() => props.navigation.push(ROUTES.CredentialCollector)}
          text="Sign Up"
          textColor={Colors.main_green}
          borderColor={Colors.main_green}
        />
        <Buttons.LargeSquareOnPress
          onPress={() => props.navigation.push(ROUTES.Login)}
          text="Sign In"
          textColor={Colors.white}
          buttonColor={Colors.main_green}
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
    alignItems: 'center',
    // backgroundColor: 'green',
  },

  logoIcon: {
    height: imageSize / 2,
    width: imageSize / 2,
    // backgroundColor: 'red',
  },

  logo: {
    // flex: 2,
    height: imageSize / 2,
    width: imageSize,
    resizeMode: 'contain',
    // backgroundColor: 'blue',
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
