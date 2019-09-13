import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

const GuessListItem = props => {
  const {
    guessListItemContainer,
    guessListItemText,
    itemStyle,
    iconStyle
  } = styles;

  return (
    <View style={guessListItemContainer}>
      <View style={iconStyle}>
        <EvilIcons name="arrow-right" size={24} color="gray" />
      </View>
      <Text style={guessListItemText}>
        # {props.numRound} - {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  guessListItemContainer: {
    // width: "100%",
    width: Dimensions.get("window").width > 500 ? "60%" : "80%",
    marginVertical: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50
  },
  guessListItemText: {
    textAlign: "center",
    flex: 1
  }
});

export default GuessListItem;
