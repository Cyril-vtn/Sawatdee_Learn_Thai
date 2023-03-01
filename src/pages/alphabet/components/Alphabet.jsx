import React from "react";

//* IMPORT DES STYLES
import classes from "./Alphabet.module.css";

//* IMPORT DES COMPOSANTS
import BackToTopBtn from "../../../components/backToTopBtn/index";
import Header from "./header/Header";
import Consonnes from "./consonants/Consonants";
import Tons from "./tones/Tones";
import Vowels from "./vowels/Vowels";

const Alphabet = () => {
  return (
    <div className={classes.alphabetContainer}>
      <div className={classes.wrapper}>
        <Header />
        <Tons />
        <Consonnes />
        <Vowels />
      </div>
      <BackToTopBtn />
    </div>
  );
};

export default Alphabet;
