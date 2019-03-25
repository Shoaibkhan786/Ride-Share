import { observable, action, computed } from "mobx";
import { notifications } from "react-native-firebase";
export default class store {

  //Search Ride Details Screen
  @observable
  availSeats=null;
  //Login Screen
  @observable
  phoneNumber;
  @observable
  phoneAuth = null;
  @observable
  signedInUser = null;

  //Verification Screen
  @observable
  firstDigit = null;
  @observable
  secondDigit = null;
  @observable
  thirdDigit = null;
  @observable
  fourthDigit = null;
  @observable
  fifthDigit = null;
  @observable
  sixthDigit = null;

  //Remote Notification data
  @observable
  userContact=null;  
  @observable
  bookingDate=null;
  @observable
  notificationId=null;
// Notification Screen
  @observable
  requestData=null;
  @observable
  bool=true;
  
  //SignUp Screen
  @observable
  imageUri = "null";
  @observable
  firstName = "";
  @observable
  lastName = "";
  @observable
  cnic = ""

  //Profile Screen
  @observable
  profileImage=null;
  @observable
  profileFirstName=null;
  @observable
  profileLastName=null;
  @observable
  contact=null;
  // Offer a ride Screen
  @observable   
  time = null;
  @observable
  date = null;
  @observable
  departure = null;
  @observable
  destination = null;
  @observable
  vModel = "Mehran"; //dumi data 
  @observable
  vColor = "White";
  @observable
  vNumber = "ABCDE";
  @observable
  pricePerSeat = null;
  @observable
  availableSeats = null;
  @observable
  numberPlateImage = null;
  @observable
  liecienceImage = null;
  @observable
  numberPlateImageUri = null;
  @observable
  liecienceImageUri = null;

  //Search Screen
  @observable
  data =[];
  @observable
  passengerDate = null;
  @observable
  passengerDeparture = null;
  @observable
  passengerDestination = null;

  //Rides Screen
  @observable
  driverOfferdRides=null;
  @observable
  isOfferRide = false;
  @observable
  isDialogBarShown = false;
  @observable
  vehicleModel = ""; 
  @observable
  vehicleNumber = "";
  @observable
  vehicleColor = "";

  @observable
  userProfileData = "";

  @observable
  notificationDataObject = [
    { key: require("../asset/image/profile-11.png"), isExpired:true },
    { key: require("../asset/image/profile-2.png"), isExpired:true },
  ]; //notification data object

  //Profile Screen
  @observable
  username = null;

  //Luggage
  @observable
  luggageImage = null;
  @observable
  luggageImageUri = null;

  //CNIC
  @observable
  CNICImage = null;
  @observable
  CNICImageUri = null;

  @action
  setIsOfferRide(value) {
    this.isOfferRide = value;
  }

  @action
  setModelNumber(value) {
    this.vehicleModel = value;
  }

  @action
  setUserProfileData(value) {
    this.userProfileData = value;

    console.log("Objec is set here");
  }

  //set notification data
  @action
  setNotificationDataObject(value) {
    this.notificationDataObject.push(value);
  }
}
