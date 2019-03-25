import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const disabledColor = "#686b78";
const defaultColor = "#000000";

/**
 * isCallToComponentFunction :
 * @ the purpose is to call the component function.
 * @ i want to update total price when check box is checked.
 */
var isCallToComponentFunction = true;

class ItemIncreaseDecrease extends Component {
  constructor() {
    super();
    this.state = {
      itemQuantityRequired: 1, //for  Add on items this is not necessary to be at least one
      isIncreaseDecrease: true
    };
  }

  componentDidUpdate() {
    if (isCallToComponentFunction) {
      this.props.onPressIncrease(this.state.itemQuantityRequired);
    } else {
      this.props.onPressDecrease(this.state.itemQuantityRequired);
    }
  }

  increaseItemQuantity = () => {
    console.log("Kaka");
    this.setState({
      itemQuantityRequired: this.state.itemQuantityRequired + 1,
      isIncreaseDecrease: false
    });
  };

  decreaseItemQuantity = () => {
    if (this.state.itemQuantityRequired > 1) {
      this.setState({
        itemQuantityRequired: this.state.itemQuantityRequired - 1
      });
    }
    if (this.state.itemQuantityRequired === 1) {
      this.setState({
        isIncreaseDecrease: true
      });
    }
  };
  
  render() {
    return (
      <View
        style={{
          borderWidth: 0.5,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
          marginLeft: 8,
          flexDirection: "row",

          borderRadius: 4,
          borderColor: "#ddd",
          borderBottomWidth: 1,
          backgroundColor: "#fff",
          shadowColor: "rgba(0,0,0, .4)", // IOS
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 1, // IOS
          shadowRadius: 1, //IOS
          elevation: 2 // Android
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.decreaseItemQuantity();
            isCallToComponentFunction = false;
          }}
          disabled={this.state.isIncreaseDecrease}
        >
          <Text
            style={{
              color:
                this.state.isIncreaseDecrease ||
                this.state.itemQuantityRequired === 1
                  ? disabledColor
                  : defaultColor,
              fontSize: 16,
              fontFamily: "century-gothic",
              paddingHorizontal: 4
            }}
          >
            {" - "}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#CE2027",
            fontSize: 14,
            fontFamily: "century-gothic",
            paddingHorizontal: 4
          }}
        >
          {this.state.itemQuantityRequired}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.increaseItemQuantity();
            isCallToComponentFunction = true;
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              fontFamily: "century-gothic",
              paddingHorizontal: 4
            }}
          >
            {" + "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ItemIncreaseDecrease.propTypes = {
  onPressIncrease: PropTypes.func,
  onPressDecrease: PropTypes.func
};

export default ItemIncreaseDecrease;
