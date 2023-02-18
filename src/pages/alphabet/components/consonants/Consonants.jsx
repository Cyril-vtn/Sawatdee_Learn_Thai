import React from "react";

//* IMPORT DES STYLES
import classes from "./Consonants.module.css";

//* IMPORT DES COMPOSANTS
import Tableaux from "./ConsonantsTable";

//* IMPORT DES DONNEES
//! A MODIFIER POUR RECUPERER LES DONNEES DEPUIS FIREBASE
import {
  MiddleConsonants,
  HighConsonants,
  LowConsonants,
} from "./consonantsData";

const Consonants = () => {
  return (
    <div className={classes.consonantContainer}>
      <h2 className={classes.h2}>Les Consonnes</h2>
      <p className={classes.text}>
        L'alphabet est constitué de 44 consonnes qui peuvent être divisées en 3
        classes de tons:
      </p>
      <div className={classes.wrapperConsonantsType}>
        - <span className={classes.span}> consonnes moyennes </span>
        – อักษรกลาง [aksøn klāng] /àk sɔ̌ːn klaːŋ/
        <br />- <span className={classes.span}> consonnes hautes</span> –
        อักษรสูง [aksøn sūng] /àk sɔ̌ːn sǔːŋ/
        <br />- <span className={classes.span}> consonnes basses</span> –
        อักษรต่ำ [aksøn tam] /àk sɔ̌ːn tàm/
      </div>
      <div className={classes.tableWrapper}>
        <Tableaux rows={MiddleConsonants} color={"#0d7cdd"} />
        <Tableaux rows={HighConsonants} color={"#dd0d0d"} />
        <Tableaux rows={LowConsonants} color={"#58cc02"} />
      </div>
    </div>
  );
};

export default Consonants;
