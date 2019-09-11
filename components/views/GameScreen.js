import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../UI/NumberContainer";
import Card from "../UI/Card.js";
import MainButton from "../UI/MainButton";

// Component ========================================

const GameScreen = props => {
  const { gameScreenContainer, hintBtnWrapper } = styles;
  const { userChoice, onGameOver } = props;

  // Hooks ========================================

  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);

  //use effect runs AFTER every render cycle
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      //means that the game is over
      console.log("Game is over!");
      onGameOver(rounds); //forward amount of rounds it took
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
      : (currentLow.current = currentGuess);

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);

    setRounds(rounds => rounds + 1);
    console.log(`Current number of rounds=${rounds}`);

    console.log(`Next number is ${nextNumber}`);
  };

  return (
    <View style={gameScreenContainer}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={hintBtnWrapper}>
        <MainButton onPress={() => nextGuessHandler("lower")}>Lower</MainButton>
        <MainButton onPress={() => nextGuessHandler("higher")}>
          Higher
        </MainButton>
      </Card>
    </View>
  );
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
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;
