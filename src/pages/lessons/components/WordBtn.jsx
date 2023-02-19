import React from "react";
import classes from "./WordBtn.module.css";
const WordBtn = ({ word, id }) => {
  return (
    <div className={classes.btnContainer}>
      <button className={classes.btn}>span</button>
    </div>
  );
};

export default WordBtn;
