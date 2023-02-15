import React from "react";
import classes from "./LessonBtn.module.css";
const LessonBtn = ({ style, color }) => {
  return (
    <div className={classes.pathBtnContainer} style={{ ...style }}>
      <div className={classes.pathBtnWrapper}>
        <div>
          <button className={classes.btn} style={{ ...color }}>
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
              className={classes.img}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonBtn;
