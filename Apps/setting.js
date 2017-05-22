import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Picker,
} from 'react-native';


export default class SettingPage extends Component {
  constructor(){
    super()
    this.state = {
      sceneTransition: "FloatFromRight",
      scene: "",
      segment_1: "",
      segment_2: "",
      segment_3: "",
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
    this.getSegmentValue();
  }

  async getSceneTransition(){
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      this.setState({
        sceneTransition : sceneTransitionValue
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }
  async getSegmentValue(){
    try{
      let segmentValue_1 = await AsyncStorage.getItem("SEGMENT_1");
      let segmentValue_2 = await AsyncStorage.getItem("SEGMENT_2");
      let segmentValue_3 = await AsyncStorage.getItem("SEGMENT_3");
      console.log(segmentValue_1, segmentValue_2, segmentValue_3);
      this.setState({
        segment_1: parseFloat(segmentValue_1),
        segment_2: parseFloat(segmentValue_2),
        segment_3: parseFloat(segmentValue_3),
      });
      console.log(this.state.segment_1);
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }
  setSelectSegment1(value){
    try {
      this.saveSengment1(value);
      this.setState({
        segment_1: value
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }
  setSelectSegment2(value){
    try {
      this.saveSengment2(value);
      this.setState({
        segment_2: value
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }
  setSelectSegment3(value){
    try {
      this.saveSengment3(value);
      this.setState({
        segment_3: value
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }
  async saveSengment1(value){
    try{
      await AsyncStorage.setItem('SEGMENT_1', value.toString());
      console.log(value);
    }catch(error){
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }
  async saveSengment2(value){
    try{
      await AsyncStorage.setItem('SEGMENT_2', value.toString());
      console.log(value);
    }catch(error){
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }
  async saveSengment3(value){
    try{
      await AsyncStorage.setItem('SEGMENT_3', value.toString());
      console.log(value);
    }catch(error){
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }
  render(){
    var tipPicker = [];
    for (var i = 5; i < 100; ) {
      var value = i.toString() + '%';
      tipPicker.push(
        <Picker.Item label={value} value={i/100} key={i}/>
      );
      i = i + 5;
    }
    return(
      <View>
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
      <View style={{padding:10}}>
        <Text style={{fontSize:20}}>Set tip percentage</Text>
        <Picker
          selectedValue={this.state.segment_1}
          onValueChange={(value) =>this.setSelectSegment1(value)}>
          {tipPicker}
        </Picker>
      </View>
      <View style={{padding:10}}>
        <Picker
          selectedValue={this.state.segment_2}
          onValueChange={(value) =>this.setSelectSegment2(value)}>
          {tipPicker}
        </Picker>
      </View>
      <View style={{padding:10}}>
        <Picker
          selectedValue={this.state.segment_3}
          onValueChange={(value) =>this.setSelectSegment3(value)}>
          {tipPicker}
        </Picker>
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

  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  list: {
    marginTop: 30,
    marginLeft: 5
  },
  myInputStyle: {
    borderBottomWidth: 1,
    width: 300,
    height: 70,
    marginLeft: 30,
  },
  textInput: {
    height: 60,
    fontSize: 26,
    color: 'black'
  }

});

module.exports = SettingPage;
