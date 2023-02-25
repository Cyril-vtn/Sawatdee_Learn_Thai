import React from "react";
import classes from "./StatBox.module.css";
const StatBox = ({ img, text, subtitle }) => {
  return (
    <div className={classes.statsBox}>
      <img src={img} alt="" draggable="false" />
      <div className={classes.statsBoxText}>
        <h4>{text}</h4>
        <div>{subtitle}</div>
      </div>
    </div>
  );
};

export default StatBox;
