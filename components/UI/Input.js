import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = props => {
  const { inputStyle } = styles;
  const { style } = props;

  return <TextInput {...props} style={{ ...inputStyle, ...style }} />;
};

const styles = StyleSheet.create({
  inputStyle: {
    padding: 5,
    borderColor: "silver",
    borderWidth: 1,
    margin: 10,
    width: "100%",
    borderRadius: 5,
    textAlign: "center"
  }
});

export default Input;
