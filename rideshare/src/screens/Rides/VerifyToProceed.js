import React, { Component } from "react";
import {  View,} from "react-native";
import {
  Container,
  Content,
} from "native-base";
import { Grid, Col, } from "react-native-easy-grid";
import CustomButton from "../../components/Button/CustomButton";
import LabelPic from "../../components/TextLabels/LabelPic";

export default class VerifyToProceed extends Component {
  render() {
    return (
      <Container>
        <Content>

          {/* Luggage and CNIC Pice component */}
          <Grid style={{}}>
            <Col style={{ margin: 8, marginRight: 4 }}>
              <LabelPic
                text={"Luggage"}
                source={require("../../asset/image/luggage.jpeg")}
              />
            </Col>
            <Col style={{ margin: 8, marginLeft: 4 }}>
              <LabelPic text={"CNIC"}  source={require("../../asset/image/cnic.jpeg")}/>
            </Col>
          </Grid>

          {/* Accepti or Reject the request */}
          <Grid>
            <Col>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 24,
                  marginBottom:16
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
                    buttonText={"Send"}
                    // targetScreen={"passengerBottomNav"}
                  />
                </View>
              </View>
            </Col>
          </Grid>
          {/* </View> */}
        </Content>
      </Container>
    );
  }
}