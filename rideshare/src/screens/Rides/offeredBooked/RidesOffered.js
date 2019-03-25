import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import UserDetailItem from "../../../components/CardItems/UserDetailItem";
import { Separator } from "native-base";
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class RidesOffered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      spinnerBool: true
    };
  }
  componentDidMount() {
    tempData = [];
    driverContact = null;
    AsyncStorage.getItem("phoneNumber")
      .then(phoneNumber => {
        driverContact = phoneNumber;
      })
      .then(() => {
        const ref = firebase
          .database()
          .ref("offerRides")
          .child(driverContact)
          .once("value");
        ref.then(items => {
          if(items.val()!=null){  
          items.forEach(item => {
            item.forEach(child => {
              tempData.push(child);
            });
            this.setState({ data: tempData, spinnerBool: false });
          });
         
        }else{
          this.setState({spinnerBool:false})
        }
        }
        );
      });
  }
  renderRow(item, index) {
    //console.log("items value: "+ JSON.stringify(item));
    return (
      <View>
        <Separator bordered style={{ padding: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 16
            }}
          >
            <Text>{item.val().date}</Text>
            {/* <Text>{new Date(item.timeStamp).toLocaleTimeString()}</Text> */}
          </View>
        </Separator>
        <TouchableOpacity
          onPress={() => {
            this.props.store.driverOfferdRides = item;
            Actions.PassengerDetails();
          }}
        >
          <View>
            <UserDetailItem
              name={item.val().name}
              price={item.val().pricePerSeat}
              startLocation={item.val().dept}
              endLocation={item.val().dest}
              totalStops={4}
              availableSeats={item.val().seat}
              startTime={item.val().time}
              endTime={item.val().time}
              rating={5}
              imageUri={item.val().imageUri}
              newRequestUnVerifyView={true}
              newRequestUnVerifyText={"Accepted"}
              verifyAndProceedView={true}
              verifyAndProceedText={"Verified"}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log("Offer Screen data :  " + JSON.stringify(this.state.data));
    return (
      <View style={styles.container}>
        <View>
          <Spinner
            visible={this.state.spinnerBool}
            textContent={"Wait Please"}
            textStyle={{ color: "#FFF" }}
          />
        </View>
        {this.state.data == null && this.state.spinnerBool == false ? (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}
              >
            <Text style={{ color: "#FAA530", fontSize: 24 }}>
              You did not offer any ride!
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            renderItem={({ item, index }) => this.renderRow(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {/* <FlatList
          style={styles.flatList}
          data={this.state.data}
          renderItem={({ item, index }) => this.renderRow(item, index)}
          keyExtractor={(item, index) => index.toString()}
        /> */}
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
