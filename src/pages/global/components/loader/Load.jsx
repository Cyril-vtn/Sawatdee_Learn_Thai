import React from "react";
import classes from "./Load.module.css";
const Load = ({ style }) => {
  return (
    <div className={classes.container}>
      <div className={classes.ldsEllipsis}>
        <div style={{ ...style }}></div>
        <div style={{ ...style }}></div>
        <div style={{ ...style }}></div>
        <div style={{ ...style }}></div>
      </div>
    </div>
  );
};

export default Load;
