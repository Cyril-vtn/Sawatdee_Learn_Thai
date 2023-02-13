import React from "react";
import classes from "./Tones.module.css";
import Tableaux from "./TonesTable";
import { Tones as Tonalités } from "./TonesData";

const Tones = () => {
  return (
    <div>
      <h2 className={classes.h2}>Les Tonalités</h2>
      <p className={classes.text}>
        Avant d'en savoir plus sur les consonnes et les voyelles thaïlandaises,
        apprenons un peu sur les tons thaïlandais. La langue thaï a cinq tons :
        un ton moyen, bas, descendant, haut et montant.
      </p>
      <div className={classes.tableWrapper}>
        <Tableaux rows={Tonalités} color={"#ffd100"} />
      </div>
    </div>
  );
};

export default Tones;
