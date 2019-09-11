import React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { Colors, Typography } from "../../constants";
import MainButton from "../UI/MainButton";

const GameOverScreen = props => {
  const {
    gameOverScreenContainer,
    wizardStyle,
    imageContainer,
    gameStatsContainer,
    resultText
  } = styles;
  const { roundsNumber, userNumber } = props;

  return (
    <View style={gameOverScreenContainer}>
      <Text style={Typography.h1}>The game is over!</Text>

      <View style={imageContainer}>
        <Image
          style={wizardStyle}
          source={require("../../assets/images/wizard.png")}
        />
      </View>

      <View style={gameStatsContainer}>
        <Text style={{ ...Typography.p, ...resultText }}>
          The wizard needed <Text style={Typography.featuredText}>XXX</Text>{" "}
          rounds to guess the secret number!
        </Text>

        <Text style={{ ...Typography.p, ...resultText }}>
          Number of Rounds{" "}
          <Text style={Typography.featuredText}>{roundsNumber}</Text>
        </Text>
        <Text style={{ ...Typography.p, ...resultText }}>
          Number was: <Text style={Typography.featuredText}>{userNumber}</Text>
        </Text>
      </View>

      <MainButton onPress={() => props.onStartNewGame()}>New Game</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  gameOverImageContainer: {
    flex: 1,
    height: 100,
    width: "100%"
  },

  resultText: {
    textAlign: "center",
    marginBottom: 10
  },

  gameStatsContainer: {
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: "center"
  },

  gameOverScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  gameOverImage: {
    width: "100%",
    resizeMode: "contain",
    height: "100%",
    flex: 1
  },
  imageContainer: {
    width: "80%",
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 30,
    maxHeight: "50%",
    backgroundColor: "purple"
  },
  wizardStyle: {
    // flex: 1,
    // width: 200,
    // maxHeight: 100,
    resizeMode: "cover",
    // marginBottom: 5
    width: "80%",
    height: 300
  }
});

export default GameOverScreen;
