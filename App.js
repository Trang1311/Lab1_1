import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  const buttons = [
    "C",
    "DEL",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "=",
  ]

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];
    if (
      lastArr === "/" ||
      lastArr === "*" ||
      lastArr === "-" ||
      lastArr === "+" ||
      lastArr === "."
    ) {
      setCurrentNumber(currentNumber);
      return;
    }
    let result = eval(currentNumber).toString();
    setCurrentNumber(result);
    return;
  }

  function handleInput(buttonPressed) {
    if (
      buttonPressed === "+" ||
      buttonPressed === "-" ||
      buttonPressed === "*" ||
      buttonPressed === "/"
    ) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }
    if (
      buttonPressed === "DEL" ||
      buttonPressed === "C" ||
      buttonPressed === "="
    ) {
      Vibration.vibrate(35);
    }
    switch (buttonPressed) {
      case "DEL":
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "C":
        Vibration.vibrate(35);
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        Vibration.vibrate(35);
        setLastNumber(currentNumber + "=");
        calculator();
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      maxWidth: "100%",
      minHeight: "35%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },

    resultText: {
      maxHeight: 45,
      color: "#00b9d6",
      margin: 15,
      fontSize: 35,
    },

    historyText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
      alignSelf: "flex-end",
    },

    themeButton: {
      alignSelf: "flex-start",
      bottom: "5%",
      margin: 15,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: "100%",
      height: "35%",
      flexDirection: "row",
      flexWrap: "wrap", // Fixed typo: "flexwrap" to "flexWrap"
    },
    button: {
      borderColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "24%",
      minHeight: "54%",
      flex: 2,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 28,
    },
  });

//   const buttons = [
//     { label: "C", type: "special" },
//     { label: "DEL", type: "special" },
//     { label: "/", type: "operator" },
//     { label: "7", type: "number" },
//     { label: "8", type: "number" },
//     { label: "9", type: "number" },
//     { label: "*", type: "operator" },
//     { label: "4", type: "number" },
//     { label: "5", type: "number" },
//     { label: "6", type: "number" },
//     { label: "-", type: "operator" },
//     { label: "1", type: "number" },
//     { label: "2", type: "number" },
//     { label: "3", type: "number" },
//     { label: "+", type: "operator" },
//     { label: "0", type: "number" }, // Numeric buttons
//     { label: ".", type: "special" },
//     { label: "=", type: "special" },
//   ];

//   const handleInput = (buttonPressed) => {
//     if (["+", "-", "*", "/"].includes(buttonPressed)) {
//       Vibration.vibrate(35);
//       setCurrentNumber(currentNumber + buttonPressed);
//     } else if (buttonPressed === "DEL") {
//       Vibration.vibrate(35);
//       setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
//     } else if (buttonPressed === "C") {
//       Vibration.vibrate(35);
//       setLastNumber("");
//       setCurrentNumber("");
//     } else if (buttonPressed === "=") {
//       Vibration.vibrate(35);
//       setLastNumber(currentNumber + "=");
//       calculator();
//     } else {
//       setCurrentNumber(currentNumber + buttonPressed);
//     }
//   };

//   const calculator = () => {
// const lastChar = currentNumber[currentNumber.length - 1];
//     if (["/", "*", "-", "+"].includes(lastChar)) {
//       setCurrentNumber(currentNumber);
//       return;
//     }
//     try {
//       const result = eval(currentNumber).toString();
//       setCurrentNumber(result);
//     } catch (error) {
//       setCurrentNumber("Error");
//     }
//   };

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
            onPress={() => setDarkMode(!darkMode)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
      { buttons.map((button) =>
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#00b9d6'}]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28}]}>{button}</Text>
          </TouchableOpacity>
        :
        button === '.' || button === 'DEL' ?
        <TouchableOpacity key={button} style={[styles.button, {backgroundColor: button === '.' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '37%'}]} onPress={() => handleInput(button)}>
          <Text style={styles.textButton}>{button}</Text>
        </TouchableOpacity>
        :
        button === 'C' ?
        <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%'}]} onPress={() => handleInput(button)}>
          <Text style={styles.textButton}>{button}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed'}]} onPress={() => handleInput(button)}>
          <Text style={styles.textButton}>{button}</Text>
        </TouchableOpacity>
        )}
      </View>
      {/* <View style={styles.buttons}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              button.type === "operator" && styles.operatorButton,
              button.type === "special" && styles.specialButton,
              button.type === "number" && styles.numberButton, // Numeric button style
              darkMode &&
                button.type === "operator" &&
                styles.darkOperatorButton,
              darkMode && button.type === "special" && styles.darkSpecialButton,
              darkMode && button.type === "number" && styles.darkNumberButton, // Dark mode numeric button style
            ]}
            onPress={() => handleInput(button.label)}
          >
            <Text
              style={[
                styles.textButton,
                button.type === "operator" && styles.operatorText,
                button.type === "special" && styles.specialText,
                button.type === "number" && styles.numberText, // Numeric button text style
                darkMode &&
                  button.type === "operator" &&
                  styles.darkOperatorText,
                darkMode && button.type === "special" && styles.darkSpecialText,
                darkMode && button.type === "number" && styles.darkNumberText, // Dark mode numeric button text style
              ]}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
}