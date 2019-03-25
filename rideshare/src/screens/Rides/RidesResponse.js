// import React, { Component } from "react";
// import { StyleSheet, Text, FlatList, View } from "react-native";
// import { Actions } from "react-native-router-flux";
// import UserDetailItem from "../../components/CardItems/UserDetailItem";
// class RideResponse extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           style={styles.flatList}
//           data={dumiDataRidesBooked}
//           renderItem={({ item, index }) => {
//             return (
//               <View>
//                 <UserDetailItem
//                   name={item.name}
//                   price={item.price}
//                   startLocation={item.startLocation}
//                   endLocation={item.endLocation}
//                   totalStops={item.totalStops}
//                   availableSeats={item.availableSeats}
//                   startTime={item.startTime}
//                   endTime={item.endTime}
//                   rating={item.rating}
//                   newRequestUnVerifyView={item.newRequestUnVerifyView}
//                   newRequestUnVerifyText={item.newRequestUnVerifyText}
//                   verifyAndProceedView={item.verifyAndProceedView}
//                   verifyAndProceedText={item.verifyAndProceedText}
//                   onVerifyToProceed={() => {
//                     Actions.verifyToProceed();
//                   }}
//                 />
//               </View>
//             );
//           }}
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

// export default RideResponse;
