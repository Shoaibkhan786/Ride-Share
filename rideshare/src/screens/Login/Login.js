  import React, { Component } from "react";
import { ImageBackground, View, Text } from "react-native";
import { Container, Content, Item, Input, Icon, Button } from "native-base";
import styles from "./style.js";
import EditText from "../../components/EditText/EditText";
import firebase from "react-native-firebase";
import { inject, observer } from "mobx-react";
import Spinner from "react-native-loading-spinner-overlay"; 
import { Actions } from "react-native-router-flux";
import { RNToasty } from "react-native-toasty";

@inject("store")
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false,
    };
  }  
  signInWithPhoneNumber = () => {
    console.log("phone Number :"+this.props.store.phoneNumber);
    firebase
      .auth()
      .signInWithPhoneNumber(this.props.store.phoneNumber)
      .then(confirmResult => {
        this.props.store.phoneAuth=confirmResult;
        console.log("look :"+confirmResult);
        this.setState({bool: false });
        //navigate to next verfication code screen
        Actions.push("VerificationCode");
      })
      .catch(error => {
        const { code, message } = error;
        
        this.setState({bool: false });
        RNToasty.Error({ title: "Error in number validity", duration: 2 });
        console.log("error is " + message);
      });
  };
  handlePress() {
    if (
      this.props.store.phoneNumber == "" ||
      this.props.store.phoneNumber == null
    ) {
      console.log("Kindly enter phone number");
    } else {
      this.setState({ bool: true });
      this.signInWithPhoneNumber();
    }
  }
  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            style={styles.container}
            source={require("../../asset/image/login-background.jpg")}
          >
            <View>
              <Spinner
                visible={this.state.bool}
                textContent={"Sending code "}
                textStyle={{ color: "#FFF" }}
              />
            </View>
            <View
              style={{ flexDirection: "row", marginRight: 16, marginLeft: 16 }}
            >
              <Item style={{ flex: 1 }}>
                <Icon
                  active
                  name="phone"
                  type="MaterialIcons"
                  style={styles.color}
                />
                <EditText
                  placeholder="+92-000-0000000"
                  placeholderColor="white"
                  underline="transparent"
                  inputId="phone"
                  //skeyboardType="numeric"
                />
              </Item>
            </View>
            <View style={{ marginTop: 16 }}>
              <Button
                bordered
                light
                onPress={() => {
                  this.handlePress();
                }}
                style={{
                  width: 170,
                  height: 40,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "black", }}>
                  {"Send Code"}
                </Text>
              </Button>
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}
