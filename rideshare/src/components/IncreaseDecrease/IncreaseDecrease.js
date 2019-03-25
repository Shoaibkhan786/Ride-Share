import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import * as NB from "native-base";

const disabledColor = "#686b78";
const defaultColor = "#000000";

/**
 * isCallToComponentFunction :
 * @ the purpose is to call the component function.
 * @ i want to update total price when check box is checked.
 */
var isCallToComponentFunction = true;

class IncreaseDecrease extends Component {
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
    if (this.state.itemQuantityRequired < this.props.limit) {
      this.setState({
        itemQuantityRequired: this.state.itemQuantityRequired + 1,
        isIncreaseDecrease: false
      });
    }
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
          flexDirection: "row",
          alignItems: "center",
          // borderWidth: 0.5,
          // shadowOffset: { width: 0, height: 2 },
          // shadowRadius: 2,
          // borderRadius: 4,
          // borderColor: "white",
          // backgroundColor: "white",
          // shadowColor: "rgba(0,0,0, .4)", // IOS
          // shadowOffset: { height: 1, width: 1 }, // IOS
          // shadowOpacity: 1, // IOS
          // shadowRadius: 1, //IOS
          // elevation: 2, // Android
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.decreaseItemQuantity();
            isCallToComponentFunction = false;
          }}
          disabled={this.state.isIncreaseDecrease}
          style={{ marginRight: 16 }}
        >
          <NB.Icon
            name="minus-circle-outline"
            style={{ color: "rgb(52,73,94)" }}
            type="MaterialCommunityIcons"
          />
        </TouchableOpacity>
        <NB.Text
          style={{
            fontSize: 32,
            paddingHorizontal: 4,
            margin: 4
          }}
        >
          {this.state.itemQuantityRequired}
        </NB.Text>
        <TouchableOpacity
          onPress={() => {
            this.increaseItemQuantity();
            isCallToComponentFunction = true;
          }}
          style={{ marginLeft: 16 }}
        >
          <NB.Icon
            name="plus-circle-outline"
            style={{ color: "rgb(52,73,94)" }}
            type="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

IncreaseDecrease.propTypes = {
  onPressIncrease: PropTypes.func,
  onPressDecrease: PropTypes.func
};

export default IncreaseDecrease;
