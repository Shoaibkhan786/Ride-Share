import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage  
} from "react-native";
import Button from "../../components/Button/CustomButton";

import { Actions } from "react-native-router-flux";
import { inject, observer } from "mobx-react";
// import  { Notification } from 'react-native-firebase';
import firebase, {
  Notification,
  NotificationOpen
} from "react-native-firebase";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

@inject("store")
@observer
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.container}
          source={require("../../asset/image/login-background.jpg")}
        >
          <TouchableOpacity>
            <View>
              <Button
                width={170}
                height={40}
                textColor={"black"}
                backgroundColor={"white"}
                targetScreen="offerRide"
                buttonText={"Offer a Ride"}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginTop: 8 }}>
              <Button
                width={170}
                height={40}
                textColor={"white"}
                targetScreen="searchRide"
                buttonText={"Search a Ride"}
              />
            </View>

            {/* <TouchableOpacity>
              <Text>{"Show Notification"}</Text>
            </TouchableOpacity> */}
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
