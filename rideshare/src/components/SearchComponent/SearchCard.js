import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
//import { Actions } from "react-native-router-flux";
import EditText from "../EditText/EditText";
import { Icon, Grid, Row, Button } from "native-base";
import AutoCompleteSearch from "./AutCompleteSearch";
//import Button from "../Button/CustomButton";
import LightboxView from "react-native-lightbox";
import Dialog, {
  SlideAnimation,
  DialogButton,
  DialogTitle
} from "react-native-popup-dialog";
import EditTextAction from "../EditText/EditTextAction";
import DatePickerCal from "../DatePickerCal";
import getDirections from "react-native-google-maps-directions";
import { inject, observer } from "mobx-react";
import { Actions } from "react-native-router-flux";

@inject("store")
@observer
export default class SearchCard extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      isLoading: false,
      bool: false,
      destination: "Destination Location",
      departure: "Departure Location",
      setDeparture: "Departure Location",
      setDestination: "Destination Location",
      isDepartureDestination: true
    };
  }

  handleGetDirections = () => {
    console.log("Badar Shahzad you click search button");
    const data = {
      source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving" // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate" // this instantly initializes navigation using the given travel mode
        }
      ]
    };

    getDirections(data);
  };
  //Handle press button
  handlePress() {
    if (
      this.props.store.passengerDeparture &&
      this.props.store.passengerDestination != null
    ) {
      console.log("Search city for dep: "+this.props.store.passengerDeparture);
      console.log("Search city dest : "+this.props.store.passengerDestination);
      Actions.searchList();
    } else {
      console.log("Departure and Passenger fields not filled");
    }
  }
  handleAction = () => {};

  _onChangeText(text) {
    this.setState({ isLoading: true, value: text });

    fetch("YOUR_URL_FOR_GETTING_SUGGESTION").then(result => {
      // Process list of suggestions

      this.setState({ isLoading: false });
    });
  }
  showLightBoxView(value) {
    this.setState({ bool: true, isDepartureDestination: value });
  }

  render() {
    return (
      <View
        style={[styles.cardView, { backgroundColor: "#FAA530", opacity: 0.8 }]}
      >
        <Grid>
          <Row style={{ justifyContent: "flex-end", padding: 16 }}>
            {/* <Icon name="calendar" type="FontAwesome" /> */}
            <DatePickerCal />
          </Row>

          <Row
            style={[
              styles.vehicleInfo,
              {
                minWidth: 48,
                margin: 8,
                borderRadius: 50,
                backgroundColor: "white"
              }
            ]}
          >
            {/* Auto Search and complete edit text */}
            {/* <EditTextAction
              placeholder={this.state.departure}
              underline="transparent"
              onPress={() => this.showLightBoxView(true)} // for departure is true
            /> */}
            <EditText
              placeholder="Enter your Departure"
              paddingLeft={16}
              placeholderColor="black"
              underline="transparent"
              inputId="passDeparture"
            />
          </Row>
          <Row
            style={[
              styles.vehicleInfo,
              {
                minWidth: 48,
                margin: 8,
                borderRadius: 50,
                backgroundColor: "white"
              }
            ]}
          >
            {/* Auto Search and complete edit text */}
            {/* <EditTextAction
              placeholder={this.state.destination}
              underline="transparent"
              onPress={() => this.showLightBoxView(false)} //for destination is false
            /> */}

            <EditText
              placeholder="Enter your Destination"
              paddingLeft={16}
              placeholderColor="black"
              underline="transparent"
              inputId="passDestination"
            />
          </Row>

          <Row
            style={{
              alignSelf: "center",
              minWidth: 48,
              paddingBottom: 24,
              paddingTop: 24
            }}
          >
            {/* <TouchableOpacity onPress={this.handleGetDirections.bind(this)}> */}
            {/* Search Button */}
            <View>
              <Button
                bordered
                light
                onPress={() => {
                  this.handlePress();
                }}
                style={{
                  backgroundColor: this.props.backgroundColor,
                  width: 170,

                  height: 45,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 18,
                  backgroundColor: "#FAA530"
                }}
              >
                <Text style={{ color: "black" }}>{"Search"}</Text>
              </Button>
            </View>
            {/* <Button
              backgroundColor={"#FAA530"}
              buttonText={"Search"}
              targetScreen={"searchList"}
              screenTitle={"Find A Ride"}
              textColor="black"
            /> */}
          </Row>
        </Grid>

        <Dialog
          visible={this.state.bool}
          width={0.95}
          height={0.5}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
        >
          {/* Vehicle information */}
          <View
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#FAA530",

                borderColor: "white",
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1 //IOS
              }}
            >
              <Icon
                name="md-close"
                style={{ margin: 8, marginLeft: 16, color: "white" }}
                onPress={() => {
                  this.setState({ bool: false });
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <AutoCompleteSearch
                onPress={(data, details) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(
                    "Data: " + data.description,
                    "Latitude: " + details.geometry.location.lat,
                    "Longitude: " + details.geometry.location.lng
                  );

                  if (this.state.isDepartureDestination) {
                    this.setState({
                      setDeparture: data.description
                    });
                    var field =  data.description.split(",");
                    this.props.store.passengerDeparture = field[0];
                    
                  } else {
                    this.setState({
                      setDestination: data.description
                    });
                    var field =  data.description.split(",");
                    this.props.store.passengerDestination = field[0];
                  }
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#FAA530",

                borderColor: "white",
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1, //IOS
                justifyContent: "flex-end",
                alignItems: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    bool: false,
                    departure: this.state.setDeparture,
                    destination: this.state.setDestination
                  });

                 
                }}
              >
                <View
                  style={{
                    width: 120,
                    height: 42,
                    padding: 8,
                    borderColor: "white",
                    margin: 8,
                    borderRadius: 10,
                    borderColor: "green",
                    justifyContent: "center",
                    borderRadius: 18,
                    borderColor: "#ddd",
                    borderWidth: 1,
                    alignItems: "center"
                  }}
                >
                  <Text note style={{ color: "white" }}>
                    {"Ok"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Dialog>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  vehicleInfo: {
    borderWidth: 0.5,
    height: 42,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3,
    shadowRadius: 2,
    elevation: 3,
    margin: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  cardView: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    margin: 8,
    flexDirection: "column",
    borderWidth: 0.1,
    borderRadius: 18,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2 // Android
  }
});
