import React, { useState } from "react";
import Button from "./Button";

const Form = (props) => {
  const [enteredInput, setEnteredInput] = useState("");

  const onChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    props.onClaculate(enteredInput);

    setEnteredInput("");
  };

  const onClearHandler = () => {
    setEnteredInput("");
    props.onClearResult();
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmitHandler}>
        <input
          className="form-input clear"
          onChange={onChangeHandler}
          type="text"
          value={props.result ? props.result : enteredInput}
          placeholder="Enter the operand and operator: 2,6,5,5,4,*,-,+"
        ></input>
      </form>
      <div className="buttons">
        <Button onClick={onClearHandler}>Clear</Button>
        <Button type="submit" onClick={onSubmitHandler}>
          Compute
        </Button>
      </div>
    </div>
  );
};

export default Form;
