import React from "react";

//* IMPORT DES STYLES
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <h1 className={classes.h1}>L'alphabet en thaï</h1>
      <p className={classes.headerText}>
        Apprendre l'alphabet en thaï est très important, parce que la
        pronunciation est utilisée dans toutes les conversations quotidiennes.
        La seule solution est de maîtriser la façon de prononcer les mots pour
        être en mesure de parler la langue couramment.
      </p>
    </header>
  );
};

export default Header;
