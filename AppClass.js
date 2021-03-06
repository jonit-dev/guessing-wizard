import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/UI/Header";
import StartGameScreen from "./components/views/StartGameScreen";
import GameScreen from "./components/views/GameScreen.js";
import GameOverScreen from "./components/views/GameOverScreen.js";

// font loading

import * as Font from "expo-font";
import { AppLoading } from "expo";

class App extends Component {
  state = {
    userNumber: null,
    guessRounds: 0,
    dataLoaded: false
  };

  // Functions ========================================

  startGameHandler(selectedNumber) {
    console.log(`Starting game! selectedNumber=${selectedNumber}`);

    this.setState({ userNumber: selectedNumber });
    this.setState({ guessRounds: 0 });
  }

  gameOverHandler(numOfRounds) {
    console.log(`Setting guessRounds to ${numOfRounds}`);
    this.setState({ guessRounds: numOfRounds });
  }

  configureNewGameHandler() {
    this.setState({
      guessRounds: 0,
      userNumber: null
    });
  }

  render() {
    const { appView } = styles;

    // Main ========================================

    let content = (
      <StartGameScreen
        onStartGame={selectedNumber => startGameHandler(selectedNumber)}
      />
    ); //default view

    if (this.state.userNumber && this.state.guessRounds <= 0) {
      content = (
        <GameScreen
          userChoice={this.state.userNumber}
          onGameOver={numOfRounds => gameOverHandler(numOfRounds)}
        />
      );
    } else if (this.state.guessRounds > 0) {
      content = (
        <GameOverScreen
          userNumber={this.state.userNumber}
          roundsNumber={this.state.guessRounds}
          onStartNewGame={() => configureNewGameHandler()}
        />
      );
    }

    if (!this.state.dataLoaded) {
      return (
        <AppLoading
          startAsync={() => fetchFonts()}
          onFinish={() => this.setState({ dataLoaded: true })}
          onError={err => console.log(err)}
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
}
const styles = StyleSheet.create({
  appView: {
    flex: 1
  }
});
export default App;
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "coming-soon-regular": require("./assets/fonts/ComingSoon-Regular.ttf")
  });
};
