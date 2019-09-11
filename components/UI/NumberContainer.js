import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Card from "./Card";
import { Colors, Typography } from "../../constants";

const NumberContainer = props => {
  const {
    summaryContainer,
    btnStartGame,
    chosenNumberTextStyle,
    selectedNumberStyle
  } = styles;
  const { children, subtitle } = props;

  return (
    <View style={summaryContainer}>
      <View>
        <Text style={{ ...Typography.featuredText, ...selectedNumberStyle }}>
          {children}
        </Text>
      </View>
      <View>
        <Text style={chosenNumberTextStyle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  selectedNumberStyle: {
    marginTop: 5,
    marginBottom: 20,
    width: "100%",
    fontSize: 45
  },

  chosenNumberTextStyle: {
    width: "100%",
    textAlign: "center",
    color: Colors.accent
  }
});

export default NumberContainer;
