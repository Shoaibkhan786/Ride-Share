import React, { Component } from "react";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import { Thumbnail, Icon } from "native-base";
import call from "react-native-phone-call";

export default class Passenger extends Component {
  constructor(props) {
    super(props);
  }
  phoneCall(number) {
    console.log("I am called");
    const args = {
      number: number, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(args).catch(console.error);
  }

  render() {
    return (
      <View
        style={{
          borderWidth: 0.1,
          borderRadius: 4,
          borderColor: "#ddd",
          borderBottomWidth: 0,
          shadowColor: "#000",
          margin: 8,
          shadowColor: "rgba(0,0,0, .4)", // IOS
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 1, // IOS
          shadowRadius: 1, //IOS
          elevation: 2, // Android
          flexDirection: "column",
          padding: 16
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Thumbnail
              style={{
                width: 72,
                height: 72,
                borderRadius: 72 / 2,
                marginTop: 8,
                marginBottom: 8
              }}
              source={
                this.props.imageUri == "null"
                  ? require("../../asset/image/profile.png")
                  : { uri: this.props.imageUri }
              }
            />
          </View>
          <View
            style={{
              marginLeft: 8,
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column"
            }}
          >
            <Text style={{ fontSize: 16, color: "black" }}>{this.props.name}</Text>
            <Text style={{ marginTop: 8 }}>{this.props.contact} </Text>
          </View>
          <View style={{ flex: 1,alignItems:'flex-end',justifyContent:"center"}}>
            <TouchableOpacity
              onPress={() => {
                this.phoneCall(this.props.contact);
              }}
            >
              <Icon name="phone" type="FontAwesome" />
            </TouchableOpacity>
          </View>

          {/* <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          > */}
          {/* <TouchableOpacity
              onPress={() => {
                this.phoneCall("+923006088706");
              }}
            >
              <Icon name="phone" type="FontAwesome" />
            </TouchableOpacity> */}
          {/* </View> */}
        </View>
        <View style={{ marginLeft: 80, flexDirection: "row" }} />
      </View>
    );
  }
}
