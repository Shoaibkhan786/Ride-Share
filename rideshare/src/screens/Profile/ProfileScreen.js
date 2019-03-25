import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import UserProfile from "../../components/UserProfileDetail/UserProfile";
import { inject, observer } from "mobx-react";
import { Actions } from "react-native-router-flux";
import Spinner from "react-native-loading-spinner-overlay";
import firebase from "react-native-firebase";

@inject("store")
@observer
export default class ProfileScreen extends Component {
  profile = null;
  phoneNumber = null;
  constructor(props) {
    super(props);
    this.state = {
      imageSourceLocal: require("../../asset/image/profile.png"),
      isLoading: true,
      bool: false,
      progressBarBool: false,
      imageFromGallery: ""
    };
  }
  componentWillMount() {
    AsyncStorage.getItem("phoneNumber").then(contact => {
      phoneNumber = contact;
      console.log("Aysnc number: " + phoneNumber);
      firebase
        .database()
        .ref("users")
        .child(contact)
        .once("value")
        .then(items => {
          if (items.val().imageUri != null) {
            this.props.store.profileImage = items.val().imageUri;
            this.props.store.profileFirstName = items.val().firstName;
            this.props.store.profileLastName = items.val().lastName;
            this.props.store.contact=items.val().contact;
            this.setState({
              imageFromGallery: items.val().imageUri,
              bool: true,
              isLoading: false
            });
          }
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <UserProfile isUploadProfilePic={true} isEdit={true} />

        {/* Profile Screen Switch  */}
        {/* <ListItem itemDivider={true}> */}
        {/* <ToggleSwitch
            isOn={this.props.store.isOfferRide}
            onColor="green"
            offColor="red"
            label="Switch to Offer a ride or Find a ride"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="medium"
            onToggle={isOn => {
              this.props.store.setIsOfferRide(!this.props.store.isOfferRide);
              setTimeout(() => {
                this.props.store.isOfferRide
                  ? Actions.reset("offerBottomNav")
                  : Actions.reset("passengerBottomNav");
              }, 700);
            }}
          /> */}
        {/* </ListItem> */}
        <Spinner
          visible={this.state.isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  editText: {
    borderWidth: 0.5,
    height: 45,
    borderRadius: 18,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3,
    shadowRadius: 2,
    elevation: 3,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center"
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1,
    height: 100,
    width: 100
  }
});
const options = {
  title: "Pick your pictur",
  customButtons: [{ name: "lALA", title: "LALA" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
