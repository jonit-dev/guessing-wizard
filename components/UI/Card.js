import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Card = props => {
  const { cardContainer } = styles;
  const { children, style } = props;

  return <View style={{ ...cardContainer, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    width: 300,
    maxWidth: "80%",
    alignItems: "center",

    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  }
});

export default Card;
