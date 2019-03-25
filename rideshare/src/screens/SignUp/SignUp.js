import React, { Component } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  AsyncStorage
} from "react-native";
import { Thumbnail, Button } from "native-base";
import firebase from "react-native-firebase";
import EditText from "../../components/EditText/EditText";
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
import ImagePicker from "react-native-image-picker";
import { inject, observer } from "mobx-react";
import { Actions } from "react-native-router-flux";
import Spinner from "react-native-loading-spinner-overlay";

@inject("store")
@observer
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSourceLocal: require("../../asset/image/profile.png"),
      bool: false,
      progressBarBool: false,
      imageFromGallery: ""
    };
  }
  handlePress() {
    let userObject = null;
    phoneNumberNode = null;
    if (
      this.props.store.firstName == "" ||
      this.props.store.lastName == "" ||
      this.props.store.cnic == ""
    ) {
      console.log("Kindly enter fields properly");
    } else {
      //Spinner untill all task done
      this.setState({ progressBarBool: true });

      phoneNumberNode =this.props.store.phoneNumber;
      if (this.props.store.imageUri == "null") {
        userObject = {
          firstName: this.props.store.firstName,
          lastName: this.props.store.lastName,
          cnic: this.props.store.cnic,
          imageUri: "null",
          contact: phoneNumberNode         
        };
        
        //save data locally
        AsyncStorage.setItem("user", JSON.stringify(userObject));
        //save user profile into firebase database
        const ref = firebase
          .database()
          .ref("users")
          .child(phoneNumberNode);
        ref.set(userObject).then(() => {
          this.setState({ progressBarBool: false });
        });
      } else {
        this.setState({ progressBarBool: true });

        //upload user profile image in firebase storage
        let storageRef = firebase.storage().ref();
          let imageRef = storageRef.child("users").child(phoneNumberNode);
          imageRef
            .putFile(this.state.imageFromGallery)
            .then(snapShot => {
            userObject = {
              firstName: this.props.store.firstName,
              lastName: this.props.store.lastName,
              cnic: this.props.store.cnic,
              imageUri: snapShot.downloadURL,
              contact: phoneNumberNode
            };

            //save data locally of the user details
            AsyncStorage.setItem("user", JSON.stringify(userObject)); 

            //send to the firebase
            const ref = firebase
              .database()
              .ref("users")
              .child(phoneNumberNode);
            ref.set(userObject);
          })
          .then(() => {
            this.setState({ progressBarBool: false });
            Actions.reset("bottomNav");
          });
      }
    }
  }
  chooseImageFromGallery() {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log("Image is choosed bro");
        // You can also display the image using data:
        const source = { uri: response.uri };
        this.setState({
          imageFromGallery: source.uri,
          bool: true
        });
        this.props.store.imageUri = response.fileName;
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.container}
          source={require("../../asset/image/login-background.jpg")}
        >
          <TouchableOpacity onPress={this.chooseImageFromGallery.bind(this)}>
            <View>
              {/* <Image style={styles.avatarContainer} source={require(this.state.imageSource)}></Image> */}
              <Thumbnail
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 150 / 2,
                  marginBottom: 24
                }}
                source={
                  this.state.bool == false
                    ? this.state.imageSourceLocal
                    : { uri: this.state.imageFromGallery }
                }
              />
            </View>
          </TouchableOpacity>
          {/* Spinner View */}
          <View>
            <Spinner
              visible={this.state.progressBarBool}
              textContent={"Wait Please"}
              textStyle={{ color: "#FFF" }}
            />
          </View>
          {/* First Name */}
          <View style={styles.editText}>
            <EditText
              placeholder="First Name"
              underline="transparent"
              paddingLeft={16}
              inputId="firstName"
            />
          </View>
          {/* Last Name */}
          <View style={[styles.editText, { marginTop: 8 }]}>
            <EditText
              placeholder="Last Name"
              underline="transparent"
              paddingLeft={16}
              inputId="lastName"
            />
          </View>
          <View style={[styles.editText, { marginTop: 8 }]}>
            <EditText
              placeholder="Enter your CNIC"
              underline="transparent"
              paddingLeft={16}
              inputId="cnic"
            />
          </View>
          <View style={{ marginTop: 24 }}>
            <Button
              bordered
              light
              onPress={() => {
                this.handlePress();
              }}
              style={{
                backgroundColor: this.props.backgroundColor,
                width: 170,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 18,
                backgroundColor: "white"
              }}
            >
              <Text style={{ color: "black" }}>{"SIGN UP"}</Text>
            </Button>
          </View>
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
