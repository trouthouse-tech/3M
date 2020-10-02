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
import {Investor} from '../../model';
import {BackButton} from '../../components/Header/HeaderItems';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Buttons} from 'golfpro-rn-components';

export const Login = (props: AuthenticationStackProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    login(email, password).then(async (loginAttempt) => {
      // User was found
      if (loginAttempt.user) {
        handleInvestorLogin();
      } else {
        handleLoginError(loginAttempt.error);
      }
    });
  }

  function handleInvestorLogin() {
    setLoggedInUser();
    getInvestor(email).then((retrievalAttempt) => {
      // @ts-ignore
      const user = retrievalAttempt.data.data() as Investor;
      store.dispatch(loginInvestor(email, user));
      if (!user.hasAnsweredOnboardingQuestions) {
        props.navigation.navigate(ROUTES.Onboarding);
      } else {
        enterMainApplication();
      }
    });
  }

  function handleLoginError(error: any) {
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        Alert.alert('Email or password is invalid.');
        break;
    }
  }

  function enterMainApplication() {
    props.navigation.navigate(ROUTES.Main);
  }

  const contentContainerStyle = {
    contentContainerStyle: styles.container,
  };

  return (
    <View style={styles.container}>
      <Header
        leftButton={{
          child: BackButton,
          onclick: () => props.navigation.goBack(),
        }}
      />
      <KeyboardAwareScrollView {...contentContainerStyle}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/logo/newLogo.png')}
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
            buttonColor={Colors.blue_green}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const imageSize = Utils.DEVICE_WIDTH / 2;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  container: {
    alignItems: 'center',
  },

  logoContainer: {
    flex: 2,
    justifyContent: 'center',
  },

  logo: {
    height: imageSize,
    width: imageSize,
  },

  form: {
    flex: 3,
    height: Utils.DEVICE_HEIGHT / 3,
    alignItems: 'center',
  },

  buttonText: {},

  radioButtonSection: {
    flexDirection: 'row',
  },
});
