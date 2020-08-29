import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {TradierCredentials} from '../../model';
import {HomeStackProps} from '../../navigation/home/types';
import store from '../../store';
import {updateCredentials} from '../../store/tradier/actions';

type Props = HomeStackProps & {
  onAuth(credentials: TradierCredentials): void;
};

export default function TradierView(props: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [webView, setWebView] = useState<WebView>();

  function handleNavigationChange(navState: WebViewNavigation) {
    const {url} = navState;

    if (url.includes('?client_id=') && !isAuthenticated) {
      setIsAuthenticated(true);
      webView?.stopLoading();
      store.dispatch(updateCredentials(parseURL(url)));
      props.navigation.goBack();
    }
  }

  function parseURL(url: string): TradierCredentials {
    console.log('url: ', url);
    let clientId = url.split('?client_id=')[1];
    clientId = clientId.substring(0, 32);

    let state = url.split('state=')[1];

    let scope = url.split('scope=')[1];
    const upperBounds = scope.length - state.length - 7;
    scope = scope.substring(0, upperBounds);

    return {
      clientId: clientId,
      state: state,
      scope: scope,
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={(ref) => setWebView(ref!)}
        source={{uri: 'https://brokerage.tradier.com/user/login'}}
        onNavigationStateChange={(state) => handleNavigationChange(state)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
