import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import SearchCard from "../../components/SearchComponent/SearchCard";
import { Container, Content } from "native-base";
export default class SearchScreen extends Component {

  render() {
    let _width = Dimensions.get("screen").width;
    let _height = Dimensions.get("screen").height;
    return (
      <Container>
        <Content>
          <View style={[styles.container, { alignItems: "center" }]}>
            <ImageBackground
              style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height,
                justifyContent: "center"
              }}
              source={require("../../asset/image/login-background.jpg")}
            >
              <View
                style={{
                  width: _width,
                  height: _height / 2
                }}
              >
                <SearchCard />
              </View>
            </ImageBackground>

            {/* <SearchRideDetails/> */}
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 }
});
