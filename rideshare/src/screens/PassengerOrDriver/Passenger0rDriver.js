import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { Container, Content, Item, Input, Icon } from "native-base";
import Button from "../../components/Button/CustomButton";
import styles from "./style.js";
import EditText from "../../components/EditText/EditText";

export default class PassengerOrDriver extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            style={styles.backgroundImageContainer}
            source={require("../../asset/image/login.png")}
          >
            <View style={{ marginTop: 16 }}>
              <Button
                width={170}
                height={40}
                textColor={"black"}
                backgroundColor={"white"}
                targetScreen="offerBottomNav"
                buttonText={"Offer a Ride"}
                isOfferRide={true}
              />
            </View>

            <View style={{ marginTop: 8 }}>
              <Button
                width={170}
                height={40}
                textColor={"white"}
                targetScreen="passengerBottomNav"
                buttonText={"Search a Ride"}
                isOfferRide={false}
              />
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}
