import React from "react";

//* IMPORT DES STYLES
import classes from "./Vowels.module.css";

//* IMPORT DES COMPOSANTS
import Tableaux from "./VowelsTable";

//* IMPORT DES DONNEES

//! A MODIFIER AFIN DE FETCH LES DONNEES DEPUIS FIREBASE
import {
  ShortVowels,
  LongVowels,
  ShortDiphthongs,
  LongDiphthongs,
} from "../../../../utils/vowelsData";

const Vowels = () => {
  return (
    <div>
      <h2 className={classes.h2}>Les Voyelles</h2>
      <p className={classes.text}>
        Il y a 28 voyelles en thaï, qui peuvent être divisées en voyelles
        simples et en voyelles complexes ou diphtongues (Voyelle qui, au cours
        de son émission, subit une variation de timbre). <br /> Elles peuvent
        également être regroupés en voyelles courtes et voyelles longues. Les
        voyelles peuvent être placés avant, après, au-dessus ou en dessous de la
        lettre de consonne donnée. <br />
        <br />
        Dans le tableau ci-dessous, un tiret indique le placement d'une consonne
        par rapport à une voyelle. Par exemple, pour former un mot en utilisant
        la voyelle - ะ (a), une consonne, telle que ก (k), doit être placée
        devant, nous obtenons donc กะ (ka`).
      </p>

      <div className={classes.tableWrapper}>
        <h3 className={classes.tableText}>Voyelles courtes</h3>
        <div className={classes.tableWrapper}>
          <Tableaux rows={ShortVowels} color={"#774936"} />
        </div>
        <h3 className={classes.tableText}>Voyelles longues</h3>
        <div className={classes.tableWrapper}>
          <Tableaux rows={LongVowels} color={"#774936"} />
        </div>
        <h3 className={classes.tableText}>Diphtongues longues</h3>
        <p className={classes.text}>
          Les voyelles complexes ou diphtongues sont des combinaisons de deux
          voyelles ou plus dans une seule syllabe. Ils peuvent aussi être courts
          et longs. Notez que la plupart des exemples ci-dessous sont des
          syllabes d'entraînement, et non des mots thaïlandais ayant un sens.)
        </p>
        <div className={classes.tableWrapper}>
          <Tableaux rows={LongDiphthongs} color={"#774936"} />
        </div>
        <h3 className={classes.tableText}>Diphtongues courtes</h3>
        <div className={classes.tableWrapper}>
          <Tableaux rows={ShortDiphthongs} color={"#774936"} />
        </div>
      </div>
    </div>
  );
};

export default Vowels;
