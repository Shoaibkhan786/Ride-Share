import React, { Component } from "react";
import { StyleSheet, Text, FlatList, View, AsyncStorage } from "react-native";
import UserDetailItem from "../../components/CardItems/UserDetailItem";
import { Separator } from "native-base";
import { dumiDataArray } from "../../utils/DumiData";
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
var timeStamp = 0;
class BookedHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      spinnerBool: true
    };
  }

  componentWillMount() {
    tempData = [];
    AsyncStorage.getItem("phoneNumber").then(phoneNumber => {
      ref = firebase
        .database()
        .ref("History")
        .child("BookedRides")
        .child(phoneNumber)
        .once("value");
      ref.then(items => {
        if (items.val() != null) {
          items.forEach(item => {
            tempData.push(item);
          });
          this.setState({
            data: tempData,
            spinnerBool: false
          });
        } else {
          this.setState({
            spinnerBool: false
          });
        }
      });
    });
  }
  renderRow(item, index) {
    // if (index == 0 || timeStamp != item.timeStamp) {
    // timeStamp = item.timeStamp;
    return (
      <View>
        <Separator bordered style={{ padding: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 16
            }}
          >
            <Text>{item.val().date}</Text>
          </View>
        </Separator>
        <View>
          <UserDetailItem
            name={item.val().name}
            price={item.val().pricePerSeat}
            startLocation={item.val().dept}
            endLocation={item.val().dest}
            totalStops={4}
            availableSeats={item.val().seat}
            startTime={item.val().time}
            endTime={item.val().time}
            rating={5}
            imageUri={item.val().imageUri}
            //   newRequestUnVerifyView={true}
            //   newRequestUnVerifyText={"Accepted"}
            //   verifyAndProceedView={true}
            //   verifyAndProceedText={"Verified"}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Spinner
            visible={this.state.spinnerBool}
            textContent={"Wait Please"}
            textStyle={{ color: "#FFF" }}
          />
        </View>
        {this.state.data == null && this.state.spinnerBool == false ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#FAA530", fontSize: 24 }}>
              Booked Rides history is empty!
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            renderItem={({ item, index }) => this.renderRow(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

export default BookedHistory;
