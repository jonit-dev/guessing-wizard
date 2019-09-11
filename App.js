import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/UI/Header";
import StartGameScreen from "./components/views/StartGameScreen";
import GameScreen from "./components/views/GameScreen.js";
import GameOverScreen from "./components/views/GameOverScreen.js";

// font loading

import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "coming-soon-regular": require("./assets/fonts/ComingSoon-Regular.ttf")
  });
};

export default function App() {
  const { appView } = styles;

  // Hooks ========================================

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={() => fetchFonts()}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  // Functions ========================================

  const startGameHandler = selectedNumber => {
    console.log(`Starting game! selectedNumber=${selectedNumber}`);
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    console.log(`Setting guessRounds to ${numOfRounds}`);
    setGuessRounds(numOfRounds);
  };

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  // Main ========================================

  let content = (
    <StartGameScreen
      onStartGame={selectedNumber => startGameHandler(selectedNumber)}
    />
  ); //default view

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNumber}
        onGameOver={numOfRounds => gameOverHandler(numOfRounds)}
      />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={() => configureNewGameHandler()}
      />
    );
  }

  return (
    <View style={appView}>
      <Header title="Guess a Number!" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  appView: {
    flex: 1
  }
});
