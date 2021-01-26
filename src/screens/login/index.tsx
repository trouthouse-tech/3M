import React, {useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Colors, Utils} from '../../styles';
import {AuthenticationStackProps} from '../../navigation/authentication/types';
import {StandardTextInput} from '../../components/input/StandardTextInput';
import {ROUTES} from '../../util/routes';
import {getInvestor, login, setLoggedInUser} from '../../services/investor';
import Header from '../../components/Header';
import store from '../../store';
import {loginInvestor} from '../../store/user/actions';
import {Investor, Position} from '../../model';
import {BackArrow} from '../../components/Header/HeaderItems';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Buttons} from 'golfpro-rn-components';
import {LoadingScreen} from '../../components/ActivityIndicator';
import {getOrderIds} from '../../services/orders';
import {addAccountId, addOrderIds, addPositions, addQuote} from '../../store/trade/actions';
import {getAccount, getPositions, getQuotes} from '../../services/tradier';

export const Login = (props: AuthenticationStackProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  function handleSignIn() {
    if (!validateFields()) {
      return;
    }
    setShowActivityIndicator(true);
    login(email, password).then(async (loginAttempt) => {
      // User was found
      if (loginAttempt.user) {
        handleInvestorLogin();
      } else {
        handleLoginError(loginAttempt.error);
      }
    });
  }

  const validateFields = (): boolean => {
    if (validateEmail()) {
      Alert.alert('Please enter a valid email address.');
      return false;
    }
    if (validateField(password)) {
      Alert.alert('Please enter password.');
      return false;
    }

    return true;
  };

  const validateEmail = () => {
    let emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !emailReg.test(email);
  };

  const validateField = (fieldName: string) => {
    return (
      fieldName === ''
    );
  };

  function handleInvestorLogin() {
    setLoggedInUser();
    getInvestor(email).then(async (retrievalAttempt) => {
      // @ts-ignore
      const user = retrievalAttempt.data.data() as Investor;
      store.dispatch(loginInvestor(email, user));
      if (!user.hasAnsweredOnboardingQuestions) {
        setShowActivityIndicator(false);
        props.navigation.navigate(ROUTES.Onboarding);
      } else {
        await retrieveOrderIds();
        await getTradierAccountDetails(user.tradierAccessToken!);
        enterMainApplication();
      }
    });
  }

  // Get local history (not Tradier) of order IDs from Firebase
  const retrieveOrderIds = async () => {
    const orderIdRetrieval = await getOrderIds(email);
    if (orderIdRetrieval.wasSuccessful) {
      const orderIds = orderIdRetrieval.data!.data()!.orders;
      store.dispatch(addOrderIds(orderIds));
    }
  };

  /**
   * Retrieve accountId and trades
   * @param token AccessToken used to authenticate with Trader APIs
   */
  async function getTradierAccountDetails(token: string) {
    await getAccount(token).then(async (tradierAccount) => {
      const accountId = tradierAccount.account_number;
      store.dispatch(addAccountId(accountId));
      getPositions(accountId, '').then((positions) => {
        if (positions) {
          store.dispatch(addPositions(positions));
          positions.map((position: Position) => {
            getQuotes(position.symbol, token).then((quote) => {
              if (quote) {
                store.dispatch(addQuote(quote.quotes.quote));
              }
            });
          });
        }
      });
    });
  }

  function handleLoginError(error: any) {
    console.log('error: ', error);
    if(error.code){
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          Alert.alert('Email or password is invalid.');
          break;
        default:
          Alert.alert(error.message);
          break;
      }
    } else {
      Alert.alert(error);
    }
    setShowActivityIndicator(false);
  }

  function enterMainApplication() {
    setShowActivityIndicator(false);
    props.navigation.navigate(ROUTES.Main);
  }

  const contentContainerStyle = {
    contentContainerStyle: styles.scrollView,
  };

  return (
    <View style={styles.container}>
      <Header
        leftButton={{
          child: BackArrow,
          onclick: () => props.navigation.goBack(),
        }}
      />
      <KeyboardAwareScrollView
        {...contentContainerStyle}
        showsVerticalScrollIndicator={false}>
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
        <View style={styles.form}>
          <StandardTextInput
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            autoFocus={true}
            secureTextEntry={false}
          />
          <StandardTextInput
            placeholder="Password"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            autoFocus={false}
            secureTextEntry={true}
          />
          <Buttons.LargeSquareOnPress
            onPress={() => handleSignIn()}
            text="Sign In"
            textColor={Colors.white}
            buttonColor={Colors.main_green}
          />
        </View>
      </KeyboardAwareScrollView>
      {showActivityIndicator && <LoadingScreen />}
    </View>
  );
};

const imageSize = Utils.DEVICE_WIDTH / 2;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
    flex:1,
  },

  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoIcon: {
    height: imageSize / 2,
    width: imageSize / 2,
    // backgroundColor: 'red',
  },

  logo: {
    height: imageSize / 2,
    width: imageSize,
    resizeMode: 'contain',
    // backgroundColor: 'blue',
  },

  form: {
    flex: 3,
    height: Utils.DEVICE_HEIGHT / 3,
    alignItems: 'center',
  },

  buttonText: {},
});
