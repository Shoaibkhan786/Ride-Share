import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Thumbnail, Icon, Text, ListItem } from "native-base";
import ImagePicker from "react-native-image-picker";
import { inject, observer } from "mobx-react";
import TextLabel from "../../components/TextLabels/TextLabel";
import Dialog, {
  SlideAnimation,
  DialogButton,
  DialogTitle
} from "react-native-popup-dialog";

const options = {
  title: "Pick your pictur",
  customButtons: [{ name: "lALA", title: "LALA" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

var userTextField = null;

@inject("store")
@observer
class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      bool: false,
      isEditDialog: false
    };
  }

  saveInfo() {
    AsyncStorage.setItem(
      "username",
      JSON.stringify({
        username: this.props.store.username
      })
    );

    this.props.store.username = userTextField;
    this.setState({
      isEditDialog: false
    });
  }

  cancel() {
    this.setState({
      isEditDialog: false
    });
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

  saveUsername(value) {
    userTextField = value;
  }

  render() {
    return (
      <View style={{ fex: 1 }}>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 32,
              padding: 16,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#efefef"
            }}
          >
            <Thumbnail
              style={{ height: 140, width: 140, borderRadius: 140 / 2 }}
              // source={require("../../asset/image/profile-1.png")}
              source={
                this.state.bool == false
                  ? { uri: this.props.store.profileImage }
                  : { uri: this.props.store.profileImage }
              }
            />
            {this.props.isUploadProfilePic ? (
              <View
                style={{
                  width: 42,
                  height: 42,
                  justifyContent: "flex-end",
                  marginTop: 60,
                  marginLeft: -30,
                  borderRadius: 50,
                  justifyContent: "center",

                  borderWidth: 0.1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                  shadowColor: "#000",
                  // backgroundColor: "rgb(52,73,94)",
                  backgroundColor: "white",
                  shadowColor: "rgba(0,0,0, .4)", // IOS
                  shadowOffset: { height: 1, width: 1 }, // IOS
                  shadowOpacity: 1, // IOS
                  shadowRadius: 1, //IOS
                  elevation: 2 // Android
                }}
              >
                <TouchableOpacity
                  onPress={this.chooseImageFromGallery.bind(this)}
                >
                  <Icon
                    style={{
                      alignSelf: "center",
                      fontSize: 24,
                      color: "#9a9a9a"
                    }}
                    name="camera"
                    type="EvilIcons"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>

        {/* Edit user name */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            {this.props.store.profileFirstName == null ||
            this.props.store.profileLastName == "" ? (
              <Text note style={{marginStart: 16}}>{"Enter your username"}</Text>
            ) : (
              <Text style={{ fontSize: 22, marginStart: 16, marginTop: 8 }}>
                {this.props.store.profileFirstName +" "+this.props.store.profileLastName}
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            {this.props.isEdit ? (
              <View
                style={{
                  width: 32,
                  height: 32,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 8,
                  marginRight: 16,
                  backfaceVisibility: "hidden",
                  borderRadius: 50,
                  borderWidth: 0.1,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                  shadowColor: "#000",
                  // backgroundColor: "rgb(52,73,94)",
                  backgroundColor: "white",
                  shadowColor: "rgba(0,0,0, .4)", // IOS
                  shadowOffset: { height: 1, width: 1 }, // IOS
                  shadowOpacity: 1, // IOS
                  shadowRadius: 1, //IOS
                  elevation: 2 // Android
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isEditDialog: !this.state.isEditDialog });
                  }}
                >
                  <Icon
                    name="edit"
                    type="Entypo"
                    style={{ fontSize: 16, padding: 8, color: "#9a9a9a" }}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>

        {/* Phone and Email views */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'flex-start',
            marginLeft:3,
            backgroundColor: "#efefef"
          }}
        >
          <View style={{ flexDirection: "row", margin: 8 }}>
            <Icon
              name="phone"
              type="MaterialCommunityIcons"
              style={{ fontSize: 16, padding: 2 }}
            />
            <Text note style={{ padding: 1, paddingStart: 4 }}>
              {this.props.store.contact}
            </Text>
          </View>

          {/* <View style={{ flexDirection: "row", margin: 8 }}>
            <Icon
              name="email-outline"
              type="MaterialCommunityIcons"
              style={{ fontSize: 16, padding: 4 }}
            />
            <Text note style={{ padding: 1, paddingStart: 4 }}>
              xyz@gmail.com
            </Text>
          </View> */}
        </View>

        {/* Vehicle Info */}
        {/* If car infor added then show it here otherwise hide */}
        {/* <View style={[styles.cardView]}> */}
        {/* <View
            style={{
              flexDirection: "row",
              // backgroundColor: "red",
              // alignItems: "center",
              // justifyContent: "center"
            }}
          > */}
        {/* <View style={{ flex: 1, justifyContent:'center' }}>
              <Text style={{ fontWeight: "bold" }}> {"Vehicle Info"} </Text>
            </View> */}

        {/* </View> */}

        {/* User's vehicleInfo */}
        {true ? (
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
            {/* <View
             style={{
               flexDirection: "column",
               justifyContent: "center"
             }}
           >
             <View style={{  }}> */}
            <View style={{ flexDirection: "row" }}>
              {/* Car Details Label */}
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  margin: 8,
                  marginTop: 18
                }}
              >
                <TextLabel
                  backgroundColor={"#FAA530"}
                  textWidth={120}
                  textHeight={24}
                  labelText={"Vehicle Info"}
                />
              </View>

              {/* Edit Car Info Pencil */}
              {/* <View style={{ margin: 8 }}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    justifyContent: "center",
                    alignItems: "center",
                    backfaceVisibility: "hidden",
                    borderRadius: 50,
                    borderWidth: 0.1,
                    borderColor: "#ddd",
                    borderBottomWidth: 0,
                    shadowColor: "#000",
                    // backgroundColor: "rgb(52,73,94)",
                    backgroundColor: "white",
                    shadowColor: "rgba(0,0,0, .4)", // IOS
                    shadowOffset: { height: 1, width: 1 }, // IOS
                    shadowOpacity: 1, // IOS
                    shadowRadius: 1, //IOS
                    elevation: 2 // Android
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isEditDialog: !this.state.isEditDialog });
                    }}
                  >
                    <Icon
                      name="edit"
                      type="Entypo"
                      style={{ fontSize: 16, padding: 8, color: "#9a9a9a" }}
                    />
                  </TouchableOpacity>
                </View>
              </View> */}
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
                <Text note>{"White"}</Text>
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
                <Text>Number</Text>
                <Text note>{"6E218"}</Text>
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

                <Text note>{"Swift"}</Text>
              </View>
            </ListItem>
            {/* </View> */}
            {/* </View> */}
          </View>
        ) : null}

        {/* Number and drive liecience */}
        {/* <View style={{ marginTop: 8 }}>
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
              </View> */}
        {/* <View
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
              </View> */}
        {/* </View> */}

        <Dialog
          visible={this.state.isEditDialog}
          width={0.9}
          height={0.3}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
          actions={[
            <DialogButton
              text="Save"
              textStyle={{ color: "green", fontSize: 14 }}
              onPress={() => {
                this.saveInfo();
              }}
            />,
            <DialogButton
              text="Cancel"
              textStyle={{ color: "red", fontSize: 14 }}
              onPress={() => {
                this.cancel();
              }}
            />
          ]}
        >
          <DialogTitle title="Profile" textStyle={{ color: "#c8c8c8" }} />
          {/* Vehicle information */}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <View style={styles.vehicleInfo}>
              <View>
                <TextInput
                  placeholder="Enter your username"
                  style={{ paddingStart: 8, backgroundColor: "#efefef" }}
                  onChangeText={value => {
                    this.saveUsername(value);
                  }}
                />
              </View>
            </View>
          </View>
        </Dialog>
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
  },
  cardView: {
    height: 200,
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
  }
});

export default UserProfile;
