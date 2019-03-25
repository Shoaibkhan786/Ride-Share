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
import { Button } from "native-base";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Text, View } from "react-native";
import {Tabar} from '../../screens/../../routes'
export default class CustomeButton extends Component {
  constructor(props) {
    super(props);
  }
  handleAction = () => {
   if(this.props.targetScreen=="searchRide" ||this.props.targetScreen=="offerRide" ||this.props.targetScreen=="searchList"){
    Actions.push(this.props.targetScreen);
   } else{
    this.props.targetScreen == undefined
      ? null
      :
      Actions.reset(this.props.targetScreen)
  }};
  render() {
    return (
      <View>
        <Button
          bordered
          light
          onPress={this.handleAction}
          style={{
            borderColor: this.props.borderColor,
            backgroundColor: this.props.backgroundColor,
            width: this.props.width == undefined? 120 :this.props.width ,
            height: this.props.height == undefined? 42 : this.props.height,
            justifyContent: "center",
            alignItems: "center",
            borderRadius:this.props.borderRadius==undefined?18:this.props.borderRadius
          }}
        >
          <Text style={{ color: this.props.textColor == undefined ? "white" : this.props.textColor }}>
            {this.props.buttonText==undefined ? "Button Text" : this.props.buttonText}
          </Text>
        </Button>
      </View>
    );
  }
}
