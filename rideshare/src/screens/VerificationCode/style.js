import { StyleSheet, Dimensions } from "react-native";
//height and width of current screen
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  verificationCodeParent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 12
  },
  verficationCodeEditTextParent: {
    flexDirection: "row",
    width: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  editTextView: {
    marginLeft: 5,
    height: 40,
    width: 40,

    backgroundColor: "white",

    borderRadius: 4,
    elevation: 2,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },

    justifyContent: "center",
    paddingLeft: 12
  }
});
export default styles;
