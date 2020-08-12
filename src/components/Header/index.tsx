import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {Utils} from '../../styles';

type Props = {
  goBack(): void;
};

export default function Header({goBack}: Props) {
  return (
    <View style={styles.header}>
      <TouchableHighlight style={styles.backButton} onPress={() => goBack()}>
        <Image
          style={styles.headerIcon}
          source={require('../../../assets/images/navigation/back4.png')}
        />
      </TouchableHighlight>
      <View style={styles.logoContainer}>
        <Image
          style={[styles.headerIcon, styles.logo]}
          source={require('../../../assets/images/logo/default-logo.png')}
        />
      </View>
    </View>
  );
}

const headerImageSize = Utils.DEVICE_HEIGHT / 25;
const styles = StyleSheet.create({
  header: {
    height: Utils.DEVICE_HEIGHT / 15,
    marginTop: Utils.DEVICE_HEIGHT / 27,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    marginLeft: 10,
    flex: 4,
  },

  headerIcon: {
    height: headerImageSize,
    width: headerImageSize,
  },

  logoContainer: {
    flex: 5,
    justifyContent: 'center',
  },

  logo: {
    resizeMode: 'contain',
    borderRadius: 5,
  },
});
