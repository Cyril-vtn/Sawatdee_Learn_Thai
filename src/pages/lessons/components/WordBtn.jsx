import React from "react";
import classes from "./WordBtn.module.css";
const WordBtn = ({ word, id }) => {
  return (
    <div className={classes.btnContainer}>
      <button
        key={id}
        // disabled
        className={classes.btn}
      >
        {word}
      </button>
    </div>
  );
};

export default WordBtn;
