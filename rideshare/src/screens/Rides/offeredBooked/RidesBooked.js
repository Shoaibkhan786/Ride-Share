import React, { Component } from "react";
import { StyleSheet, Text, FlatList, View, AsyncStorage,TouchableOpacity } from "react-native";
import UserDetailItem from "../../../components/CardItems/UserDetailItem";
import { Separator } from "native-base";
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";

// @inject("store")
// @observer
export default class RidesBooked extends Component {
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
        passengerContact = phoneNumber;
      })
      .then(() => {
        console.log("My contact number is :"+passengerContact)
        const ref = firebase
          .database()
          .ref("PassengerRides")
          .child(passengerContact)
          .once("value");
        ref.then(items => {
          if(items.val()!=null){
          items.forEach(item => {
            item.forEach(child => {
              console.log("child is :" + child);
              tempData.push(child);
            });
          });
          this.setState({ data: tempData, spinnerBool: false });
        }else{
          this.setState({spinnerBool:false})
        }
        });
      });
  }
  renderRow(item, index) {
    console.log("items value: "+ JSON.stringify(item));
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
        <TouchableOpacity onPress={()=>{ 
        }}>
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
            newRequestUnVerifyText={item.val().status} 
            // verifyAndProceedView={item.verifyAndProceedView}
            // verifyAndProceedText={item.verifyAndProceedText}
          />
        </View>
        </TouchableOpacity>
      </View>
    );
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Spinner
            visible={this.state.spinnerBool}
            textContent={"Wait Please"}
            textStyle={{ color: "#FFF" }}
          />
        </View>
        {this.state.data==null && this.state.spinnerBool==false ?(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:"#FAA530",fontSize:24}}>You did not book any ride!</Text>
          </View>
        ):<FlatList
        style={styles.flatList}
        data={this.state.data}
        renderItem={({ item, index }) => this.renderRow(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />}
        
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

// import React, { Component } from "react";
// import { StyleSheet, Text, FlatList, View } from "react-native";
// import UserDetailItem from "../../../components/CardItems/UserDetailItem";
// import {Separator } from "native-base";
// import {dumiDataArray} from '../../utils/DumiData';

// var timeStamp = 0;
// class RidesBooked extends Component {


//   renderRow(item, index) {
//     return (
//       <View>
//         <Separator bordered style={{padding:8, }}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               marginRight: 16
//             }}
//           >
//             <Text>{new Date(item.timeStamp).toDateString()}</Text>
//             <Text>{new Date(item.timeStamp).toLocaleTimeString()}</Text>
//           </View>
//         </Separator>
//         <View>
//           <UserDetailItem
//             name={"lala"}
//             price={item.price}
//             startLocation={item.startLocation}
//             endLocation={item.endLocation}
//             totalStops={item.totalStops}
//             availableSeats={item.availableSeats}
//             startTime={item.startTime}
//             endTime={item.endTime}
//             rating={item.rating}
//             newRequestUnVerifyView={item.newRequestUnVerifyView}
//             newRequestUnVerifyText={item.newRequestUnVerifyText}
//             verifyAndProceedView={item.verifyAndProceedView}
//             verifyAndProceedText={item.verifyAndProceedText}
//           />
//         </View>
//       </View>
//     );
//     // } else {
//     //   return (
//     //     <View>
//     //       <UserDetailItem
//     //         name={item.name}
//     //         price={item.price}
//     //         startLocation={item.startLocation}
//     //         endLocation={item.endLocation}
//     //         totalStops={item.totalStops}
//     //         availableSeats={item.availableSeats}
//     //         startTime={item.startTime}
//     //         endTime={item.endTime}
//     //         newRequestUnVerifyView={item.newRequestUnVerifyView}
//     //         newRequestUnVerifyText={item.newRequestUnVerifyText}
//     //         verifyAndProceedView={item.verifyAndProceedView}
//     //         verifyAndProceedText={item.verifyAndProceedText}
//     //       />
//     //     </View>
//     //   );
//     // }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           style={styles.flatList}
//           data={dumiDataArray}
//           renderItem={({ item, index }) => this.renderRow(item, index)}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff"
//   }
// });

// export default RidesBooked;
