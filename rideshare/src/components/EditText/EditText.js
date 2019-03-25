/**
 * Created:2018-10-18
 * Created By:Muhammad Shoaib Khan
 * This component enables you to customize the button and used whenever it needed
 * Props:
 * borderColor:customize border color
 * backgroundColor:button background color
 * height:height of the button
 * width:width of the button
 * textColor:text color of the button
 * targetScreen:action for button for navigating between screens
 */
import React, { Component } from "react";
import { View, TextInput } from "react-native";
import {inject,observer} from 'mobx-react'

 @inject('store')
 @observer

class EditText extends Component {
  handleInput(value){
    console.log("look at the id "+this.props.inputId);
    if(this.props.inputId=="pricePerSeat"){
      if(value==""){
        this.props.store.pricePerSeat=null;
      }else{
        this.props.store.pricePerSeat=value;
      }      
      console.log("Price Per seact is :"+this.props.store.pricePerSeat);
    }
    if(this.props.inputId=="passDeparture"){
      if(value==""){
        this.props.store.passengerDeparture=null;
      }else{
        this.props.store.passengerDeparture=value;
        console.log("Passenger Departure :"+this.props.store.passengerDeparture);
      }
    }
    if(this.props.inputId=="passDestination"){
      if(value==""){
        this.props.store.passengerDestination=null;
      }else{
        this.props.store.passengerDestination=value
        console.log("Passenger Destination :"+this.props.store.passengerDestination);
      }
    }
    if(this.props.inputId=="departure"){
      if(value==""){
        this.props.store.departure=null;  
      }else{
        this.props.store.departure=value;
      }
      
      console.log("Departure is :"+this.props.store.departure);
    }
    if(this.props.inputId=="destination"){
      if(value==""){
        this.props.store.destination=null;
      }else{
        this.props.store.destination=value;
      }
      console.log("Destination is :"+this.props.store.destination);
    }
    if(this.props.inputId == "phone"){
    if(value==""){
      //this.props.store.setPhoneNumber(value);
      this.props.store.phoneNumber=null;
    }else{
     // this.props.store.setPhoneNumber(value);
     console.log("Value is :"+value);
     this.props.store.phoneNumber=value;
      console.log("Phone Number: "+this.props.store.phoneNumber);
    }
    
    }
    if(this.props.inputId == "firstName"){
     this.props.store.firstName=value;
     console.log("First Name "+this.props.store.firstName)
    }
    if(this.props.inputId == "lastName"){
      this.props.store.lastName=value;
      console.log("Last Name "+this.props.store.lastName)
    }
    if(this.props.inputId == "cnic"){
      this.props.store.cnic=value;
      console.log("CNIC Name "+this.props.store.cnic)
    }
    if(this.props.inputId==1){  
    this.props.store.firstDigit=value;  
    }
    if(this.props.inputId==2){
      this.props.store.secondDigit=value;
    }
    if(this.props.inputId==3){
      this.props.store.thirdDigit=value;
    }
    if(this.props.inputId==4){
      this.props.store.fourthDigit=value;
    }
    if(this.props.inputId==5){
      this.props.store.fifthDigit=value;
    }
    if(this.props.inputId==6){
      this.props.store.sixthDigit=value;
    }
    
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          borderColor:
            this.props.borderColor == undefined
              ? "#ddd"
              : this.props.borderColor,
          borderWidth:
            this.props.borderWidth == undefined ? 0.1 : this.props.borderWidth,
          borderRadius:
            this.props.borderRadius == undefined ? 4 : this.props.borderRadius,
          shadowOffset: { height: 1, width: 1 } // IOS
        }}
      >
        <TextInput
          underlineColorAndroid={
            this.props.underline == "transparent" ? "transparent" : null
          }
          keyboardType={this.props.keyboardType}
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLimit}
          placeholderTextColor={this.props.placeholderColor}
          style={{ height: this.props.height, width: this.props.width }}
          onChangeText={(value) => this.handleInput(value)}
          value={this.props.value}
          style={{
            flexDirection: "row",
            height: this.props.height == undefined ? 42 : this.props.height,
            width: this.props.width,
            paddingLeft: this.props.paddingLeft
          }}
        />
      </View>
    );
  }
}

//EditText.propsTypes={saveModelNumber:PropsTypes.func}
export default EditText;
