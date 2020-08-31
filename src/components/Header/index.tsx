import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {Utils} from '../../styles';
// @ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
Icon.loadFont();

type Props = {
  goBack?(): void;
  showLogo?: boolean;
  bottomBorder?: boolean;
  rightButton?(): void;
  rightIcon?: Element;
};

export default function Header({
  goBack,
  bottomBorder,
  rightButton,
  rightIcon,
  showLogo,
}: Props) {
  let middleStyles = {};
  if (goBack) {
    if (rightButton) {
      middleStyles = styles.middleIcon;
    } else {
      middleStyles = styles.rightIcon;
    }
  } else if (rightButton) {
    middleStyles = styles.leftIcon;
  } else {
    middleStyles = styles.singleIcon;
  }

  return (
    <View style={[styles.header, bottomBorder ? styles.bottomBorder : null]}>
      {goBack && (
        <TouchableHighlight style={styles.backButton} onPress={() => goBack()}>
          <Icon name="chevron-thin-left" size={30} color="black" />
        </TouchableHighlight>
      )}
      {showLogo && (
        <View style={[styles.logoContainer, middleStyles]}>
          <Image
            style={[styles.headerIcon, styles.logo]}
            source={require('../../../assets/images/logo/default-logo.png')}
          />
        </View>
      )}
      {rightButton && (
        <TouchableHighlight
          style={styles.rightButton}
          onPress={() => rightButton()}>
          {rightIcon || <Icon name="log-out" size={20} color="black" />}
        </TouchableHighlight>
      )}
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
