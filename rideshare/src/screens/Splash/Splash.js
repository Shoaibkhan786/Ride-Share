import React, { Component } from "react";
import { ImageBackground, View, Dimensions, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";
import { inject, observer } from "mobx-react";


@inject("store")
@observer
export default class Splash extends Component {
  
  constructor(props){
    super(props)    
  }
  componentDidMount() {
    setTimeout(() => {
      //if user is already registered
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          //local number saving
          AsyncStorage.setItem("phoneNumber", user.phoneNumber);
          Actions.reset("bottomNav");
        } else {
          Actions.reset("login");
        }
      });
    }, 1000);
  }
  componentWillMount() {
    //Remote notification listener,when app is in neither foreground nor background.
    this.remoteNotification = firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // Get information about the notification that was opened
          const notification: NotificationOpen = notificationOpen.notification;
          this.props.store.userContact = notification.data.contact;
          this.props.store.bookingDate = notification.data.date;

          if (notification.data.id == 0) {
            if (this.props.store.notificationId == null) {
              this.props.store.notificationId = notification.notificationId;
              Actions.bookedTabRides();
            }
          } else {
            //Go to notification Screens
            if (this.props.store.notificationId == null) {
              this.props.store.notificationId = notification.notificationId;
              Actions.notificationTab();
            }
          }
        }
      });
  }
  componentWillUnmount(){
   this.remoteNotification;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../asset/image/login-background.jpg")}
          style={{ height: screenHeight, width: screenWidth }}
        />
      </View>
    );
  }
}
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
