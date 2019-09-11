import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "../../constants";

const MainButton = props => {
  const { buttonContainer, button, buttonText } = styles;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={buttonContainer}
      onPress={props.onPress} //forward even to parent component
    >
      <View style={button}>
        <Text style={buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "center"
  }
});

export default MainButton;
