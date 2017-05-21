/* @flow */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, Button, Picker, AsyncStorage} from 'react-native';
import{Navigator} from "react-native-deprecated-custom-components";
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Cal extends Component {
  renderScene(route, navigator){
    switch (route.name) {
      case "main": return(<CalculatorPage toSetting = {() => {navigator.push({name:"setting"})}}/>);
      case "setting": return(<Setting backMain = {() => {navigator.pop({name:"main"})}}/>);
    }
  }
  configureScene(route, routeStack){
    return Navigator.SceneConfigs.FloatFromRight;
  }
  render() {
    return (
      <Navigator
        initialRoute={{name:"main"}}
        renderScene={this.renderScene}
        configureScene={ this.configureScene }
      />
    );
  }
}

class CalculatorPage extends Component{
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      billAmount: 0,
      result: 0,
      tipAmount: 0,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
    // console.log(index);
    this.handleBillAmountChange(this.state.billAmount, index);
  }

  handleBillAmountChange(bill, index) {
    this.setState({billAmount: bill})

    if (!index && index != 0) {
      index = this.state.selectedIndex;
    }
    if (!bill) {
      bill = 0;
    } else {
      bill = parseFloat(bill);
    }
    var percent = this.segmentValue()[index];
    percent = parseFloat(percent) / 100;

    var result = bill + (bill * percent);
    result = parseInt(result);

    this.setState({
      result: result,
      tipAmount: parseInt(bill * percent)
    })
  }

  segmentValue() {
    return ['10%', '15%', '50%'];
  }

  render() {
    return (
      <View>
        <Button
             tyle={{flex:1, margin:10, fontSize:20}}
             title="Setting"
             onPress={this.props.toSetting}
           />
        <View>
          <Text style={styles.title}>Tip Calculator</Text>
        </View>

        <View>
          <TextInput
            placeholder="Amount of bill"
            placeholderTextColor="blue"
            returnKeyType="done"
            keyboardType='numeric'
            maxLength={20}
            style={styles.textInput}
            autoFocus={true}
            onChangeText= {(billAmount) => this.handleBillAmountChange(billAmount)}
          />
      </View>

        <View>
          <Text style={styles.text}>Tip Amount: {this.state.tipAmount}</Text>
        </View>
        <View style={styles.segment}>
          <SegmentedControlTab
            values={this.segmentValue()}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
        </View>
        <View>
          <Text style={styles.text}>Bill Amount: {this.state.billAmount}</Text>
          <Text style={styles.text}>Percent: {this.segmentValue()[this.state.selectedIndex]}</Text>
        </View>

        <View>
          <Text style={styles.result}>Result: {this.state.result}</Text>
        </View>
      </View>
    );
  }
}

class Setting extends Component{

  constructor(){
    super()
    this.state = {
      sceneTransition: "FloatFromRight",
      scene: "",
    }
  }

  setSelectSceneTransition(scene){
    try {
      this.setSceneTransition(scene);
      this.setState({
        scene: scene
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }

  async setSceneTransition(scene){
    try{
      await AsyncStorage.setItem('SCENE_SELECTED', scene);
      this.setState({
        sceneTransition : scene
      })
    }catch(error){
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  componentDidMount(){
    this.getSceneTransition();
  }

  async getSceneTransition(){
  try{
    let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
    // Store value to State
    this.setState({
      sceneTransition : sceneTransitionValue
    });
  }catch(error){
    console.log("Hmm, something when wrong when get data..." + error);
  }
}

  render(){
    return(
      <View>
        <Button
          style={{width:10, flex:0.1}}
          title="Go Back"
          onPress={this.props.backMain}
        />

        <View style={{marginTop:50,padding:10}}>
        <View>
          <Text style={{fontSize:25}}>Scene Transitions</Text>
          <Picker
            selectedValue={this.state.sceneTransition}
            onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight" />
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
          </Picker>
        </View>
      </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 64
  },
  textInput: {
      fontSize: 20,
      margin: 10,
  },
  text:{
    fontSize: 20,
    marginBottom: 10,
  },
  title: {
      textAlign: 'center',
      fontFamily: 'Overpass-Bold',
      marginTop: 30,
      fontWeight: '900',
      fontSize: 30,
      color: 'black'
  },
  result: {
    fontFamily: 'Overpass-Bold',
    fontWeight: '900',
    fontSize: 22
  },
  segment:{
    marginBottom: 10,
  },

});

module.exports = Cal;
