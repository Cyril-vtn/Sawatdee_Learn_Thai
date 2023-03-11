import React from "react";
import classes from "./Modal.module.css";
import "../../index.css";
const Modal = ({
  correct,
  exemple,
  showModal,
  helper,
  onClick,
  index,
  error,
}) => {
  return (
    <div
      className={classes.modal}
      style={{
        backgroundColor: correct ? "rgb( 88, 167, 0)" : "rgb(255, 75, 75)",
        bottom: showModal ? "0px" : "-300px",
      }}
    >
      <div className={classes.modalContent}>
        <h1 className={classes.title}>
          {correct ? "BONNE RÉPONSE !" : "MAUVAISE RÉPONSE "}
        </h1>
        {!helper ? null : <p className={classes.text}>{helper}</p>}
        {index === 5 && error === 0 && showModal ? (
          <p className={`${classes.withoutError} ${classes.text}`}>
            Bravo ! Vous avez réussi un sans faute !!
          </p>
        ) : null}
        <p className={classes.text}>
          N'oubliez pas d'ajouter
          <strong> ("ครับ" krap pour les hommes) </strong>
          ou <strong>("ค่ะ" kâ pour les femmes)</strong> à la fin des phrase en
          signe de politesse !
        </p>
        {exemple ? (
          <p className={classes.text}>{`Exemple: ${exemple}`}</p>
        ) : null}

        {index === 5 ? (
          <p
            style={{
              bottom: showModal ? "200px" : "0",
              display: showModal ? "block" : "none",
            }}
            className={`${classes.text} ${classes.xpText}`}
          >
            Xp gagné 50{error === 0 ? " + 25 (bonus de sans faute)" : ""}
          </p>
        ) : null}
        <button className={classes.btn} onClick={onClick}>
          {index === 5 ? "QUITTER" : "SUIVANT"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
