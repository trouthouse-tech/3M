import React, {useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Colors, Utils} from '../../styles';
import {LargeSquareOnPress} from '../../components/buttons';
import {OnboardingStackProps} from '../../navigation/onboarding/types';
import {StandardTextInput} from '../../components/input/StandardTextInput';
import {ROUTES} from '../../util/routes';
import {loginInvestor} from '../../services/investor';
import Header from '../../components/Header';

export const Login = (props: OnboardingStackProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    await loginInvestor(email, password).then((insertionAttempt) => {
      // user was successfully created
      if (insertionAttempt.user) {
        props.navigation.push(ROUTES.Main);
      } else {
        const {error} = insertionAttempt;
        console.log('error: ', error);
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-email':
          case 'auth/wrong-password':
            Alert.alert(
              'Email address or password is incorrect. Please try again.',
            );
            break;
          case 'auth/operation-not-allowed':
            console.log('Error during sign up.');
            break;
        }
      }
    });
  };

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
