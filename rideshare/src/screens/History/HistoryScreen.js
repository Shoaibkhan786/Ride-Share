import React, { Component } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import UserDetailItem from "../../components/CardItems/UserDetailItem";
import {Separator } from "native-base";
import {dumiDataArray} from '../../utils/DumiData';

var timeStamp = 0;
class HistoryScreen extends Component {


  renderRow(item, index) {
    // if (index == 0 || timeStamp != item.timeStamp) {
    // timeStamp = item.timeStamp;
    return (
      <View>
        <Separator bordered style={{padding:8, }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 16
            }}
          >
            <Text>{new Date(item.timeStamp).toDateString()}</Text>
            <Text>{new Date(item.timeStamp).toLocaleTimeString()}</Text>
          </View>
        </Separator>
        <View>
          <UserDetailItem
            name={item.name}
            price={item.price}
            startLocation={item.startLocation}
            endLocation={item.endLocation}
            totalStops={item.totalStops}
            availableSeats={item.availableSeats}
            startTime={item.startTime}
            endTime={item.endTime}
            rating={item.rating}
            newRequestUnVerifyView={item.newRequestUnVerifyView}
            newRequestUnVerifyText={item.newRequestUnVerifyText}
            verifyAndProceedView={item.verifyAndProceedView}
            verifyAndProceedText={item.verifyAndProceedText}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={dumiDataArray}
          renderItem={({ item, index }) => this.renderRow(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

export default HistoryScreen;
