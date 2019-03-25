// import React, { Component } from "react";
// import { StyleSheet, Dimensions,View } from "react-native";
// import { Container, Content } from "native-base";
// import RidesResponse from "./RidesResponse";
// import RidesBooked from "./offeredBooked/RidesBooked";

// // import { TabView, TabBar, SceneMap } from "react-native-tab-view";
// // const FirstRoute = () => (
// //   <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
// //     <RidesResponse />
// //   </View>
// // );
// // const SecondRoute = () => (
// //   <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
// // )
// class RidesScreen extends Component {
// //   state = {
// //     index: 0,
// //     routes: [
// //       { key: "first", title: "First" },
// //       { key: "second", title: "Second" }
// //     ]
// //   };

//   render() {
//     return (
//       // <View>
//       //   <TabView
//       //     navigationState={{ flex: 1 }}
//       //     renderScene={SceneMap({
//       //       first: FirstRoute,
//       //       second: SecondRoute
//       //     })}
//       //     onIndexChange={index => this.setState({ index })}
//       //     initialLayout={{ width: Dimensions.get("window").width }}
//       //   />
//       // </View>
//       <Container>
//         <Content>
//           {/* Driver side: request from passenger view */}
//           {/* <RidesRquest/> */}
//           {/* Passenger side: verified or unverified response from driver */}
//           <RidesBooked />
//         </Content>
//       </Container>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF"
//   }
// });

// export default RidesScreen;
