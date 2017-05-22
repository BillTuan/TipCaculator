/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Calculator from "./Apps/index.js";

export default class TipCaculator extends Component {
  render() {
    return (
      <Calculator/>
    );
  }
}


AppRegistry.registerComponent('TipCaculator', () => TipCaculator);
