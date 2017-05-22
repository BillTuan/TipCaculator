import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, AsyncStorage,} from 'react-native';
import{Navigator} from "react-native-deprecated-custom-components";
import SegmentedControlTab from 'react-native-segmented-control-tab';

import CustomNavBar from './NavBar.js';
import CalculatorPage from './calculator.js';
import SettingPage from './setting.js';

export default class Cal extends Component {

  constructor(props) {
      super(props);
      this.state = {
          transition: null
      }
  }
  renderScene(route, navigator){
    switch (route.name) {
      case "CalculatorPage": return(<CalculatorPage/>);
      case "SettingPage": return(<SettingPage/>);
    }
  }

  async getSceneTransition(){
    try{
      const sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      this.setState({
          transition: sceneTransitionValue
      })
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }
 configureScene (route, routeStack) {
   this.getSceneTransition();
   switch(this.state.transition)
   {
     case "FloatFromRight":
      return Navigator.SceneConfigs.FloatFromRight;
      break;
     case "FloatFromLeft":
      return Navigator.SceneConfigs.FloatFromLeft;
      break;
     case "FloatFromBottom":
      return Navigator.SceneConfigs.FloatFromBottom;
      break;
     case "FloatFromBottomAndroid":
      return Navigator.SceneConfigs.FloatFromBottomAndroid;
      break;
     case "SwipeFromLeft":
      return Navigator.SceneConfigs.SwipeFromLeft;
      break;
     case "HorizontalSwipeJump":
      return Navigator.SceneConfigs.HorizontalSwipeJump;
      break;
     case "HorizontalSwipeJumpFromRight":
      return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
      break;
     default :
      return Navigator.SceneConfigs.FloatFromRight;
      break;
   }
  }
  render() {
    return (
      <Navigator
        initialRoute={{name:"CalculatorPage"}}
        renderScene={this.renderScene}
        configureScene={this.configureScene.bind(this)}
        navigationBar={CustomNavBar}
      />
    );
  }
}

module.exports = Cal;
