import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {HomeStackProps} from '../../navigation/home/types';
import store from '../../store';
import {getAccessToken} from '../../services/tradier';
import {updateInvestor} from '../../store/user/actions';

export default function TradierView(props: HomeStackProps) {
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
        store.dispatch(
          updateInvestor({
            tradierAccessToken: data.access_token,
            tradierAccessTokenExpiration: Date.now() / 1000 + 82399,
          }),
        );
      });
      props.navigation.goBack();
    }
  }
  return (
    <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
