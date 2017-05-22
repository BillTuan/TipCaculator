import React, {Component} from 'react';
import {AppRegistry, StyleSheet,Text, TouchableOpacity, AsyncStorage} from 'react-native';
import{Navigator} from "react-native-deprecated-custom-components";

  var NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.name != 'CalculatorPage'){
      return (
        <TouchableOpacity onPress={() => navigator.pop()}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity onPress={() => navigator.push({name: 'SettingPage'})}>
          <Text style={styles.text}>Setting</Text>
        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  },
}
const styles = StyleSheet.create({
  text:{
    fontSize: 20,
  }
});
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
)
