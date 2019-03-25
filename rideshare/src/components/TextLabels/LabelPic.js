import React from "react";
import { View, TouchableOpacity, Dimensions, Image } from "react-native";
import { Thumbnail, Text, Icon } from "native-base";
import Lightbox from "react-native-lightbox";
import ImagePicker from "react-native-image-picker";
import { inject, observer } from "mobx-react";
import PropTypes from 'prop-types';

@inject("store")
@observer
 class LabelPic extends React.Component {

  constructor(){
    super();

    this.state = {
      image : null
    }
  }
  uploadImage() {
    console.log("id is " + this.props.id);
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
        const source = { uri: response.uri, fileName: response.fileName };

        this.setState({
          image : source.uri, fileName: source.fileName});

        this.props.onChoseImage(source.uri, source.fileName);

        // if (this.props.id == true) {
        //   //console.log("image name :"+response.fileName)
        //   this.props.store.liecienceImage = response.fileName;
        //   this.props.store.liecienceImageUri = source.uri;
        // }
        
        // if (this.props.id == false) {
        //   this.props.store.numberPlateImage = response.fileName;
        //   this.props.store.numberPlateImageUri = source.uri;
        // }

        // //isLuggageOrCNIC
        // if (isLuggageOrCNIC == true) {
        //   this.props.store.luggageImage = response.fileName;
        //   this.props.store.luggageImageUri = source.uri;
        // } else {
        //   this.props.store.CNICImage = response.fileName;
        //   this.props.store.CNICImageUri = source.uri;
        // }
      }
    });
  }
  render() {
    // const pic = require(this.props.picture);
    return (
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
          elevation: 2 // Android,
        }}
      >
        {/* 49 days */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#ddd",
            justifyContent: "center",
            borderRadius: 4
            // backgroundColor:'green'
          }}
        >
          <View style={{ flex: 2, alignSelf: "center" }}>
            <Text style={{ margin: 8, alignSelf: "center" }}>
              {this.props.text}
            </Text>
          </View>

          <View style={{ flex: 1, alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.uploadImage();
              }}
            >
              <Icon
                style={{ alignSelf: "center" }}
                name="camera"
                type="EvilIcons"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity>

          {/* if image not available then */}
          
          {this.state.image == undefined || this.state.image == "" ? (
            <Text
              note
              style={{ alignSelf: "center", color: "red", padding: 16 }}
            >
              Not Available
            </Text>
          ) : (
            <Lightbox
              style={{ padding: 16 }}
              renderHeader={close => (
                <TouchableOpacity onPress={close}>
                  <Text
                    style={{
                      color: "white",
                      borderWidth: 1,
                      borderColor: "white",
                      padding: 8,
                      borderRadius: 3,
                      textAlign: "center",
                      margin: 10,
                      alignSelf: "flex-end"
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              )}
            >
              <Thumbnail
                style={{
                  width: Dimensions.get("screen").width / 2,
                  height: Dimensions.get("screen").width / 2,
                  alignSelf: "center"
                }}
                square
                source={
                  this.state.image == undefined || this.state.image == ""
                    ? null
                    : { uri: this.state.image }
                }
                resizeMode="contain"
              />
            </Lightbox>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
const options = {
  title: "Pick your pictur",
  customButtons: [{ name: "lALA", title: "LALA" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};


LabelPic.propTypes = {
  onChoseImage: PropTypes.func
}

export default LabelPic;