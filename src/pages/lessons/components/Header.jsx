import React from "react";

// * IMPORT DES STYLES
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.grid}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <button data-test="quit-button" className={classes.btn}></button>
          <div
            className={classes.progress}
            style={{
              "--web-ui_internal_progress-bar-height": "16px",
              "--web-ui_internal_progress-bar-value": "20%",
            }}
            aria-valuemax="1"
            aria-valuemin="0"
            aria-valuenow="0"
            role="progressbar"
          >
            <div className={classes.background}>
              <div className={classes.ProgressBar}>
                <div className={classes.ProgressBarEffect}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
