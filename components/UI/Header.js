import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants";

const Header = props => {
  const { headerContainer, headerText } = styles;
  const { title } = props;

  return (
    <View style={headerContainer}>
      <Text style={headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 80,
    paddingTop: 20,
    backgroundColor: Platform.OS === "android" ? Colors.primary : Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default Header;
