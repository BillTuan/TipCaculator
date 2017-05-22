/* @flow */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, Button, Picker, AsyncStorage, Animated, Keyboard} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class CalculatorPage extends Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      billAmount: 0,
      result: 0,
      tipAmount: 0,
      isValid: null,
      segment_1: 0,
      segment_2: 0,
      segment_3: 0,
      numberPerson: 1,
      tipPerson: 0,
      totalPerson:0,
    };
    this.animatedValue = new Animated.Value(0);
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
    this.handleBillAmountChange(this.state.billAmount, index);
  }
  componentWillMount() {
    this.inputValue = '';
  }
  selectField() {
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 200
    }).start();
  }

  deselectField() {
    if (this.state.billAmount) {
      return;
    }
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 200
    }).start();
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

    var tipAmount = bill * percent;
    this.setState({
      result: result,
      tipAmount: parseFloat(tipAmount).toFixed(2)
    })

    var number = this.state.numberPerson;
    this.handleNumberPersonChange(number, tipAmount, result);
  }

  handleNumberPersonChange(number, tipAmount, result){
    this.setState({numberPerson: number})

    if (!number) {
      number = 1;
    } else {
      number = parseFloat(number);
    }

    var tipPerson = tipAmount/number;
    var total = result/number;

    this.setState({
      tipPerson: parseFloat(tipPerson).toFixed(2),
      totalPerson: parseFloat(total).toFixed(2),
    })
  }

  segmentValue() {
    return [this.state.segment_1*100 + "%", this.state.segment_2*100 + "%",this.state.segment_3*100 + "%"];
  }

  componentWillMount(){
    this.getSegmentValue();
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

  render() {
    let that = this;
    let interpolatedLabelPosition = that.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [35, 0]
    });
    let interpolatedLabelSize = that.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [26, 14]
    });
    let borderColor = (this.state.isValid === null)? '#999': ((this.state.isValid === true)? '#88ff00': '#F00');
    let color = (this.state.isValid === true)? '#88ff00': '#0076FF';
    return (
      <View>
        <View>
          <Text style={styles.title}>Tip Calculator</Text>
        </View>

        <View style={[styles.myInputStyle, { borderColor: borderColor}]}>
          <Animated.Text
            style={{fontSize: interpolatedLabelSize, top: interpolatedLabelPosition, color: color}}>
            Bill Amount
          </Animated.Text>
           <TextInput
            style={styles.textInput}
            onFocus={()=> {this.selectField()}}
            onBlur={()=> {this.deselectField()}}
            returnKeyType="done"
            keyboardType='numeric'
            maxLength={15}
            autoFocus={true}
            onChangeText= {(billAmount) => this.handleBillAmountChange(billAmount)}
          />
      </View>

      <View style={[styles.myInputStyle, { borderColor: borderColor}]}>
        <Animated.Text
          style={{fontSize: interpolatedLabelSize, top: interpolatedLabelPosition, color: color}}>
          Number of Person
        </Animated.Text>
         <TextInput
          style={styles.textInput}
          onFocus={()=> {this.selectField()}}
          onBlur={()=> {this.deselectField()}}
          returnKeyType="done"
          keyboardType='numeric'
          maxLength={15}
          defaultValue = {this.state.numberPerson.toString()}
          onChangeText= {(numPerson) => this.handleNumberPersonChange(numPerson,this.state.tipAmount, this.state.result)}
        />
    </View>

        <View>
          <Text style={styles.text}>Tip Amount: {this.state.tipAmount}</Text>
        </View>
        <View>
          <Text style={styles.text}>Tip Per Person: {this.state.tipPerson}</Text>
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
          <Text style={styles.result}>Total Per Person: {this.state.totalPerson}</Text>
          <Text style={styles.result}>Total: {this.state.result}</Text>
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
    margin: 20,
  },
  textInput: {
    height: 60,
    fontSize: 26,
    color: 'black'
  }

});

module.exports = CalculatorPage;
