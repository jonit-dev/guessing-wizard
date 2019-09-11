import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../UI/Card.js";
import Input from "../UI/Input.js";
import { Colors, Typography } from "../../constants";
import NumberContainer from "../UI/NumberContainer.js";
import MainButton from "../UI/MainButton.js";

const StartGameScreen = props => {
  const {
    screenContainer,
    screenBtnWrapper,
    btnWrapper,
    featuredTextMargins,
    summaryContainer,
    btnStartGame,
    wizardStyle
  } = styles;

  const {} = props;

  // Hook state ========================================
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    //validate
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber)) {
      Alert.alert("Oops!", "Please, select some  number!", [
        { text: "Okay!", style: "destructive", onPress: resetInputHandler }
      ]);
      return;
    }

    if (chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Oops!", "The selected number should be between 0 and 99!");
      return;
    }

    console.log(`confirming... Inserted number is ${chosenNumber}`);

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");

    console.log(selectedNumber);
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={summaryContainer}>
        <NumberContainer subtitle="Chosen Number">
          {selectedNumber}
        </NumberContainer>

        <View style={btnStartGame}>
          <MainButton onPress={() => props.onStartGame(selectedNumber)}>
            Start Game!
          </MainButton>
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={screenContainer}>
        <Text style={Typography.h1}>Start A New Game</Text>

        <Card>
          <Text style={Typography.p}>Select a number between 0 and 99:</Text>
          <Input
            autoCorrect={false}
            keyboardType="numeric"
            blurOnSubmit
            autoCapitalize="none"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={screenBtnWrapper}>
            <View style={btnWrapper}>
              <Button
                title="Reset"
                onPress={() => resetInputHandler()}
                color={Colors.primary}
              />
            </View>
            <View style={btnWrapper}>
              <Button
                title="Confirm"
                onPress={() => confirmInputHandler()}
                color={Colors.accent}
              />
            </View>
          </View>
        </Card>

        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  wizardStyle: {
    flex: 1,
    width: 200,
    maxHeight: 100,

    resizeMode: "contain",
    marginBottom: 5,
    borderColor: "red",
    borderWidth: 1
  },
  btnStartGame: {
    width: "100%",
    marginTop: 20
  },

  btnWrapper: {
    width: 100
  },

  screenBtnWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  }
});

export default StartGameScreen;
