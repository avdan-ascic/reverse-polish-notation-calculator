import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState("");

  const calculateHandler = (inputValue) => {
    if (!inputValue) {
      setErrorMessage("You did not enter anything!");
    } else if (result) {
      setErrorMessage("Only numbers and aritmetic operators are valid");
    } else {
      let validInput = true;
      let inputArr = inputValue.split(",");
      let numberOfOperands = 0;
      let numberOfOperators = 0;
      for (let i = 0; i < inputArr.length; i++) {
        let element = inputArr[i];
        if (!isNaN(element)) {
          numberOfOperands++;
        } else if (
          element === "+" ||
          element === "-" ||
          element === "*" ||
          element === "/"
        ) {
          numberOfOperators++;
        } else {
          validInput = false;
          break;
        }
      }

      if (validInput) {
        if (numberOfOperands - 1 !== numberOfOperators) {
          if (numberOfOperands > numberOfOperators + 1) {
            setErrorMessage("Something went wrong! Check number of OPERANDS");
          } else {
            setErrorMessage("Something went wrong! Check number of OPERATORS");
          }
        } else {
          setErrorMessage("");
          let stack = [];
          for (let i = 0; i < inputArr.length; i++) {
            let element = inputArr[i];
            if (!isNaN(element)) {
              stack.push(parseFloat(element));
            } else {
              let a = stack.pop();
              let b = stack.pop();
              let result = 0;
              switch (element) {
                case "+":
                  result = a + b;
                  break;
                case "-":
                  result = a - b;
                  break;
                case "*":
                  result = a * b;
                  break;
                case "/":
                  result = a / b;
                  break;
                default:
                  break;
              }
              stack.push(result);
            }
          }
          setResult(`${inputValue} = ${stack[0].toFixed(2)}`);
        }
      } else {
        setErrorMessage("Only numbers and arithmetic operators are valid");
      }
    }
  };

  const ClearResultHandler = () => {
    setResult();
  };

  return (
    <div className="container">
      <Header />
      <div className="section-form">
        <Form
          onClaculate={calculateHandler}
          result={result}
          onClearResult={ClearResultHandler}
        />
        <div className="error-message clear">
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
