import React, { Component } from "react";
import { Root } from "native-base";
import Route from "./routes.js";
import { View, AsyncStorage } from "react-native";
import Store from "./src/store/store.js";
import { Provider, inject } from "mobx-react";
import firebase, {
  Notification,
  NotificationOpen
} from "react-native-firebase";
// import firebaseClient from './src/utils/FirebaseClient'

const store = new Store();

export default class App extends Component {
  
//    componentDidMount() {
//     firebase
//       .messaging()
//       .hasPermission()
//       .then(enabled => {
//         if (enabled) {
//           console.log("User is enabled the notification")
//         } else {
//           firebase.messaging().requestPermission()
//           .then(() => {
//             console.log("User is granted the permissions")  
//           })
//           .catch(error => {
//             console.log("User rejected the permissions :"+error);  
//           });
//         }
//       });
//       this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
//         console.log("Notification is being displayed")
//         // Process your notification as required
//         // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//     });
//       this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
//         console.log("I received the notification");
//     });
//     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
//       Actions.notificationTab();
//       // // Get the action triggered by the notification being opened
//       // const action = notificationOpen.action;
//       // // Get information about the notification that was opened
//       // const notification: Notification = notificationOpen.notification;
//   });
//     // // Listen for Notifications
//     // this.notificationDisplayedListener = firebase
//     //   .notifications()
//     //   .onNotificationDisplayed((notification: Notification) => {
//     //     console.log("I received notification :1");
//     //     // Process your notification as required
//     //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//     //   });

//     // this.notificationListener = firebase
//     //   .notifications()
//     //   .onNotification((notification: Notification) => {
//     //     // Process your notification as required
//     //     console.log("I received notification :2");
//     //   });

//     // // Listen for a Notification being opened
//     // this.notificationOpenedListener = firebase
//     //   .notifications()
//     //   .onNotificationOpened((notificationOpen: NotificationOpen) => {
//     //     // Get the action triggered by the notification being opened
//     //     const action = notificationOpen.action;
//     //     // Get information about the notification that was opened
//     //     const notification: Notification = notificationOpen.notification;

//     //     console.log("Message came from firebase console");
//     //   });

//     // // App Closed
//     // const notificationOpen: NotificationOpen = await firebase
//     //   .notifications()
//     //   .getInitialNotification();
//     // if (notificationOpen) {
//     //   // App was opened by a notification
//     //   // Get the action triggered by the notification being opened
//     //   const action = notificationOpen.action;
//     //   // Get information about the notification that was opened
//     //   const notification: Notification = notificationOpen.notification;
//     //   console.log("Notification come when the application is close");
//     // }
//   }
//   componentWillUnmount() {
//     this.notificationDisplayedListener();
//     this.notificationListener();
//     his.notificationOpenedListener();
// }

  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Separate Screen Testing
@inject("store")
class MainView extends Component {
  render() {
    return <Route />;
  }
}
