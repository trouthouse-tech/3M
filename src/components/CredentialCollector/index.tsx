import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {Colors, Fonts} from '../../styles';
import {StandardTextInput} from '../input/StandardTextInput';
import {LargeSquareOnPress} from '../buttons';
import {AuthenticationStackProps} from '../../navigation/authentication/types';
import Header from '../Header';
import {ROUTES} from '../../util/routes';
import {registerInvestorAllInfo, setLoggedInUser} from '../../services/investor';
import {updateInvestor} from '../../store/user/actions';
import store from '../../store';
import {BackArrow} from '../Header/HeaderItems';
import {LoadingScreen} from '../../components/ActivityIndicator';

import {Investor} from '../../model';
import {loginInvestor} from '../../store/user/actions';


export default function CredentialCollector(props: AuthenticationStackProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  /*const handleContinue = async () => {
    if (!validateFields()) {
      return;
    }
    setShowActivityIndicator(true);
    await registerInvestor(email, password).then((insertionAttempt) => {
      // user was successfully created
      if (insertionAttempt.user) {
        setLoggedInUser();
        store.dispatch(updateInvestor({email}));
        props.navigation.push(ROUTES.InvestorInfoCollector, {
          isSignedIn: false,
        });
      } else {
        handleRegistrationError(insertionAttempt.error);
      }
    });
    setShowActivityIndicator(false);
  };*/
  
  const handleSignUp = async () => {
    if (!validateFields()) {
      return;
    }
    setShowActivityIndicator(true);
    const investor: Investor = {
      firstName,
      middleName,
      lastName,
      username,
      email,
      password,
      hasAnsweredOnboardingQuestions: false,
      tradierAccessTokenExpiration: -1,
      tradierAccessToken: '',
      tradierIsWaitingForApproval: false,
    };
    await registerInvestorAllInfo(investor).then((insertionAttempt:any) => {
      // user was successfully created
      if (insertionAttempt.user) {
        setLoggedInUser();
        store.dispatch(updateInvestor({email}));
        console.log('investor handleSignUp: ', investor);
        store.dispatch(loginInvestor(investor.email!, investor));
        // Pass Instructor document to main stack
        props.navigation.navigate(ROUTES.Onboarding);
      } else {
        handleRegistrationError(insertionAttempt.error);
      }
    });
    setShowActivityIndicator(false);
  }

  const validateFields = (): boolean => {
    if (validateField(firstName)) {
      Alert.alert('Please enter first name.');
      return false;
    }
    if (validateField(lastName)) {
      Alert.alert('Please enter last name.');
      return false;
    }
    if (validateField(username)) {
      Alert.alert('Please enter username.');
      return false;
    }
    if (validateEmail()) {
      Alert.alert('Please enter a valid email address.');
      return false;
    }
    if (validateField(password)) {
      Alert.alert('Please enter password at least 6 digits.');
      return false;
    }

    return true;
  };

  const validateEmail = () => {
    let emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !emailReg.test(email);
  };

  const validatePassword = () => {
    return (
      password === ''
    );
  };

  const validateField = (fieldName: string) => {
    return (
      fieldName === ''
    );
  };

  const handleRegistrationError = (error: any) => {
    console.log('error: ', error);
    if(error.code){
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Email already in use');
          break;
        case 'auth/operation-not-allowed':
          Alert.alert('Error during sign up.');
          break;
        case 'auth/invalid-email':
          Alert.alert('That email address is invalid!');
          break;
        case 'auth/weak-password':
          Alert.alert('Password should be at least 6 characters');
          break;
        default:
          Alert.alert(error.message);
          break;
      }
    } else {
      Alert.alert(error);
    }
  };

  return (
    <View style={{flex:1}}>
      <Header
        leftButton={{
          child: BackArrow,
          onclick: () => props.navigation.goBack(),
        }}
        showLogo
      />
      <View>
        <Text style={styles.title}>Investor Information</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.form}>
              <StandardTextInput
                placeholder="First Name"
                onChangeText={(text: string) => setFirstName(text)}
                value={firstName}
                autoFocus={true}
              />
              <StandardTextInput
                placeholder="Middle Name / Initial"
                onChangeText={(text: string) => setMiddleName(text)}
                value={middleName}
              />
              <StandardTextInput
                placeholder="Last Name"
                onChangeText={(text: string) => setLastName(text)}
                value={lastName}
              />
              <StandardTextInput
                placeholder="Username"
                onChangeText={(text: string) => setUsername(text)}
                value={username}
              />
              <StandardTextInput
                placeholder="Email"
                onChangeText={(text: string) => setEmail(text)}
                value={email}
                autoFocus={false}
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
                onPress={() => handleSignUp()}
                text="Sign Up"
                textColor={Colors.white}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <LoadingScreen show={showActivityIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...Fonts.h1,
    alignSelf: 'center',
    marginTop: 20,
  },
});
