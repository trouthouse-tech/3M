import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../../styles';

function returnView(){
  return <View style={styles.loading}><ActivityIndicator size="large" color={Colors.main_green} /></View>;
}

export function LoadingScreen(prop) {
  let animate = true;
  if(prop.show == false){
    animate = false;
  }

  return animate == true? returnView(): null 
}

const styles = StyleSheet.create({
  loading: {
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
