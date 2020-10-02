import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Utils} from '../../styles';
// @ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

export type HeaderButton = {
  text?: string;
  child: JSX.Element;
  onclick(): void;
};

export type HeaderProps = {
  leftButton?: HeaderButton;
  rightButton?: HeaderButton;
  showLogo?: boolean;
  showBottomBorder?: boolean;
};

export default function Header(props: HeaderProps) {
  // The Logo's position will be set based on if left and right buttons are provided.
  // It should always be center.
  let logoStyles = {};
  const {leftButton, rightButton, showLogo, showBottomBorder} = props;

  if (leftButton) {
    if (rightButton) {
      logoStyles = styles.middleIcon;
    } else {
      logoStyles = styles.rightIcon;
    }
  } else if (rightButton) {
    logoStyles = styles.leftIcon;
  } else {
    logoStyles = styles.singleIcon;
  }

  return (
    <View
      style={[styles.header, showBottomBorder ? styles.bottomBorder : null]}>
      {leftButton && (
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => leftButton?.onclick()}
          activeOpacity={0}>
          {leftButton.child}
        </TouchableOpacity>
      )}
      {showLogo && (
        <View style={[styles.logoContainer, logoStyles]}>
          <Image
            style={[styles.headerIcon, styles.logo]}
            source={require('../../../assets/images/logo/newLogo.png')}
          />
        </View>
      )}
      {rightButton && (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => rightButton?.onclick()}
          activeOpacity={0}>
          {rightButton.child}
        </TouchableOpacity>
      )}
    </View>
  );
}

const headerImageSize = Utils.DEVICE_HEIGHT / 15;
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

  leftButton: {
    marginLeft: 10,
    flex: 4,
  },

  headerIcon: {
    height: headerImageSize,
    width: headerImageSize,
  },

  logoContainer: {
    flex: 4,
    // backgroundColor: 'blue',
  },

  singleIcon: {
    alignItems: 'center',
  },

  middleIcon: {
    alignItems: 'center',
  },

  rightIcon: {
    flex: 5,
    justifyContent: 'flex-start',
  },

  leftIcon: {
    flex: 5,
    alignItems: 'flex-end',
  },

  logo: {
    resizeMode: 'contain',
    borderRadius: 5,
    // alignSelf: 'center',
  },

  bottomBorder: {
    borderBottomWidth: 0.5,
  },

  rightButton: {
    flex: 4,
    alignItems: 'flex-end',
    marginRight: 10,
  },
});
