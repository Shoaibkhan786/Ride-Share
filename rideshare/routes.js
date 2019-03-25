import React, { Component } from "react";
import { View } from "react-native";
import { Icon } from "native-base";
import {
  Router,
  Scene,
  Stack,
  Lightbox,
  Actions
} from "react-native-router-flux";
import Login from "./src/screens/Login/Login.js";
import VerificationCode from "./src/screens/VerificationCode/VerificationCode.js";
import OfferScreen from "./src/screens/Offer/OfferScreen.js";
import NotificationScreen from "./src/screens/Notification/NotificationScreen.js";
import ProfileScreen from "./src/screens/Profile/ProfileScreen.js";
import SearchScreen from "./src/screens/Search/SearchScreen.js";
import RidesScreen from "./src/screens/Rides/RidesScreen.js";
import OfferedHistory from "./src/screens/History/OfferedHistory.js";
import BookedHistory from   "./src/screens/History/BookedHistory";
import PassengerOrDriver from "./src/screens/PassengerOrDriver/Passenger0rDriver";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import { inject, observer } from "mobx-react";
import SearchList from "./src/screens/Search/SearchList.js";
import SearchRideDetails from "./src/screens/Search/SearchRideDetails.js";
import VerifyToProceed from "./src/screens/Rides/VerifyToProceed.js";
import SignUp from "./src/screens/SignUp/SignUp"
import Splash from "./src/screens/Splash/Splash"
import RidesOffered from  './src/screens/Rides/offeredBooked/RidesOffered';
import RidesBooked from  './src/screens/Rides/offeredBooked/RidesBooked';
import PassengerDetails from './src/screens/Rides/offeredBooked/PassengerDetails'
@inject("store")
@observer
export default class Route extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Stack key="root" modal>
          {/* Splash */}
          <Scene
            key="splash"
            component={Splash}
             initial={true}
            hideNavBar={true}
          />
          {/* Login Screen */}
          <Scene
            key="login"
            component={Login}
            hideNavBar={true}
          />

          {/* SignUp   */}
          <Scene
            key="signUp"
           // initial={true}
            component={SignUp}
            hideNavBar={true}
          />
           {/* Passenger Details   */}
           <Scene
            key="PassengerDetails"
           // initial={true}
           title="Ride Request"
            component={PassengerDetails}
            hideNavBar={false}
          />
          {/* Verification Code Screen */}
          <Scene
            key="VerificationCode"
            component={VerificationCode}
            hideNavBar={true}
          />

          {/* Search List Screen */}
          <Scene key="searchList" component={SearchList} title="FIND A RIDE" />

          {/* Verify To Proceed Screen */}
          <Scene
            key="verifyToProceed"
            component={VerifyToProceed}
            title="VERIFICATION"
            back
            backTitle="Back"
            onBack={() => {
              Actions.pop();
            }}
          />
          {/* Search Ride Details Screen*/}
          <Scene
            key="searchRideDetails"
            title="RIDE DETAILS"
            component={SearchRideDetails}
          />

          {/* Search a Ride Screen */}
          <Scene
            key="searchRide"
            component={SearchScreen}
            title="Search a Ride"
            hideNavBar={false}
          />

          {/* Offer a  ride */}
          <Scene key="offerRide" component={OfferScreen} title="Offer a Ride" />

          {/* Bottom Navigation bar*/}
          <Scene
            key="bottomNav"
            tabs={true}
           // initial={true}
            hideNavBar={true}
            activeTintColor="rgb(52,73,94)"
            tabBarStyle={{ backgroundColor: "white", color: "black" }}
            inactiveBackgroundColor="#ffffff"
          >
            {/* Dashboard Tab */}
            <Scene
              key="dashboardTab"
              icon={() => (
                <TabIcon androidIcon="md-add-circle" iosIcon="ios-add-circle" />
              )}
              tabBarLabel="Dashboard"
              hideNavBar={true}
              titleStyle={{ color: "#FFF" }}
            >
              <Scene
                key="dashboard"
                component={Dashboard}
                //title="Offer Screen Title"
              />
            </Scene>

            {/* Rides Tab : Consists of top nav tabs */}
            <Scene
              key="ridesTab"
              icon={() => <TabIcon androidIcon="md-car" iosIcon="ios-car" />}
              tabBarLabel="Rides"
              titleStyle={{ color: "#FFF" }}
              >
            
              <Scene
                key="ridesNavBar"
                tabs={true}
                hideNavBar={true}
                tabBarPosition={"bottom"}
                activeTintColor="rgb(52,73,94)"
                tabBarStyle={{ backgroundColor: "white", color: "black" }}
                inactiveBackgroundColor="#ffffff"
              >
                {/* Offered Top Nav */}
                <Scene
                  key="offerTabRides"
                  tabBarLabel="Offered Rides"
                  //initial={true}
                  titleStyle={{ color: "#FFF" }}
                >
                  <Scene
                    key="offered"
                    hideNavBar={true}
                    component={RidesOffered}
                    title="Offer Screen"
                  />
                </Scene>
                {/* Booked Top Nav */}
                <Scene
                  key="bookedTabRides"
                  tabBarLabel="Booked Rides"
                  titleStyle={{ color: "#FFF" }}
                >
                  <Scene
                    key="booked"
                    hideNavBar={true}
                    component={RidesBooked}
                    title="Booked Screen"
                  />
                </Scene>
              </Scene>
            </Scene>

            {/* History Tab: Consists of bottom tabs */}
            <Scene
              key="historyTab"
              icon={() => (
                <TabIcon
                  androidIcon="history"
                  iosIcon="history"
                  isType={true}
                />
              )}
              tabBarLabel="History"
              titleStyle={{ color: "#FFF" }}
            >
               <Scene
                key="ridesNavBar"
                // initial={true}
                tabs={true}
                hideNavBar={true}
                tabBarPosition={"bottom"}
                activeTintColor="rgb(52,73,94)"
                tabBarStyle={{ backgroundColor: "white", color: "black" }}
                inactiveBackgroundColor="#ffffff"
              >
                {/* Offered Top Nav */}
                <Scene
                  key="offerTabRides"
                  tabBarLabel="Offered Rides"
                  titleStyle={{ color: "#FFF" }}
                >
                  <Scene
                    key="offered"
                    hideNavBar={true}
                    component={OfferedHistory}
                    title="Offer Screen"
                  />
                </Scene>

                {/* Booked Top Nav */}
                <Scene
                  key="bookedTabRides"
                  tabBarLabel="Booked Rides"
                  titleStyle={{ color: "#FFF" }}
                >
                  <Scene
                    key="booked"
                    hideNavBar={true}
                    component={BookedHistory}
                    title="Booked Screen"
                  />
                </Scene>
              </Scene>
            </Scene>

            {/* Notification Tab */}
            <Scene
              key="notificationTab"
              icon={() => (
                <TabIcon
                  androidIcon="md-notifications-outline"
                  iosIcon="ios-notifications-outline"
                />
              )}
              tabBarLabel="Notification"
              titleStyle={{ color: "#FFF" }}
            >
              <Scene
                key="notification"
                hideNavBar={true}
                component={NotificationScreen}
                title="Notification Screen"
              />
            </Scene>

            {/* Profile Tab */}
            <Scene
              key="profileTab"
              icon={() => (
                <TabIcon androidIcon="md-person" iosIcon="ios-person" />
              )}
              tabBarLabel="Personal"
              titleStyle={{ color: "#FFF" }}
            >
              <Scene
                key="profile"
                hideNavBar={true}
                component={ProfileScreen}
                title="Profile Screen"
              />
            </Scene>
          </Scene>
        </Stack>
      </Router>
    );
  }
}
//Create a dedicated class that will manage the tabBar icon
class TabIcon extends Component {
  render() {
    const color = this.props.focused ? "#28bfcf" : "#9a9a9a";
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          ios={this.props.iosIcon}
          android={this.props.androidIcon}
          type={this.props.isType ? "MaterialIcons" : null}
          style={{ fontSize: 30, color }}
        />
      </View>
    );
  }
}
