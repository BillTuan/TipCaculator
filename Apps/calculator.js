/* @flow */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Cal extends Component {
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
