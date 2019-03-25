import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity, 
  AsyncStorage
} from "react-native";

import CustomButton from "../../components/Button/CustomButton";
import { Container, Content, Text } from "native-base";
import { inject, observer } from "mobx-react";
import { Thumbnail, Icon } from "native-base";
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import Spinner from "react-native-loading-spinner-overlay";

@inject("store")
@observer
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    console.log("Main phr call hoa");
    this.state = {
      data: null,
      bool: true
    };
  }
  componentWillMount() {
    tempData = [];
    if (this.props.store.bookingDate != null) {
      console.log("I am component will mount");
      AsyncStorage.getItem("phoneNumber").then(phoneNumber => {
        firebase
          .database()
          .ref("Notification")
          .child(phoneNumber)
          .child(this.props.store.bookingDate)
          .child(this.props.store.userContact)
          .once("value").then(item => {
            tempData.push(item);
            this.props.store.requestData = tempData;
            console.log("Look what i found :"+JSON.stringify(this.props.store.requestData));
            //Resign the remote notifcation as Nulls
            this.props.store.bookingDate = null;
            this.props.store.bool=false;
            // this.setState({
            //  data:this.props.store.bookingDate 
            // })
          })
      });
    } else {
      this.props.store.bool=false;
      // this.setState({
      //   bool: false
      // });
    }
  }
  render() {
    console.log("Main call hoa ya ni");
    if (this.props.store.bool) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#FAA530" />
        </View>
      );
    } else if (
      this.props.store.bool == false &&
      this.props.store.bookingDate == null
    ) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#FAA530", fontSize: 24 }}>
            No notification!
          </Text>
        </View>
      );
    }
    return (
      <Container>
        <Content>
          <FlatList
            data={this.props.store.requestData}
            renderItem={({ item, index }) => (
              // <SimpleNotificatin item={item} index={index} />
              <RequestNotification items={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

class SimpleNotificatin extends React.Component {
  textExpired = "expired";
  textNew = "new";
  render() {
    return (
      <View style={[styles.container]} key={this.props.index}>
        <ImageBackground style={styles.item} source={this.props.item.key}>
          <View style={{ marginTop: 20, marginLeft: 20 }}>
            <CustomButton
              borderColor={
                this.props.item.isExpired ? "rgb(231,76,60))" : "rgb(76,175,80)"
              }
              backgroundColor={
                this.props.item.isExpired ? "rgb(231,76,60)" : "rgb(76,175,80)"
              }
              width={150}
              height={30}
              buttonText={
                this.props.item.isExpired
                  ? this.textExpired.toUpperCase()
                  : this.textNew.toUpperCase()
              }
              textColor={"#FFFFFF"}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

class RequestNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressBarBool: false,
      progressBarText: ""
    };
  }
  // Notification is accepted
  acceptRide() {
    console.log("Main call tou ni ho rha");
    userDetailObject = null;
    AsyncStorage.getItem("phoneNumber").then(phoneNumber => {
      //Progress bar
      this.setState({
        progressBarBool: true,
        progressBarText: "Accepting Ride Request"
      });
      //change the status of passenger ride
      firebase
        .database()
        .ref("PassengerRides")
        .child(this.props.items.val().contact)
        .child(this.props.items.val().date)
        .child(phoneNumber)
        .child("status")
        .set("Accepted")
        .then(() => {
          // Decrease the number of seats of Driver
          ref = firebase
            .database()
            .ref("search")
            .child(this.props.items.val().depart)
            .child(this.props.items.val().dest)
            .child(this.props.items.val().date)
            .child(phoneNumber)
            .once("value")
            .then(item => {
              upatedSeats =
                item.val().seat - this.props.items.val().requestSeats;
              //Update search node of database
              firebase
                .database()
                .ref("search")
                .child(this.props.items.val().depart)
                .child(this.props.items.val().dest)
                .child(this.props.items.val().date)
                .child(phoneNumber)
                .child("seat")
                .set(upatedSeats);
            })
            .then(() => {
              //save information of this passenger in bookedrides
              firebase
                .database()
                .ref("bookedPassengers")
                .child(phoneNumber)
                .child(this.props.items.val().date)
                .child(this.props.items.val().contact)
                .set(this.props.items)
                .then(() => {
                  //Remove the node from notification
                  firebase
                    .database()
                    .ref("Notification")
                    .child(phoneNumber)
                    .child(this.props.items.val().date)
                    .child(this.props.items.val().contact)
                    .remove()
                    .then(() => {
                      //Reterive user locally save information
                      AsyncStorage.getItem("user")
                        .then(object => {
                          userDetailObject = JSON.parse(object);
                        })
                        .then(() => {
                          //Send push notification to passenger about its ride accepetence
                          fetch("https://fcm.googleapis.com/fcm/send", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization:
                                "key=AIzaSyD_vjI-QTOBvtIh0w5U3BE7e1u5uJqEbY8"
                            },
                            body: JSON.stringify({
                              to: this.props.items.val().deviceToken,
                              notification: {
                                body:
                                  userDetailObject.firstName +
                                  " " +
                                  userDetailObject.lastName +
                                  " " +
                                  "has accepted your ride request!",
                                title: "Ride Request",
                                color: "#00ACD4",
                                priority: "high",
                                sound: "default",
                                show_in_foreground: true
                              },
                              data: {
                                id: 0
                              }
                            })
                          }).then(() => {
                            //Stop showing progress bar
                            this.setState({
                              progressBarBool: false
                            });
                            // this.props.store.bookingDate=null;
                            //Go to main screen
                            Actions.bottomNav();
                          });
                        });
                    });
                });
            });
        });
    });
  }
  //Notification is rejected
  rejectRide() {
    console.log("Main call tou ni ho rha");
    AsyncStorage.getItem("phoneNumber").then(phoneNumber => {
      //Progress bar
      this.setState({
        progressBarBool: true,
        progressBarText: "Rejecting Ride Request"
      });
      //Change status of passenger request
      firebase
        .database()
        .ref("PassengerRides")
        .child(this.props.items.val().contact)
        .child(this.props.items.val().date)
        .child(phoneNumber)
        .child("status")
        .set("Rejected");
      //Remove the node from notification
      firebase
        .database()
        .ref("Notification")
        .child(phoneNumber)
        .child(this.props.items.val().date)
        .child(this.props.items.val().contact)
        .remove();
      //Reterive user information
      //Reterive user locally save information
      AsyncStorage.getItem("user")
        .then(object => {
          userDetailObject = JSON.parse(object);
        })
        .then(() => {
          //Send push notification to passenger about its ride cancelation
          fetch("https://fcm.googleapis.com/fcm/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "key=AIzaSyD_vjI-QTOBvtIh0w5U3BE7e1u5uJqEbY8"
            },
            body: JSON.stringify({
              to: this.props.items.val().deviceToken,
              notification: {
                body:
                  userDetailObject.firstName +
                  " " +
                  userDetailObject.lastName +
                  " " +
                  "has rejected your ride request!",
                title: "Ride Request",
                color: "#00ACD4",
                priority: "high",
                sound: "default",
                show_in_foreground: true
              },
              data: {
                id: 0
              }
            })
          }).then(() => {
            //Stop showing progress bar
            this.setState({
              progressBarBool: false
            });
            //Go to dashboard
            Actions.bottomNav();
          });
        });
    });
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
          <Thumbnail
            style={{
              width: 72,
              height: 72,
              borderRadius: 72 / 2,
              marginTop: 8,
              marginBottom: 8
            }}
            source={
              this.props.items.val().imageUri == "null"
                ? require("../../asset/image/profile.png")
                : { uri: this.props.items.val().imageUri }
            }
          />
          <View>
            <Spinner
              visible={this.state.progressBarBool}
              textContent={this.state.progressBarText}
              textStyle={{ color: "#FFF" }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 12,
              marginBottom: 16,
              justifyContent: "center",
              alignItems: "center",
              alignItems: "flex-start"
            }}
          >
            <Text style={{ fontSize: 16, color: "black" }}>
              {this.props.items.val().firstName +
                " " +
                this.props.items.val().lastName}
            </Text>
            <Text note>{this.props.items.val().contact}</Text>
          </View>

          <View
            style={{
              flex: 0.6,
              marginRight: 0,
              justifyContent: "center",
              alignItems: "flex-end"
            }}
          >
            {/* Accept or Reject*/}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.acceptRide();
                }}
              >
                <View
                  style={{
                    margin: 4,
                    backgroundColor: "rgb(76,175,80)",
                    width: 42,
                    height: 42,
                    borderRadius: 42 / 2,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon name="check" type="MaterialIcons" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.rejectRide();
                }}
              >
                <View
                  style={{
                    margin: 4,
                    backgroundColor: "#CE2027",
                    width: 42,
                    height: 42,
                    borderRadius: 42 / 2,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon name="close" type="MaterialIcons" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Date text */}
            <Text />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    elevation: 2 // Android
  },
  item: {
    height: 200,
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
    elevation: 2 // Android
  }
});
export default NotificationScreen;
