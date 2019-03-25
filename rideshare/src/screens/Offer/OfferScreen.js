import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import EditText from "../../components/EditText/EditText";
import { Icon, Container, Content, List, ListItem, Button } from "native-base";
import LabelPic from "../../components/TextLabels/LabelPic";
import firebase from "react-native-firebase";
import ItemIncreaseDecrease from "../../components/IncreaseDecrease/ItemIncreaseDecrease";
import Dialog, {
  SlideAnimation,
  DialogButton,
  DialogTitle
} from "react-native-popup-dialog";
import DatePicker from "react-native-datepicker";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";
import { inject, observer } from "mobx-react";
import { RNToasty } from "react-native-toasty";

@inject("store")
@observer
class OfferScreen extends Component {
  vehicle = null;
  stopsQuantity = 1;
  constructor(props) {
    super(props);
    this.state = {
      counter: [],
      bool: false,
      showView: false,
      newValue: 0,
      calenderDialogVisible: false,
      numberPlateImage: "",
      driveLiencesImage: "",
      spinnerBool: false
    };
  }
  componentWillMount() {
    AsyncStorage.getItem("vehicleInfo").then(info => {
      if (info != null) {
        this.vehicle = JSON.parse(info);
        this.props.store.vNumber = this.vehicle.number;
        this.props.store.vModel = this.vehicle.model;
        this.props.store.vColor = this.vehicle.color;
        this.setState({ showView: true });
      }
    });
  }
  saveInfo() {
    if (
      this.props.store.vNumber &&
      this.props.store.vColor &&
      this.props.store.vModel != ""
    ) {
      AsyncStorage.setItem(
        "vehicleInfo",
        JSON.stringify({
          model: this.props.store.vModel,
          number: this.props.store.vNumber,
          color: this.props.store.vColor
        })
      );
      this.setState({
        bool: false,
        showView: true
      });
    } else {
      console.log("Kindly enter the fields properly");
    }
  }
  cancel() {
    if (this.vehicle != null) {
      if (
        this.props.store.vColor &&
        this.props.store.vNumber &&
        this.props.store.vModel != null
      ) {
        this.props.store.vModel = this.vehicle.model;
        this.props.store.vNumber = this.vehicle.number;
        this.props.store.vColor = this.vehicle.color;
        this.setState({
          bool: false,
          showView: true
        });
      }
    } else {
      this.setState({
        bool: false,
        showView: false
      });
    }
  }
  saveVehicleNumber(value) {
    if (value == "") {
      this.props.store.vNumber = null;
    } else {
      this.props.store.vNumber = value;
    }

    console.log("Number :" + value);
  }
  saveVehicleColor(value) {
    if (value == "") {
      this.props.store.vColor = null;
    } else {
      this.props.store.vColor = value;
    }
    console.log("Color :" + value);
  }
  saveVehicleModel(value) {
    if (value == "") {
      this.props.store.vModel = null;
    } else {
      this.props.store.vModel = value;
    }
    console.log("Model :" + value);
    this.props.store.vModel = value;
  }
  handlePress() {
    this.setState({ spinnerBool: true });
    console.log("click hoa");
    console.log("Departure :" + this.props.store.departure);
    console.log("Destination :" + this.props.store.destination);
    console.log("time :" + this.props.store.time);
    console.log("Date :" + this.props.store.date);
    console.log("price/seat :" + this.props.store.pricePerSeat);
    console.log("V-Model :" + this.props.store.vModel);
    console.log("V-number :" + this.props.store.vNumber);
    console.log("V-color :" + this.props.store.vColor);
    console.log("number plate :" + this.props.store.numberPlateImage);
    console.log("Liece number :" + this.props.store.liecienceImage);

    if (
      this.props.store.departure &&
      this.props.store.destination &&
      this.props.store.time &&
      this.props.store.date &&
      this.props.store.pricePerSeat &&
      this.props.store.vModel &&
      this.props.store.vColor &&
      this.props.store.vNumber &&
      this.props.store.numberPlateImage &&
      this.props.store.liecienceImage != null
    ) {
      let offerRideObject = null;
      var driverContact = null;
      numberPlateImage = null;
      driveLicenseImage = null;
      let admin = null;
      var user = null;
      var deviceToken = null;
      //reteriving user information locally
      AsyncStorage.getItem("user").then(data => {
        user = JSON.parse(data);
      });

      //reteriving number locally
      AsyncStorage.getItem("phoneNumber")
        .then(phoneNumber => {
          console.log("Phone number check kr " + phoneNumber);
          driverContact = phoneNumber;
        })
        .then(() => {
          //upload driver number plate
          storageRef = firebase
            .storage()
            .ref("/vehicles")
            .child(driverContact);
          imageRef = storageRef.child(this.props.store.numberPlateImage);
          console.log("ref is :" + imageRef);
          imageRef
            .putFile(this.props.store.numberPlateImageUri)
            .then(snapShot => {
              this.props.store.numberPlateImageUri = snapShot.downloadURL;
              console.log(
                "Number plate  :" + this.props.store.numberPlateImageUri
              );
            })
            .then(() => {
              //upload driver lcience
              storageRef = firebase
                .storage()
                .ref("/vehicles")
                .child(driverContact);
              imageRef = storageRef.child(this.props.store.liecienceImage);
              imageRef
                .putFile(this.props.store.liecienceImageUri)
                .then(snapShot => {
                  this.props.store.liecienceImageUri = snapShot.downloadURL;
                })
                .then(() => {
                  firebase
                    .messaging()
                    .getToken()
                    .then(token => {
                      deviceToken = token;

                      offerRideObject = {
                        name: user.firstName + " " + user.lastName,
                        imageUri: user.imageUri,
                        phone: driverContact,
                        dept: this.props.store.departure,
                        dest: this.props.store.destination,
                        date: this.props.store.date,
                        time: this.props.store.time,
                        seat: this.props.store.availableSeats,
                        pricePerSeat: this.props.store.pricePerSeat,
                        status: "Pending",
                        deviceToken: deviceToken,
                        vehicleStatus: null,
                        vehicleInfo: {
                          model: this.props.store.vModel,
                          numberPlate: this.props.store.vNumber,
                          color: this.props.store.vColor,
                          numberPlateImage: this.props.store
                            .numberPlateImageUri,
                          driverLicense: this.props.store.liecienceImageUri
                        }
                      };
                      admin = {
                        model: this.props.store.vModel,
                        numberPlate: this.props.store.vNumber,
                        color: this.props.store.vColor,
                        numberPlateImage: this.props.store.numberPlateImageUri,
                        driverLicense: this.props.store.liecienceImageUri,
                        status: "un-verified"
                      };
                    })
                    .then(() => {
                      //save driver info in database
                      const ref = firebase
                        .database()
                        .ref("search")
                        .child(this.props.store.departure)
                        .child(this.props.store.destination)
                        .child(this.props.store.date)
                        .child(driverContact)
                        .set(offerRideObject);

                      //ref.set(offerRideObject);
                      firebase
                        .database()
                        .ref("admin")
                        .child("un-verified")
                        .child(driverContact)
                        .set(admin);

                      //Offer Rides
                      firebase
                        .database()
                        .ref("offerRides")
                        .child(driverContact)
                        .child(this.props.store.date)
                        .push(offerRideObject);
                      //add this offer ride into history
                      firebase
                        .database()
                        .ref("History")
                        .child("OfferedRides")
                        .child(driverContact)
                        .push(offerRideObject);
                    });
                })
                .then(() => {
                  this.setState({ spinnerBool: false });
                  Actions.bottomNav();
                });
            });
        });
    } else {
      RNToasty.Error({ title: "Please enter fields properly!", duration: 2 });
      console.log("kindly enter fields properly!");
    }
  }
  render() {
    return (
      <Container>
        <Content style={styles.container}>
          <View style={styles.container}>
            <View>
              <Spinner
                visible={this.state.spinnerBool}
                textContent={"Offering a Ride"}
                textStyle={{ color: "#FFF" }}
              />
            </View>

            {/* First Card */}
            <View style={styles.cardView}>
              <View style={[styles.vehicleInfo]}>
                <View>
                  <EditText
                    placeholder="Departure Location"
                    underline="transparent"
                    inputId="departure"
                  />
                </View>
              </View>
              <View style={[styles.vehicleInfo, { marginTop: 8 }]}>
                <View>
                  <EditText
                    placeholder="Destination Location"
                    underline="transparent"
                    inputId="destination"
                  />
                </View>
              </View>
              <View style={{ marginTop: 3 }}>
                {/* Time Picker */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8
                  }}
                >
                  <DatePicker
                    style={{ width: 150 }}
                    date={this.props.store.time}
                    mode="time"
                    is24Hour={false}
                    format="hh:mm a"
                    placeholder="select a time"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        marginLeft: 0
                      },
                      dateInput: {
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#ddd",
                        borderBottomWidth: 1,
                        shadowColor: "black",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 2,
                        shadowRadius: 2,
                        elevation: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }
                    }}
                    onDateChange={time => {
                      //this.setState({ time: time });
                      this.props.store.time = time;
                      console.log("Time is :" + this.props.store.time);
                    }}
                  />

                  {/* Date Picker */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "flex-end"
                    }}
                  >
                    <DatePicker
                      style={{ width: 150 }}
                      date={this.props.store.date}
                      mode="date"
                      placeholder="select a date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          marginLeft: 0
                        },
                        dateInput: {
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: "#ddd",
                          borderBottomWidth: 1,
                          shadowColor: "black",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 2,
                          shadowRadius: 2,
                          elevation: 1,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }
                      }}
                      onDateChange={date => {
                        // this.setState({ date: date });
                        this.props.store.date = date;
                        console.log("Date is :" + this.props.store.date);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Second Card */}
            <View style={[styles.cardView]}>
              <View style={{ flexDirection: "row" }}>
                <Text>Available Seats</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <ItemIncreaseDecrease
                    onPressIncrease={seats => {
                      this.props.store.availableSeats = seats;
                      console.log(
                        "Available seats: " + this.props.store.availableSeats
                      );
                    }}
                    onPressDecrease={seats => {
                      this.props.store.availableSeats = seats;
                      console.log(
                        "Available seats: " + this.props.store.availableSeats
                      );
                    }}
                  />
                </View>
              </View>
              {/* Available Stops */}
              {/* <View style={{ flexDirection: "row", marginTop: 8 }}>
                <Text>Available Stops</Text>
                < View style={{ flex: 1, alignItems: "flex-end" }}>
                  <ItemIncreaseDecrease
                    onPressIncrease={quantity => {}}
                    onPressDecrease={quantity => {}}
                  />
                </View>
              </View> */}

              {/* Dynamic view rendering */}
              {/* <View style={[styles.vehicleInfo, { marginTop: 8 }]}>
                  <EditText placeholder="Stop" underline="transparent" />
                </View>
                <View style={[styles.vehicleInfo, { marginTop: 8 }]}>
                  <EditText placeholder="Stop" underline="transparent" />
                </View> */}

              <List>
                {Array.from(Array(this.state.newValue)).map((prop, key) => {
                  return (
                    <ListItem key={key}>
                      {this.message(
                        "Component is rendered!: state is " +
                          this.state.newValue
                      )}
                      {this.message(
                        "Component is rendered!: variable is " +
                          this.stopsQuantity
                      )}

                      <Text>{"Badar"}</Text>
                    </ListItem>
                  );
                })}
              </List>

              {/* Price per Seat */}
              <View style={[styles.vehicleInfo, { marginTop: 8 }]}>
                <View>
                  <EditText
                    placeholder="Enter price per seat"
                    underline="transparent"
                    inputId="pricePerSeat"
                  />
                </View>
              </View>
            </View>

            {/* Third Card */}
            <View style={[styles.cardView]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View>
                  <Text> {"Vehicle Info"} </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ bool: true });
                    }}
                  >
                    <View>
                      <Icon name="pencil" type="MaterialCommunityIcons" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* User's vehicleInfo */}
              {this.state.showView ? (
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8
                      //         backgroundColor:'red'
                    }}
                  >
                    <View style={{ paddingLeft: 5 }}>
                      <Text>Vehicle Model</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text>{this.props.store.vModel}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8
                    }}
                  >
                    <View style={{ paddingLeft: 5 }}>
                      <Text>Vehicle Number</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text>{this.props.store.vNumber}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8
                    }}
                  >
                    <View style={{ paddingLeft: 5 }}>
                      <Text>Vehicle Color</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text>{this.props.store.vColor}</Text>
                    </View>
                  </View>
                </View>
              ) : null}

              {/* Number and drive liecience */}
              <View style={{ marginTop: 8 }}>
                <LabelPic
                  text="Number Plate"
                  source={this.props.store.numberPlateImageUri}
                  id={false}
                />
              </View>
              <View style={{ marginTop: 8 }}>
                <LabelPic
                  text="License"
                  id={true}
                  source={this.props.store.liecienceImageUri}
                />
              </View>
              <View
                style={{
                  marginTop: 16,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
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
                    <Text style={{ color: "white" }}>{"OFFER"}</Text>
                  </Button>
                </View>
              </View>
            </View>

            <View />

            <Dialog
              visible={this.state.bool}
              width={0.9}
              height={0.44}
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: "bottom"
                })
              }
              actions={[
                <DialogButton
                  text="Save"
                  textStyle={{ color: "green", fontSize: 16 }}
                  onPress={() => {
                    this.saveInfo();
                  }}
                />,
                <DialogButton
                  text="Cancel"
                  textStyle={{ color: "red", fontSize: 16 }}
                  onPress={() => {
                    this.cancel();
                  }}
                />
              ]}
            >
              <DialogTitle
                title="Vehicle Information"
                textStyle={{ color: "green" }}
              />
              {/* Vehicle information */}
              <View style={{ flexDirection: "column" }}>
                <View style={styles.vehicleInfo}>
                  <View>
                    <TextInput
                      placeholder="Enter your vehicle model"
                      style={{ flex: 1 }}
                      onChangeText={value => {
                        this.saveVehicleModel(value);
                      }}
                    />
                  </View>
                </View>
                <View style={styles.vehicleInfo}>
                  <View>
                    <TextInput
                      placeholder="Enter your vehicle number"
                      style={{ flex: 1 }}
                      onChangeText={value => {
                        this.saveVehicleNumber(value);
                      }}
                    />
                  </View>
                </View>
                <View style={styles.vehicleInfo}>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      placeholder="Enter your vehicl color"
                      style={{ flex: 1 }}
                      onChangeText={value => {
                        this.saveVehicleColor(value);
                      }}
                    />
                  </View>
                </View>
              </View>
            </Dialog>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  vehicleInfo: {
    borderWidth: 0.5,
    height: 48,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3,
    shadowRadius: 2,
    elevation: 3,
    margin: 4,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    flex: 1
  },
  cardView: {
    padding: 16,
    borderRadius: 4,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    backgroundColor: "#fff",
    margin: 8,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    flexDirection: "column"
  },
  editTextParent: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  }
});
export default OfferScreen;
