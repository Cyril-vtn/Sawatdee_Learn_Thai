import React from "react";
import classes from "./Alphabet.module.css";
import Tableaux from "../../global/components/tableaux/Tableaux";
import {
  MiddleConsonants,
  HighConsonants,
  LowConsonants,
} from "../../global/components/tableaux/TableauxData";
import BackToTopBtn from "../../global/components/backToTopBtn/index";
const Alphabet = () => {
  return (
    <div className={classes.alphabetContainer}>
      <div className={classes.wrapper}>
        <header>
          <h1 className={classes.h1}>L'alphabet en thaï</h1>
          <p className={classes.headerText}>
            Apprendre l'alphabet en thaï est très important, parce que la
            pronunciation est utilisée dans toutes les conversations
            quotidiennes. La seule solution est de maîtriser la façon de
            prononcer les mots pour être en mesure de parler la langue
            couramment.
            <br />
            L'alphabet est constitué de 44 consonnes qui peuvent être divisées
            en 3 classes de tons:
            <br />
            <br />- <span className={classes.span}> consonnes moyennes </span>
            – อักษรกลาง [aksøn klāng] /àk sɔ̌ːn klaːŋ/
            <br />- <span className={classes.span}> consonnes hautes</span> –
            อักษรสูง [aksøn sūng] /àk sɔ̌ːn sǔːŋ/
            <br />- <span className={classes.span}> consonnes basses</span> –
            อักษรต่ำ [aksøn tam] /àk sɔ̌ːn tàm/
          </p>
        </header>
        <div className={classes.tableWrapper}>
          <Tableaux rows={MiddleConsonants} color={"#0d7cdd"} />
          <Tableaux rows={HighConsonants} color={"#dd0d0d"} />
          <Tableaux rows={LowConsonants} color={"#58cc02"} />
        </div>
      </div>
      <BackToTopBtn />
    </div>
  );
};

export default Alphabet;
