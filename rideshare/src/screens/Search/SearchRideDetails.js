import React, { Component } from "react";
import { TouchableOpacity, AsyncStorage, View } from "react-native";
import { Container, Content, Text, ListItem, Icon } from "native-base";
import IncreaseDecrease from "../../components/IncreaseDecrease/IncreaseDecrease";
import { inject, observer } from "mobx-react";
import { Grid, Col } from "react-native-easy-grid";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";
import LabelPic from "../../components/TextLabels/LabelPic";
import { RNToasty } from "react-native-toasty";
import TextLabel from "../../components/TextLabels/TextLabel";
import UserDetailItem from "../../components/CardItems/UserDetailItem";

var item = null;

@inject("store")
@observer
export default class SearchRideDetails extends Component {
  constructor(props) {
    super(props);
    item = this.props.store.userProfileData;

    this.state = {
      spinner: false
    };
  }

  retrieveRide() {
    var phNumber = null;
    var userDetailObject = null;
    var deviceToken = null;

    //Check the Images are attache or not then further move

    // TODO: User profile image
    // this.props.store.imageUri ?
    // this.showToastMessageCode(1) :

    // this.props.store.luggageImageUri == null
    //   ? this.showToastMessageCode(2)
    //   : this.props.store.CNICImageUri == null
    //   ? this.showToastMessageCode(3)
    //   : null;

    //GET user phone number
    AsyncStorage.getItem("phoneNumber")
      .then(phoneNumber => {  
        phNumber = phoneNumber;
        console.log("Phone number :" + phNumber);
      })
      .then(() => {
        //Get user profile details
        AsyncStorage.getItem("user")
          .then(object => {
            userDetailObject = JSON.parse(object);
            console.log("user details :" + JSON.stringify(userDetailObject));
          })
          .then(() => {
            //getting device token
            firebase
              .messaging()
              .getToken()
              .then(token => {
                deviceToken = token;
                console.log("Device token :" + deviceToken);
              })
              //.then(() => {

                // console.log("Going to set CNIC and Luggage Image");

                // //luggage and CNIC image push in storage
                // //upload user profile image in firebase storage
                // let storageRef = firebase.storage().ref();
                // let imageRef = storageRef.child("users").child(phNumber);
                // imageRef
                //   .putFile(this.props.store.CNICImageUri)
                //   .then(snapShot => {
                //     this.props.store.CNICImageUri = snapShot.downloadURL;
                //     console.log("Got CNIC download image link");
                //   })
                //   .then(() => {
                //     imageRef
                //       .putFile(this.props.store.luggageImageUri)
                //       .then(snapShot => {
                //         this.props.store.luggageImageUri = snapShot.downloadURL;
                //         console.log("Got Luggage download image link");
                //       });
                //   }).then(() => {

                //     userObject = {
                //       firstName: this.props.store.firstName,
                //       lastName: this.props.store.lastName,
                //       cnic: this.props.store.cnic,
                //       imageUri: this.props.store.imageUri,
                //       cnicImageUri: this.props.store.CNICImageUri,
                //       luggageImageUri: this.props.store.luggageImageUri,
                //       contact: this.props.store.signedInUser.phoneNumber
                //     };
    
                //     //save data locally of the user details
                //     AsyncStorage.setItem("user", JSON.stringify(userObject));
    
                //     console.log("User details items set on phone number");
    
                //     //send to the firebase
                //     const ref = firebase
                //       .database()
                //       .ref("users")
                //       .child(phoneNumberNode);
                //      ref.set(userObject);
                //   });
               
              //})
              .then(() => {
                //Preparing Passenger Json Object
                userDetail = {
                  cnic: userDetailObject.cnic,
                  firstName: userDetailObject.firstName,
                  lastName: userDetailObject.lastName,
                  contact: phNumber,
                  deviceToken: deviceToken,
                  imageUri: userDetailObject.imageUri,
                //  cnicImageUri: userDetailObject.cnicImageUri,
                 // luggageImageUri: userDetailObject.luggageImageUri,
                  date: item.val().date,
                  depart:item.val().depart,
                  dest:item.val().dest,
                  requestSeats:this.props.store.availSeats
                };


                console.log("Passenger information to notification");

                //Push data containing Passenger information to notification
                firebase
                  .database()
                  .ref("Notification")
                  .child(item.val().phone)
                  .child(item.val().date)
                  .child(phNumber)
                  .set(userDetail);
                //Push data to Passenger Node containing Driver information
                firebase
                  .database()
                  .ref("PassengerRides")
                  .child(phNumber)
                  .child(item.val().date)
                  .child(item.val().phone)
                  .set(item);
                //Save passenger history of this ride
                firebase
                  .database()
                  .ref("History")
                  .child("BookedRides")
                  .child(phNumber) 
                  .push(item)            
                //Send Remote push notification to driver
                console.log("Phone number :"+phNumber+"  "+"Date is :"+item.val().date);
                fetch("https://fcm.googleapis.com/fcm/send", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "key=AIzaSyD_vjI-QTOBvtIh0w5U3BE7e1u5uJqEbY8"
                  },
                  body: JSON.stringify({
                    to: item.val().deviceToken,
                    notification: {
                      body:
                        userDetailObject.firstName +
                        " " +
                        userDetailObject.lastName +
                        " " +
                        "is willing to join ride with you!",
                      title: "Ride Request",
                      color: "#00ACD4",
                      priority: "high",
                      sound: "default",
                      show_in_foreground:true
                    },
                    data:{
                      contact:phNumber,
                      date:item.val().date
                    }
                  })

                    
                }).then(() => {
                  this.setState({ spinner: false });
                  Actions.reset("bottomNav");
                });
              });
          });
      });
  }

  showToastMessageCode(msCode) {
    switch (msCode) {
      case 1:
        {
          RNToasty.Error({
            title: "Your profile image is missing!",
            duration: 3
          });

          this.setState({ spinner: false });
        }
        break;
      case 2:
        {
          RNToasty.Error({
            title: "Please attach Luggage image!",
            duration: 3
          });

          this.setState({ spinner: false });
        }
        break;
      case 3:
        {
          RNToasty.Error({
            title: "Please attach CNIC image!",
            duration: 3
          });

          console.log("You checked the CNIC image.");

          this.setState({ spinner: false });
        }
        break;
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View>
            {/* User Detail Items */}
            <UserDetailItem
              name={item.val().name}
              price={item.val().pricePerSeat}
              imageUri={item.val().imageUri}
              startLocation={item.val().dept}
              endLocation={item.val().dest}
              totalStops={0} //TODO: Total stops for the time being is zero letter will be changed
              availableSeats={item.val().seat}
              startTime={item.val().time}
              endTime={item.val().time}
              rating={item.val().rating}
            />

            {/* Required Seats Quantity */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "flex-start",
                margin: 8,
                paddingLeft: 8,

                borderWidth: 0.1,
                borderRadius: 4,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000",
                backgroundColor: "#fff",
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1, //IOS
                elevation: 2, // Android,
                margin: 8
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 8
                  }}
                >
                  <TextLabel
                    backgroundColor={"#FAA530"}
                    textWidth={120}
                    textHeight={24}
                    labelText={"Required Seats"}
                  />

                  <Text
                    note
                    style={{
                      color: "red",
                      fontSize: 11,
                      marginRight: 16,
                      marginTop: 16
                    }}
                  >
                    {" "}
                    {"* Available seats are "} {item.val().seat}
                  </Text>
                </View>

                <View style={{ alignItems: "center" }}>
                  <IncreaseDecrease
                    limit={item.val().seat == undefined ? 0 : item.val().seat}
                    onPressIncrease={quantity => {
                      this.props.store.availSeats=quantity;
                    }}
                    onPressDecrease={quantity => {
                      this.props.store.availSeats= quantity;
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.1,
              borderRadius: 4,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000",
              backgroundColor: "#fff",
              shadowColor: "rgba(0,0,0, .4)", // IOS
              shadowOffset: { height: 1, width: 1 }, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1, //IOS
              elevation: 2, // Android,
              margin: 8
            }}
          >
            {/* Ride Details and Requireed Seats  Data*/}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    margin: 8,
                    marginRight: 0
                  }}
                >
                  <TextLabel
                    backgroundColor={"#FAA530"}
                    textWidth={120}
                    textHeight={24}
                    labelText={"Car Details"}
                  />
                </View>

                <ListItem itemDivider={true}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Color</Text>
                    <Text note>{item.val().vehicleInfo.color}</Text>
                  </View>
                </ListItem>

                <ListItem
                  itemDivider={true}
                  style={{ backgroundColor: "white" }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Number</Text>
                    <Text note>{item.val().vehicleInfo.numberPlate}</Text>
                  </View>
                </ListItem>

                <ListItem itemDivider={true}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Model</Text>

                    <Text note>{item.val().vehicleInfo.model}</Text>
                  </View>
                </ListItem>
              </View>
            </View>
          </View>

          {/* Total stops while traveling */}
          {/* <View
            style={{
              flex: 1,

              borderWidth: 0.1,
              borderRadius: 4,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000",
              backgroundColor: "#fff",
              shadowColor: "rgba(0,0,0, .4)", // IOS
              shadowOffset: { height: 1, width: 1 }, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1, //IOS
              elevation: 2, // Android,
              margin: 8
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-start",
                margin: 8,
                marginRight: 0
              }}
            >
              <TextLabel
                backgroundColor={"#FAA530"}
                textWidth={120}
                textHeight={24}
                labelText={"Total Stops"}
              />
            </View>

            <ListItem itemDivider={true}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    width: 120,
                    overflow: "hidden"
                  }}
                >
                  Talagang
                </Text>

                <Text note>10 minutes</Text>
              </View>
            </ListItem>

            <ListItem itemDivider={true} style={{ backgroundColor: "white" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    width: 150,
                    overflow: "hidden"
                  }}
                >
                  Motorway Toll Plaza
                </Text>
                <Text note>5 minutes</Text>
              </View>
            </ListItem>
          </View> */}

          {/* End of UserDetailComponet and Traveling Component */}

          {/* Luggage and CNIC Pice component */}
          {/* TODO: These below two label pic components will be shown whenever driver want to see passenger details   */}

          {/* <Grid>
            <Col style={{ margin: 8, marginRight: 4 }}>
              <LabelPic
                text={"Luggage"}
                id={true}
                onChoseImage={(uri, name) => {
                  this.props.store.luggageImage = name;
                  this.props.store.luggageImageUri = uri;
                  console.log("Luggage Image uri is : " + uri);
                  console.log("Luggage Name  is : " + name);
                }}
              />
            </Col>
            <Col style={{ margin: 8, marginLeft: 4 }}>
              <LabelPic
                text={"CNIC"}
                id={true}
                onChoseImage={(uri, name) => {
                  this.props.store.CNICImage = name;
                  this.props.store.CNICImageUri = uri;

                  console.log("CNIC Image uri is : " + uri);
                  console.log("CNIC Name is : " + name);
                }}
              />
            </Col>
          </Grid> */}

          {/* Send the request to the driver request */}
          <Grid>
            <Col>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 24,
                  marginBottom: 16
                }}
              >
                {/* When the request will send then it will lead user towards the home screen. */}
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    //Check for incomplete data
                    this.setState({ spinner: true });
                    this.retrieveRide();
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FAA530",
                      width: 142,
                      height: 42,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 18
                    }}
                  >
                    <Text style={{ color: "white" }}>{"Send Request"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Col>
          </Grid>

          <Spinner
            visible={this.state.spinner}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </Content>
      </Container>
    );
  }
}
