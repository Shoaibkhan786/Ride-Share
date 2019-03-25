import functions from "firebase-functions";
import admin from "firebase-admin";


// export default databaseReference = firebase.initializeApp({
//     apiKey: "AIzaSyABg2tWHrxv1HDF8M1OCiXLdWlkXG1dlYs",
//     authDomain: "ride-share-2434b.firebaseapp.com",
//     databaseURL: "https://ride-share-2434b.firebaseio.com",
//     projectId: "ride-share-2434b",
//     storageBucket: "ride-share-2434b.appspot.com",
//  })

// initializes your application
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firebase.ref('/offerRides/+923454080247/2018-11-23')
.onWrite((change, context) => {
    // Only edit data when it is first created.
    if (change.before.exists()) {
      return null;
    }
    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return null;
    }
    // Grab the current value of what was written to the Realtime Database.
    const original = change.after.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    // return change.after.ref.parent.child('uppercase').set(uppercase);

    console.log("Change before: "+change.before.val());
    console.log("Change after: "+change.after.val());
  
    // gets standard JavaScript object from the new write
    // const writeData = event.data.data();
    // access data necessary for push notification 
    // const sender = writeData.uid;
    // const senderName = writeData.name;
    // const recipient = writeData.recipient;
    // the payload is what will be delivered to the device(s)
    let payload = {
      notification: {
      title: "Ride Share with Badar",
      body: "Hi, I'm Badar Shahzad, You have booked me for Islamabad To Mianwali.",
      sound: "default"
     }
    }

    // either store the recepient tokens in the document write
    const tokens = writeData.tokens;  
    
    // // or collect them by accessing your database
    // var pushToken = "";
    // return functions.
    // firebase.ref('/offerRides/+923454080247/2018-11-23')
    //   .get()
    //   .then(doc => {
    //      pushToken = doc.data().token;
    //      // sendToDevice can also accept an array of push tokens
    //      return admin.messaging().sendToDevice("pushToken", payload);
    //   });

    return admin.messaging().sendToDevice("pushToken", payload);
});
