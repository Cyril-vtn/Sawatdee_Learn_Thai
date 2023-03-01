import React from "react";

//* IMPORT DES STYLES
import classes from "./Tones.module.css";

//* IMPORT DES COMPOSANTS
import Tableaux from "./TonesTable";

//* IMPORT DES DONNEES
//! A MODIFIER POUR RECUPERER LES DONNEES DEPUIS FIREBASE
import { Tones as Tonalités } from "../../../../utils/TonesData";

const Tones = () => {
  return (
    <div>
      <h2 className={classes.h2}>Les Tonalités</h2>
      <p className={classes.text}>
        Avant d'en savoir plus sur les consonnes et les voyelles thaïlandaises,
        apprenons un peu sur les tonalités en thaï. La langue thaï a cinq tons :
        moyen, bas, descendant, haut et montant.
      </p>
      <div className={classes.tableWrapper}>
        <Tableaux rows={Tonalités} color={"#ffd100"} />
      </div>
    </div>
  );
};

export default Tones;
