import React, { Component } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import UserDetailItem from "../../../components/CardItems/UserDetailItem";
import Passenger from "../../../components/Passenger/Passenger";
import firebase from "react-native-firebase";
import { inject, observer } from "mobx-react";
import Spinner from "react-native-loading-spinner-overlay";

@inject("store")
@observer
export default class PassengerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      progressBarBool: true,
      isData: false
    };
  }
  componentWillMount() {
    passengersInfo = [];
    const ref = firebase
      .database()
      .ref()
      .child("bookedPassengers")
      .child(this.props.store.driverOfferdRides.val().phone)
      .child(this.props.store.driverOfferdRides.val().date)
      .once("value");
    ref.then(items => {
      if (items.val() == null) {
        this.setState({ progressBarBool: false});
      } else {
        items.forEach(item => {
          passengersInfo.push(item);
        });
        this.setState({
          data: passengersInfo,
          progressBarBool: false,
        });
      }
    });
  }
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#ffffff", flexDirection: "column" }}
      >
        <View style={{ flex: 1.1 }}>
          <UserDetailItem
            name={this.props.store.driverOfferdRides.val().name}
            price={this.props.store.driverOfferdRides.val().pricePerSeat}
            startLocation={this.props.store.driverOfferdRides.val().dept}
            endLocation={this.props.store.driverOfferdRides.val().dest}
            totalStops={0}
            availableSeats={this.props.store.driverOfferdRides.val().seat}
            startTime={this.props.store.driverOfferdRides.val().time}
            endTime={this.props.store.driverOfferdRides.val().time}
            rating={4}
            imageUri={this.props.store.driverOfferdRides.val().imageUri}
          />
        </View>
        <View style={{ flex: 2, marginTop: 8, flexDirection: "column" }}>
          {/* Spinner */}
          <View>
            <Spinner
              visible={this.state.progressBarBool}
              textContent={"Wait Please"}
              textStyle={{ color: "#FFF" }}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Passenger Details
            </Text>
          </View>
          {this.state.data != null ? (
            <FlatList
              data={this.state.data}
              renderItem={({ item, index }) => {
                console.log("first Name is :" + item.val().contact);
                return (
                  <View>
                    {/* Passenger Details */}
                    <Passenger
                      name={item.val().firstName + " " + item.val().lastName}
                      contact={item.val().contact}
                      imageUri={item.val().imageUri}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          ) :this.state.progressBarBool==false && this.state.data==null? (
            <View
              style={{
                flex: 1,
                marginTop:8,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#FAA530", fontSize: 16 }}>
                Sorry! Offer is not accepted by anyone yet.
              </Text>
            </View>
          ):null}
        </View>
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
