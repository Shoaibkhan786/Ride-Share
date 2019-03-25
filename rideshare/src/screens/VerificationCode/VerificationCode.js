import React, { Component } from "react";
import { ImageBackground, View, Text } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Textarea,
  Body,
  Button
} from "native-base";
import EditText from "../../components/EditText/EditText";
import styles from "./style.js";
import Spinner from "react-native-loading-spinner-overlay";
import { inject, observer } from "mobx-react";
import { Actions } from "react-native-router-flux";
@inject("store")
@observer

export default class VerificationCode extends Component {
  constructor(props){
     super(props);
     this.state={bool:false}
  }
  //Verification Code method
  onVerificationCode = (verificationCode) => {
    this.props.store.phoneAuth
      .confirm(verificationCode)
      .then(user => {
        console.log("user is "+user);
        this.setState({bool:false});
        Actions.reset("signUp");
        
      })
      .catch(error => {
        const { code, message } = error;
        console.log("error is " + error);
        this.setState({bool:false});
      });
  };
  
  handlePress() {
    if (
      this.props.store.firstDigit == "" ||
      this.props.store.firstDigit == null ||
      this.props.store.secondDigit=="" ||
      this.props.store.secondDigit==null ||
      this.props.store.thirdDigit == "" ||
      this.props.store.thirdDigit == null ||
      this.props.store.fourthDigit=="" ||
      this.props.store.fourthDigit==null ||
      this.props.store.fifthDigit == "" ||
      this.props.store.fifthDigit == null ||
      this.props.store.sixthDigit=="" ||
      this.props.store.sixthDigit==null
    ) {
      console.log("Kindly enter your fields properly");
    } else {
      this.setState({bool:true});
      
      let verificationCode=this.props.store.firstDigit+""+this.props.store.secondDigit+""+
                           this.props.store.thirdDigit+""+this.props.store.fourthDigit+""+
                           this.props.store.fifthDigit+""+this.props.store.sixthDigit;
       //calling firebase verification method
       this.onVerificationCode(verificationCode);          
      // this.setState({ bool: true });
      // this.signInWithPhoneNumber();
    }
  }
  render() {
    return (
      <Container>
        <Content>
          <Body>
            {/* Image Background as Main Parent */}
            <ImageBackground
              style={styles.backgroundImageContainer}
              source={require("../../asset/image/login-background.jpg")}
            >
            {/* Spinner */}
            <View>
              <Spinner
                visible={this.state.bool}
                textContent={"Code verification"}
                textStyle={{ color: "#FFF" }}
              />
            </View>

              {/* Parent View contains text,eidt texts and buttons:Flex direction is column.*/}
              <View style={styles.verificationCodeParent}>
                <Textarea
                  rowSpan={1.5}
                  placeholder="Please enter your verification code."
                  placeholderTextColor="white"
                  alignItems="center"
                  disabled
                />
                {/* Parent view of edit texts:Flex direction is row. */}
                <View style={styles.verficationCodeEditTextParent}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: "white",

                      borderRadius: 4,
                      elevation: 2,
                      shadowOpacity: 1,
                      shadowOffset: { width: 0, height: 1 },

                      justifyContent: "center",
                      paddingLeft: 12
                    }}
                  >
                    <EditText
                      width={15}
                      height={40}
                      placeholder="0"
                      maxLimit={1}
                      underline="transparent"
                      keyboardType="numeric"
                      inputId={1}
                    />
                  </View>
                  <View style={styles.editTextView}>
                    <EditText
                      width={15}
                      height={40}
                      maxLimit={1}
                      placeholder="0"
                      keyboardType="numeric"
                      underline="transparent"
                      inputId={2}
                    />
                  </View>
                  <View style={styles.editTextView}>
                    <EditText
                      width={15}
                      height={40}
                      maxLimit={1}
                      placeholder="0"
                      keyboardType="numeric"
                      underline="transparent"
                      inputId={3}
                    />
                  </View>
                  <View style={styles.editTextView}>
                    <EditText
                      width={15}
                      height={40}
                      maxLimit={1}
                      keyboardType="numeric"
                      placeholder="0"
                      underline="transparent"
                      inputId={4}
                    />
                  </View>
                  <View style={styles.editTextView}>
                    <EditText
                      width={15}
                      height={40}
                      maxLimit={1}
                      keyboardType="numeric"
                      placeholder="0"
                      underline="transparent"
                      inputId={5}
                    />
                  </View>
                  <View style={styles.editTextView}>
                    <EditText
                      width={15}
                      height={40}
                      keyboardType="numeric"
                      maxLimit={1}
                      placeholder="0"
                      underline="transparent"
                      inputId={6}
                    />
                  </View>
                </View>
                {/* View for buttons */}
                <View style={{ marginTop: 16 }}>
                  <View>
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
                      <Text style={{ color: "black"}}>
                        {"Verify"}
                      </Text>
                    </Button>
                  </View>
            
                  <View style={{ marginTop: 10 }}>
                    <View>
                      <Button
                        bordered
                        light
                        style={{
                          width: 170,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text style={{ color: "black"}}>
                          {"Resend Code"}
                        </Text>
                      </Button>
                    </View>
                    {/* <Button
                      width={170}
                      height={40}
                      textColor={"white"}
                      buttonText={"Resend Code"}
                    /> */}
                  </View>
                </View>
              </View>
            </ImageBackground>
          </Body>
        </Content>
      </Container>
    );
  }
}
