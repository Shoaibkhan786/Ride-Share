import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Header, Left, Body, Right, Button, Icon } from "native-base";

export default class AppHeader extends Component {
  render() {
    return (

        <Header>
            <Left>
                <Button
                iconLeft
                transparent
                onPress={()=> console.log("Butt of header menu clicked!")}>
                    <Icon ios="ios-menu"  android="md-menu" style={{fontSize:30, color:"white"}}/>>
                </Button>

            </Left>

            <Body>

            </Body>

            <Right>

            </Right>
        </Header>
    //   <View style={styles.container}>
    //     <Text style={styles.welcome} onPress={() => Actions.history()}>
    //       Click lead to new screen
    //     </Text>
    //   </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bb0000"
  },

});
