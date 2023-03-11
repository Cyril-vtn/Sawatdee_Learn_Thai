import React from "react";
import classes from "./Error.module.css";
import errorFace from "../../../assets/svg/errorFace.svg";
import { NavLink } from "react-router-dom";
const Error = () => {
  return (
    <div className={classes.errorContainer}>
      <div className={classes.titleContainer}>
        <h1>OUPS...</h1>
        <p>Je pense que vous vous êtes perdu !</p>
      </div>
      <div className={classes.imageContainer}>
        <img src={errorFace} alt="" />
      </div>
      <div className={classes.btnContainer}>
        <NavLink to="app/learn" className={`btnStyle ${classes.btn}`}>
          REVENIR A L'ACCUEIL
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
