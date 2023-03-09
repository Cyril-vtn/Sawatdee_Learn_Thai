import React from "react";
import classes from "./WordBtn.module.css";
const WordBtn = ({ word, id, onClick, disabled, selectedAnswers }) => {
  return (
    <div className={classes.btnContainer}>
      <button
        key={id}
        className={`${classes.btn} ${
          selectedAnswers?.length == 1 ? classes.disabled : ""
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {word}
      </button>
    </div>
  );
};

export default WordBtn;
