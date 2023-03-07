import React from "react";
import classes from "./WordBtn.module.css";
const WordBtn = ({ word, id, onClick, disabled }) => {
  return (
    <div className={classes.btnContainer}>
      <button
        key={id}
        // disabled
        className={classes.btn}
        onClick={onClick}
        disabled={disabled}
      >
        {word}
      </button>
    </div>
  );
};

export default WordBtn;
