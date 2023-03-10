import React from "react";
import classes from "./Footer.module.css";
const Footer = ({ disabled, onClick }) => {
  return (
    <div className={classes.footer}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${classes.btn} ${disabled ? classes.disabled : ""}`}
      >
        Valider
      </button>
    </div>
  );
};

export default Footer;
