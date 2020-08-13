import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ProgressBar from '../ProgressBar';
import {Colors, Fonts} from '../../styles';
import {StandardTextInput} from '../input/StandardTextInput';
import {LargeSquareOnPress} from '../buttons';
import Header from '../Header';
import {OnboardingStackProps} from '../../navigation/onboarding/types';
import {ROUTES} from '../../util/routes';

export default function InvestorInfoSelector(props: OnboardingStackProps) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <View>
      <Header goBack={() => props.navigation.goBack()} />
      <ProgressBar steps={2} currentStep={1} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Text style={styles.title}>Investor Information</Text>
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
            <LargeSquareOnPress
              onPress={() => props.navigation.navigate(ROUTES.Main)}
              text="Sign Up"
              textColor={Colors.white}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
