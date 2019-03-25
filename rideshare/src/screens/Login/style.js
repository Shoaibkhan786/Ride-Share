import {
    StyleSheet,
    Dimensions
} from "react-native";
//height and width of current screen
let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    color: {
        color: 'white'
    }
});
export default styles;