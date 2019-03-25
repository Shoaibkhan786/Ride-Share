import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Container, Content } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import CustomButton from "../../components/Button/CustomButton";
import UserProfileDetails from "../../components/UserProfileDetail/UserProfileDetails";
import DotCircle from "../../components/CardItems/DotCircle";
import TextLabel from "../../components/TextLabels/TextLabel";
import LabelPic from "../../components/TextLabels/LabelPic";

class RidesRquest extends Component {
  render() {
    return (
          <View style={styles.container}>
            {/* UserDetail Component and Traveling Detail Compont in a view */}
            <View
              style={{
                borderWidth: 0.1,
                borderRadius: 4,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                shadowColor: "#000",
                backgroundColor: "#fff",
                margin: 8,
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1, //IOS
                elevation: 2 // Android
              }}
            >
              <TouchableOpacity>
                <UserProfileDetails isUploadProfilePic={false} isEdit={false} />

                {/* Ride Details and Requireed Seats  Data*/}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center"
                      }}
                    >
                      <TextLabel
                        backgroundColor={"rgb(52,73,94)"}
                        textWidth={120}
                        textHeight={24}
                        labelText={"Ride Details"}
                        textColor={"#FFFFFF"}
                      />
                    </View>

                    {/* Details */}

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 8
                      }}
                    >
                      {/* Start and location time and Dotcircle component */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 16
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
                            {"Lahore"}
                          </Text>

                          {/* End Location  */}
                          <Text
                            note
                            numberOfLines={1}
                            style={{ marginTop: 6, overflow: "hidden" }}
                          >
                            {"Karachi"}
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
                            {"01:00 PM"}
                          </Text>

                          {/* End Time */}
                          <Text note style={{ marginTop: 6 }}>
                            {"11:00 PM"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Required Seats Quantity */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      marginEnd: 16
                    }}
                  >
                    <View>
                      <TextLabel
                        backgroundColor={"rgb(52,73,94)"}
                        textWidth={120}
                        textHeight={24}
                        labelText={"Required Seats"}
                        textColor={"#FFFFFF"}
                      />
                      <Text
                        note
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                          marginTop: 16,
                          fontSize: 22
                        }}
                      >
                        03
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* End of UserDetailComponet and Traveling Component */}

            {/* Luggage and CNIC Pice component */}
            {/* <Grid>
              <Col style={{ margin: 8, marginRight: 4 }}>
                <LabelPic
                  text={"Luggage"}
                  source={require("../../asset/image/luggage.jpeg")}
                />
              </Col>
              <Col style={{ margin: 8, marginLeft: 4 }}>
                <LabelPic text={"CNIC"} />
              </Col>
            </Grid> */}

            {/* Accepti or Reject the request */}
            <Grid>
              <Col>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 40
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <CustomButton
                      backgroundColor="rgb(52,73,94)"
                      textWidth={200}
                      textColor={"#FFFFFF"}
                      paddingVertical={10}
                      paddingHorizontal={30}
                      width={180}
                      height={45}
                      buttonText={"Accept Request"}
                    />
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <CustomButton
                      width={180}
                      height={45}
                      textWidth={200}
                      textColor={"rgb(52,73,94)"}
                      borderColor={"#FFFFFF"}
                      buttonText={"Reject Request"}
                    />
                  </View>
                </View>
              </Col>
            </Grid>
          </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  }
});

export default RidesRquest;
