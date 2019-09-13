import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  ScrollView
} from "react-native";
import { Colors, Typography } from "../../constants";
import MainButton from "../UI/MainButton";
import Helper from "../../utils/Helper.js";

const GameOverScreen = props => {
  const {
    gameOverScreenContainer,
    wizardStyle,
    imageContainer,
    gameStatsContainer,
    resultText
  } = styles;
  const { roundsNumber, userNumber } = props;

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );

  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  //Helper function to update device width and height on device changes
  Helper.updateOnOrientationChanges(
    Dimensions,
    setDeviceWidth,
    setDeviceHeight,
    useEffect
  );

  return (
    <ScrollView>
      <View style={gameOverScreenContainer}>
        <Text style={Typography.h1}>The game is over!</Text>

        <View
          style={{
            ...imageContainer,
            ...{
              width: deviceWidth * 0.7,
              height: deviceWidth * 0.7,
              borderRadius: (deviceWidth * 0.7) / 2,
              marginVertical: deviceHeight / 30
            }
          }}
        >
          <Image
            style={wizardStyle}
            source={require("../../assets/images/wizard.png")}
          />
        </View>

        <View
          style={{
            ...gameStatsContainer,
            ...{ marginVertical: deviceHeight / 60 }
          }}
        >
          <Text style={{ ...Typography.p, ...resultText }}>
            The wizard needed{" "}
            <Text style={Typography.featuredText}>{roundsNumber}</Text> rounds
            to guess the secret number!
          </Text>

          <Text style={{ ...Typography.p, ...resultText }}>
            Number of Rounds{" "}
            <Text style={Typography.featuredText}>{roundsNumber}</Text>
          </Text>
          <Text style={{ ...Typography.p, ...resultText }}>
            Number was:{" "}
            <Text style={Typography.featuredText}>{userNumber}</Text>
          </Text>
        </View>

        <MainButton onPress={() => props.onStartNewGame()}>New Game</MainButton>
      </View>
    </ScrollView>
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
    borderWidth: 3,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",

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
