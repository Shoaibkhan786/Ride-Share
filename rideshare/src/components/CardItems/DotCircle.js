import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import DotCompnent from "./DotComponent";
import { Icon } from "native-base";

export default class DotCircle extends React.Component {
  render() {
    return (
        <View style={{marginStart:8, padding:4, justifyContent:'center', alignItems:'center'}}>
            <DotCompnent/>
            <View style={{height:12,width:2, marginTop:4,marginBottom:4, backgroundColor:"#7777",}}/>
            {/* <DotCompnent/> */}
            <Icon name="marker" type="Foundation" style={{color:"rgb(52,73,94)", fontSize:14}}/>
        </View>
    )
        ;
  }
}

const styles = StyleSheet.create({});
