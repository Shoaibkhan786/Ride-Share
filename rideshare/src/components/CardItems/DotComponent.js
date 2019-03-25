import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";

export default class DotCompnent extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.outerCircle,
          { alignItems: "center", justifyContent: "center" }
        ]}
      >
        <View
          style={[
            styles.innerCircle,
            { alignItems: "center", justifyContent: "center" }
          ]}
        >
          <View style={styles.innerMostCircle} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    outerCircle: {
        borderRadius: 24,
        width: 12,
        height: 12,
        backgroundColor: "rgb(52,73,94)"
      },
      innerCircle: {
        borderRadius: 16,
        width: 8,
        height: 8,
        backgroundColor: "white"
      },
      innerMostCircle: {
        borderRadius: 8,
        width: 4,
        height: 4,
        backgroundColor: "rgb(52,73,94)"
      }
});
