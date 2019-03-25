import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity
} from "react-native";
import { Thumbnail, Icon, Text } from "native-base";
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Pick your pictur',
  customButtons: [{ name: 'lALA', title: 'LALA' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


class UserProfileDetails extends Component {

  chooseImageFromGallery() {
    ImagePicker.launchImageLibrary(options, response => {
      console.log("Response = ", response);
  
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
      }
    });
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          margin: 8,
          borderRadius: 4,

          borderWidth: 0.1,
          borderColor: "#ddd",
          borderBottomWidth: 0,
          shadowColor: "#000",
          backgroundColor: "white",
          shadowColor: "rgba(0,0,0, .4)", // IOS
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 1, // IOS
          shadowRadius: 1, //IOS
          elevation: 2 // Android
        }}
      >
        <Thumbnail
          style={{ height: 92, width: 92, borderRadius:92/2 }}
          source={require("../../asset/image/profile-1.png")}
        />

        {this.props.isUploadProfilePic ? (
          <View
            style={{
              width: 32,
              height: 32,
              justifyContent: "flex-end",
              marginTop: 60,
              marginLeft: -20,
              borderRadius: 50,
              justifyContent: "center",

              borderWidth: 0.1,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000",
              backgroundColor: "rgb(52,73,94)",
              shadowColor: "rgba(0,0,0, .4)", // IOS
              shadowOffset: { height: 1, width: 1 }, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1, //IOS
              elevation: 2 // Android
            }}
          >
            <TouchableOpacity onPress={this.chooseImageFromGallery.bind(this)}>
              <Icon
                style={{ alignSelf: "center", fontSize: 24,color:'white' }}
                name="camera"
                type="EvilIcons"
              />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={{ color: "#000000", fontSize: 20 }}>{"Hamza Ali"}</Text>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="phone"
              type="MaterialCommunityIcons"
              style={{ fontSize: 16, padding: 2 }}
            />
            <Text note style={{ padding: 1 }}>
              +921234567890
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon
              name="email-outline"
              type="MaterialCommunityIcons"
              style={{ fontSize: 16, padding: 4 }}
            />
            <Text note style={{ padding: 1 }}>
              xyz@gmail.com
            </Text>
          </View>
        </View>

        {this.props.isEdit ? (
          <View
            style={{
              marginTop: 45,
              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
              margin: 16,
              backfaceVisibility: "hidden",
              borderRadius: 50,

              borderWidth: 0.1,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000",
              backgroundColor: "rgb(52,73,94)",
              shadowColor: "rgba(0,0,0, .4)", // IOS
              shadowOffset: { height: 1, width: 1 }, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1, //IOS
              elevation: 2 // Android
            }}
          >
            <TouchableOpacity>
              <Icon
                name="edit"
                type="Entypo"
                style={{ fontSize: 16, padding: 8, color:'white' }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  }
});

export default UserProfileDetails;
