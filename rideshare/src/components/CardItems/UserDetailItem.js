import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Content,
  Card,
  Body,
  Left,
  Text,
  Thumbnail,
  Icon,
  Right
} from "native-base";
import DotCircle from "../CardItems/DotCircle";
import TextLabel from "../TextLabels/TextLabel";
import PropTypes from "prop-types";

class UserDetailItem extends Component {

  constructor(props){
    super(props);

    console.log("Pictures uri is: "+this.props.imageUri);
  }
  render() {
    return (
      <Content style={{ marginStart: 4, marginEnd: 4 }}>
        <Card
          style={{
            borderWidth: 0.1,
            borderRadius: 4,
            borderColor: "#ddd",
            borderBottomWidth: 0,
            shadowColor: "#000",
            margin: 8,
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            elevation: 2 // Android
          }}
        >
          {/* Profile Pic, Name, New Request */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Thumbnail
              style={{
                width: 72,
                height: 72,
                borderRadius: 72 / 2,
                marginLeft: 16,
                marginTop: 8,
                marginBottom: 8
              }}
              source={
                this.props.imageUri == undefined ||
                this.props.imageUri == "null"
                  ? require("../../asset/image/profile.png")
                  : { uri: this.props.imageUri }
              }
            />

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginStart: 8
              }}
            >
              <Text
                numberOfLines={1}
                style={{ overflow: "hidden", width: 150 }}
              >
                {this.props.name}
              </Text>

              {/* Pending, Accepted and Approved view  */}

              {/* <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginRight: 8,
                  marginTop: 3
                }}
              >
                {"Pendin" == "Pending" ? (
                  <Icon name="exclamation" type="SimpleLineIcons" style={{color:"rgb(255,193,7)"}}/>
                ) : "Accepte" == "Accepted" ? (
                  <Icon name="check-circle"  type="MaterialIcons" style={{color:"rgb(76,175,80)"}}  />
                ) : (
                  <Icon name="close-o"  type="EvilIcons" style={{color:"#CE2027"}}  />
                )}
              </View> */}

              <View style={{ flex: 1 }}>
                {/* New Request, Verified, Unverified  */}
                {this.props.newRequestUnVerifyView ? (
                  <Right
                    style={[
                      {
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        marginRight: 8
                      }
                    ]}
                  >
                    <TextLabel
                      labelText={this.props.newRequestUnVerifyText}
                      borderWidth={0.5}
                      borderRadius={2}
                      borderColor="#ddd"
                      borderBottomWidth={0}
                      shadowColor="#000"
                      backgroundColor={
                        this.props.newRequestUnVerifyText == "Accepted"
                          ? "rgb(76,175,80)"
                          :this.props.newRequestUnVerifyText=="Pending"
                          ? "rgb(255,193,7)"
                          :"red"
                      }
                      textColor="#ffffff"
                      paddingHorizontal={8}
                      paddingVertical={2}
                      textWidth={100}
                    />
                  </Right>
                ) : null}
              </View>
            </View>
          </View>

          <Body>
            {/* <Text note>GeekyAnts</Text> */}

            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }
              ]}
            >
              <Left
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  alignSelf: "flex-start"
                }}
              >
                <Body
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginStart: 8,
                    marginEnd: 8
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",

                      marginStart: 16
                    }}
                  >
                    <DotCircle />
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between"
                      }}
                    >
                      {/* Start Location */}
                      <Text
                        note
                        numberOfLines={1}
                        style={{
                          width: 80,
                          marginBottom: 6,
                          overflow: "hidden"
                        }}
                      >
                        {this.props.startLocation}{" "}
                      </Text>

                      {/* End Location  */}
                      <Text
                        note
                        numberOfLines={1}
                        style={{ marginTop: 6, overflow: "hidden" }}
                      >
                        {this.props.endLocation}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        flexDirection: "column",
                        backgroundColor: "white",
                        padding: 4
                      }}
                    >
                      {/* Start Time  */}
                      <Text note style={{ marginBottom: 6 }}>
                        {this.props.startTime}
                      </Text>

                      {/* End Time */}
                      <Text note style={{ marginTop: 6 }}>
                        {this.props.endTime}
                      </Text>
                    </View>
                  </View>
                </Body>
              </Left>

              <Right>
                {this.props.totalStops == undefined &&
                this.props.availableSeats == undefined ? null : (
                  <Body
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginStart: 12,
                      marginStart: 8
                    }}
                  >
                    {/* Total Stops and Available Seats */}

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "space-between"
                        }}
                      >
                        {this.props.totalStops == undefined ? null : (
                          <Text note style={{ marginBottom: 6 }}>
                            Total Stops:
                          </Text>
                        )}

                        {this.props.availableSeats == undefined ? null : (
                          <Text note style={{ marginTop: 6 }}>
                            Available Seats:
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-end",
                          flexDirection: "column",
                          backgroundColor: "white",
                          padding: 4
                        }}
                      >
                        {/* Total stope while travelling  */}
                        <Text note style={{ marginBottom: 6 }}>
                          {this.props.totalStops}
                        </Text>

                        {/* Total Seats available for the passengers */}
                        <Text note style={{ marginTop: 6 }}>
                          {this.props.availableSeats}
                        </Text>
                      </View>
                    </View>
                  </Body>
                )}
              </Right>
            </View>
          </Body>

          {/* <CardItem style={[styles.yellow,{paddingBottom:8,paddingTop:8}]} > */}
          <View style={{ flexDirection: "row", padding: 8, marginEnd: 16 }}>
            {this.props.verifyAndProceedView ? (
              <Left>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      this.props.verifyAndProceedText == "Verify to proceed"
                    ) {
                      console.log("Verifiy or Proceed button click! ");
                      this.props.onVerifyToProceed();
                    }
                  }}
                >
                  <TextLabel
                    labelText={this.props.verifyAndProceedText}
                    borderWidth={0.5}
                    borderRadius={2}
                    borderColor="#ddd"
                    borderBottomWidth={0}
                    shadowColor="#000"
                    backgroundColor={
                      this.props.verifyAndProceedText == "Verified"
                        ? "rgb(76,175,80)"
                        : "rgb(255,193,7)"
                    }
                    textColor="#ffffff"
                    paddingHorizontal={8}
                    paddingVertical={2}
                  />
                </TouchableOpacity>
              </Left>
            ) : (
              <Left />
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                active
                ios={"star"}
                android={"star"}
                type={"MaterialIcons"}
                style={[styles.color1, { fontSize: 20 }]}
              />

              <Text style={[styles.color1, { fontSize: 16, paddingStart: 4 }]}>
                {this.props.rating}
              </Text>
            </View>
            <Right>
              <Text style={[styles.color1, { fontSize: 16 }]}>
                {"Rs. "}
                {this.props.price}
              </Text>
            </Right>
          </View>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  red: {
    backgroundColor: "red"
  },
  black: {
    backgroundColor: "black"
  },
  yellow: {
    backgroundColor: "yellow"
  },
  green: {
    backgroundColor: "green"
  },
  color1: {
    color: "rgb(52,73,94)"
  }
});

UserDetailItem.propTypes = {
  onVerifyToProceed: PropTypes.func
};

export default UserDetailItem;
