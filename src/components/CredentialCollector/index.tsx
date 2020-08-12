import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import ProgressBar from '../ProgressBar';
import {Colors, Fonts} from '../../styles';
import {StandardTextInput} from '../input/StandardTextInput';
import {LargeSquareOnPress} from '../buttons';
import {OnboardingStackProps} from '../../navigation/types';
import Header from '../Header';

export default function CredentialCollector(props: OnboardingStackProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleContinue = async () => {
    if (!validateFields()) {
      return;
    }
  };

  const validateFields = (): boolean => {
    if (validateEmail()) {
      Alert.alert('Please enter a valid email address.');
      return false;
    }
    if (validatePassword()) {
      Alert.alert('Passwords not entered or do not match.');
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
      password === '' || confirmPassword === '' || password !== confirmPassword
    );
  };

  return (
    <View>
      <Header goBack={() => props.navigation.goBack()} />
      <ProgressBar steps={4} currentStep={0} />
      <Text style={styles.title}>Login Information</Text>
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
        <StandardTextInput
          placeholder="Confirm Password"
          onChangeText={(text: string) => setConfirmPassword(text)}
          value={confirmPassword}
          autoFocus={false}
          secureTextEntry={true}
        />
        <LargeSquareOnPress
          onPress={() => handleContinue()}
          text="Continue"
          textColor={Colors.white}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Fonts.h1,
    alignSelf: 'center',
    marginTop: 20,
  },

  form: {
    flex: 1,
    alignItems: 'center',
  },
});
