import React from "react";
import { Text, View } from "react-native";
// import {Text} from 'native-base';
export default class TextLabel extends React.Component {
  render() {
    return (
      <View
        style={{
          height: this.props.textHeight,
          width: this.props.textWidth,
          borderWidth: this.props.borderWidth,
          borderRadius: 4,
          borderColor: this.props.borderColor,
          borderBottomWidth: this.props.borderBottomWidth,
          shadowColor: this.props.shadowColor,

          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
          flexDirection: "row",
          backgroundColor: this.props.backgroundColor,
          alignSelf: "baseline",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: this.props.textColor,
            paddingHorizontal: this.props.paddingHorizontal == undefined? 8 : this.props.paddingHorizontal,
            paddingVertical: this.props.paddingVertical == undefined? 8: this.props.paddingVertical
          }}
        >
          {this.props.labelText}
        </Text>
      </View>
    );
  }
}
