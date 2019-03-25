/**
 * Created:2018-10-18
 * Created By:Muhammad Shoaib Khan
 * This component enables you to customize the button and used whenever it needed
 * Props:
 * borderColor:customize border color
 * backgroundColor:button background color
 * height:height of the button
 * width:width of the button
 * textColor:text color of the button
 * targetScreen:action for button for navigating between screens
 */
import React, { Component } from "react";
import { View, TextInput } from "react-native";

export default class Numeric extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          borderColor:
            this.props.borderColor == undefined
              ? "#ddd"
              : this.props.borderColor,
          borderWidth:
            this.props.borderWidth == undefined ? 0.1 : this.props.borderWidth,
          borderRadius:
            this.props.borderRadius == undefined ? 4 : this.props.borderRadius,
          shadowOffset: { height: 1, width: 1 }, // IOS
        }}
      >
        <TextInput
          underlineColorAndroid={
            this.props.underline == "transparent" ? "transparent" : null
          }
          maxLength ={1}
          keyboardType={"numeric"}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderColor}
          style={{
            flexDirection:'row',
            height: this.props.height == undefined ? 42 : this.props.height,
            width: this.props.width,
          }}
        />
      </View>
    );
  }
}
