import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import NumberContainer from "../UI/NumberContainer";
import Card from "../UI/Card.js";
import MainButton from "../UI/MainButton";

import { Ionicons } from "@expo/vector-icons";
import GuessListItem from "../UI/GuessListItem";
import Helper from "../../utils/Helper";

// Component ========================================

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const { gameScreenContainer, hintBtnWrapper, listStyle, controls } = styles;
  const { userChoice, onGameOver } = props;

  // Hooks ========================================

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
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

  //use effect runs AFTER every render cycle
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      //means that the game is over
      console.log("Game is over!");
      onGameOver(pastGuesses.length); //forward amount of rounds it took
    }
  }, [currentGuess, userChoice, onGameOver]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = direction => {
    console.log(`nextGuessHandler ==> ${direction}
    currentGuess: ${currentGuess}
    userChoice: ${userChoice}
    `);
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Hey", "Dont lie!");
      return;
    }

    //adjust boundaries
    direction === "lower"
      ? (currentHigh.current = currentGuess)
      : (currentLow.current = currentGuess + 1);

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);

    setRounds(rounds => rounds + 1);

    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);

    console.log(`Current number of rounds=${rounds}`);

    console.log(`Next number is ${nextNumber}`);
  };

  if (Dimensions.get("window").height < 500) {
    return (
      <View style={gameScreenContainer}>
        <Text>Opponent's Guess</Text>

        <View style={controls}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler("higher")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>

        <View style={{ width: "80%", flex: 1 }}>
          <ScrollView contentContainerStyle={listStyle}>
            {pastGuesses.map((guess, i) => {
              const listItemInfo = {
                text: guess,
                round: rounds
              };

              return (
                <GuessListItem
                  key={Helper.guidGenerator()}
                  numRound={listItemInfo.round - i}
                >
                  {listItemInfo.text}
                </GuessListItem>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View style={gameScreenContainer}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={hintBtnWrapper}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton onPress={() => nextGuessHandler("higher")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </Card>

        <View style={{ width: "80%", flex: 1 }}>
          <ScrollView contentContainerStyle={listStyle}>
            {pastGuesses.map((guess, i) => {
              const listItemInfo = {
                text: guess,
                round: rounds
              };

              return (
                <GuessListItem
                  key={Helper.guidGenerator()}
                  numRound={listItemInfo.round - i}
                >
                  {listItemInfo.text}
                </GuessListItem>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
};

// Functions

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude); //try again
  } else {
    return rndNum;
  }
};

// Style

const styles = StyleSheet.create({
  gameScreenContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  hintBtnWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    maxWidth: "80%"
  },
  listStyle: {
    marginTop: 20,
    paddingBottom: 20,
    width: "100%",
    flexGrow: 1, //fix unscrollable list on android
    alignItems: "center",
    justifyContent: "flex-end"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center"
  }
});

export default GameScreen;
