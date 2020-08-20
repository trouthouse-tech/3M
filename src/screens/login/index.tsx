import React, {useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Colors, Utils} from '../../styles';
import {LargeSquareOnPress} from '../../components/buttons';
import {OnboardingStackProps} from '../../navigation/onboarding/types';
import {StandardTextInput} from '../../components/input/StandardTextInput';
import {ROUTES} from '../../util/routes';
import {getInvestor, login, setLoggedInUser} from '../../services/investor';
import Header from '../../components/Header';
import store from '../../store';
import {loginInvestor} from '../../store/user/actions';
import {Investor} from '../../model';

export const Login = (props: OnboardingStackProps) => {
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
      enterMainApplication();
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

  return (
    <View style={styles.container}>
      <Header goBack={() => props.navigation.goBack()} />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo/default-logo.png')}
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
        <LargeSquareOnPress
          onPress={() => handleSignIn()}
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
  },

  logoContainer: {
    flex: 5,
    justifyContent: 'center',
  },

  logo: {
    height: imageSize,
    width: imageSize,
  },

  form: {
    flex: 6,
    height: Utils.DEVICE_HEIGHT / 5,
    alignItems: 'center',
  },

  buttonText: {},

  radioButtonSection: {
    flexDirection: 'row',
  },
});
