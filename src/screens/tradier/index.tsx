import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {HomeStackProps} from '../../navigation/home/types';
import store from '../../store';
import {getAccessToken} from '../../services/tradier';
import {updateInvestor} from '../../store/user/actions';
import Header from '../../components/Header';
import {BackButton} from '../../components/Header/HeaderItems';
import {updateInvestorDocument} from '../../services/investor';
import {AppState} from '../../store/types';
import {connect} from 'react-redux';
import {UserState} from '../../store/user/types';

type Props = HomeStackProps & {
  user: UserState;
};

function TradierViewBase(props: Props) {
  console.log('props: ', props);
  const [webView, setWebView] = useState<WebView>();
  const [clientId] = useState('hSPco1otJoZXyfBiR3tFMPg0WPXPaTuI');
  const [scope] = useState('read,write,trade,market');
  const [state] = useState('hahajd-u3ud7s-jsk4-dj-s');

  async function handleNavigationChange(navState: WebViewNavigation) {
    // The url of the page once the user approves access to their account
    const {url} = navState;

    if (url.includes('?code=')) {
      webView?.stopLoading();
      let code = url.split('code=')[1];
      code = code.substring(0, 8);

      await getAccessToken(code).then((data) => {
        console.log('data access_token', data.access_token);
        const expirationDate = Date.now() / 1000 + 82399;
        store.dispatch(
          updateInvestor({
            tradierAccessToken: data.access_token,
            tradierAccessTokenExpiration: expirationDate,
            tradierIsWaitingForApproval: false,
          }),
        );
        updateInvestorDocument(props.user.email!, {
          tradierAccessToken: data.access_token,
          tradierAccessTokenExpiration: expirationDate,
          hasAuthenticatedTradier: true,
          tradierIsWaitingForApproval: false,
        });
      });
      props.navigation.goBack();
    }

    if (url.includes('complete')) {
      webView?.stopLoading();
      store.dispatch(updateInvestor({tradierIsWaitingForApproval: true}));
      props.navigation.goBack();
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftButton={{
          child: BackButton,
          onclick: () => props.navigation.goBack(),
        }}
        showLogo
        showBottomBorder
      />
      <WebView
        ref={(ref) => setWebView(ref!)}
        source={{
          uri: `https://api.tradier.com/v1/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${state}`,
        }}
        onNavigationStateChange={(navState) => handleNavigationChange(navState)}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = () => ({});

export const TradierView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradierViewBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
