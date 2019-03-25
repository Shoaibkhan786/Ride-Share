import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import UserDetailItem from "../../components/CardItems/UserDetailItem";
import SearchCard from "../../components/SearchComponent/SearchCard";
import Spinner from "react-native-loading-spinner-overlay";
import { dumiDataArray } from "../../utils/DumiData";
import firebase from "react-native-firebase";
import { inject, observer } from "mobx-react";
@inject("store")
@observer
export default class SearchList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: null
    };
  }

  componentDidMount() {
    tempData = [];
    const ref = firebase
      .database()
      .ref()
      .child("search")
      .child(this.props.store.passengerDeparture)
      .child(this.props.store.passengerDestination)
      .child(this.props.store.passengerDate)
      .once("value");
    ref
      .then(items => {
        console.log("items are :" + items.val());

        if (items.val() != null) {
          items.forEach(item => {
            if(item.val().seat!=0){
            tempData.push(item);
            }
          });
          this.props.store.data = tempData; 
          this.setState({
            isLoading: false,
            data: this.props.store.data
          });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(err => {
        console.log("error is " + err);
      });
    // TODO: when the data is fetched then stop the loading
    // setInterval(() => {
    //   this.setState({
    //     spinner: false,
    //   });
    // }, 1000);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#FAA530" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {/* Whether drivers are available or not */}
        {this.state.data == null || this.props.store.data.length==0 ? (
          <View
            style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#FAA530", fontSize: 24 }}>
              Sorry! Driver is not available.
            </Text>
          </View>
        ) : (
          <FlatList
          style={styles.flatList}
          data={this.state.data}
          renderItem={({ item, index }) => {
            console.log("time is "+item.val().time)
            return (
              <View>
                <TouchableOpacity activeOpacity={.5} onPress={() => {
                   
                this.props.store.setUserProfileData(item);
                Actions.push("searchRideDetails");
                    
                }}>
                  <UserDetailItem
                    name={item.val().name}
                    price={item.val().pricePerSeat}
                    imageUri={item.val().imageUri}
                    startLocation={item.val().dept}
                    endLocation={item.val().dest}
                    totalStops={5} //TODO: Total stops for the time being is zero letter will be changed
                    availableSeats={item.val().seat}
                    startTime={item.val().time}
                    endTime={item.val().time}
                    rating={item.val().rating}
                    
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />   
         )}
        
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