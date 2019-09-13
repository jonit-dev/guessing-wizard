import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
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
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  //you have to add these orientation listeners into useEffect to prevent stacking of Dimensions.addEventListener
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
      console.log("rotating device... => updating layout!");
    };

    //Listening to device orientation changes!
    Dimensions.addEventListener("change", updateLayout);

    //this is the use effect "clean up" function. It prevents addEventlistener from stacking

    return () => {
      console.log("cleaning rotate event listeners...");
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={screenContainer}>
            <Text style={Typography.h1}>Start a New Game</Text>

            <Card>
              <Text style={Typography.p}>
                Select a number between 0 and 99:
              </Text>
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
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={() => resetInputHandler()}
                    color={Colors.primary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
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
      </KeyboardAvoidingView>
    </ScrollView>
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

  screenBtnWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  }
});

export default StartGameScreen;
