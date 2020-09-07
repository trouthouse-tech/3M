import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import ProgressBar from '../ProgressBar';
import {Colors, Fonts} from '../../styles';
import {StandardTextInput} from '../input/StandardTextInput';
import {LargeSquareOnPress} from '../buttons';
import Header from '../Header';
import {AuthenticationStackProps} from '../../navigation/authentication/types';
import {ROUTES} from '../../util/routes';
import store from '../../store';
import {loginInvestor} from '../../store/user/actions';
import {createInvestor, setLoggedInUser} from '../../services/investor';
import {Investor} from '../../model';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';

function InvestorInfoCollectorBase(props: AuthenticationStackProps) {
  const [email] = useState(props.user?.email);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [firstAttempt, setFirstAttempt] = useState(true);

  useEffect(() => {
    // We need to update AsyncStorage to indicate if a Instructor has logged in.
    // It will be set to false upon logout.
    setLoggedInUser();
    // @ts-ignore
    if (props.route.params.isSignedIn && firstAttempt) {
      Alert.alert('Please finish registering.');
    }
    setFirstAttempt(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, middleName, lastName, username]);

  async function handleSignUp() {
    const investor: Investor = {
      firstName,
      middleName,
      lastName,
      username,
      email,
      hasAnsweredOnboardingQuestions: false,
      tradierAccessTokenExpiration: -1,
      tradierAccessToken: '',
    };
    console.log('investor handleSignUp: ', investor);
    await createInvestor(investor)
      .then((insertionAttempt) => {
        if (!insertionAttempt.error) {
          console.log('handleSignUp: ', investor);
          store.dispatch(loginInvestor(investor.email!, investor));
          // Pass Instructor document to main stack
          props.navigation.navigate(ROUTES.Onboarding);
        }
      })
      .catch((error) => console.log('error: ', error));
  }

  return (
    <View>
      <Header showLogo />
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
              onPress={() => handleSignUp()}
              text="Sign Up"
              textColor={Colors.white}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
});

const mapDispatchToProps = () => ({});

export const InvestorInfoCollector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvestorInfoCollectorBase);

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
