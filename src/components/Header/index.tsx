import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {Utils} from '../../styles';
// @ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

type Props = {
  goBack?(): void;
};

export default function Header({goBack}: Props) {
  return (
    <View style={styles.header}>
      {goBack && (
        <TouchableHighlight style={styles.backButton} onPress={() => goBack()}>
          <Icon name="chevron-thin-left" size={30} color="black" />
        </TouchableHighlight>
      )}
      <View style={[styles.logoContainer, !goBack ? styles.singleIcon : null]}>
        <Image
          style={[styles.headerIcon, styles.logo]}
          source={require('../../../assets/images/logo/default-logo.png')}
        />
      </View>
    </View>
  );
}

const headerImageSize = Utils.DEVICE_HEIGHT / 25;
const height =
  Utils.DEVICE_HEIGHT === 896
    ? Utils.DEVICE_HEIGHT / 20
    : Utils.DEVICE_HEIGHT / 16;

const marginBottom =
  Utils.DEVICE_HEIGHT === 896 ? Utils.DEVICE_HEIGHT / 100 : 0;

const styles = StyleSheet.create({
  header: {
    height: height,
    marginBottom: marginBottom,
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
  },

  singleIcon: {
    alignItems: 'center',
  },

  logo: {
    resizeMode: 'contain',
    borderRadius: 5,
  },
});
