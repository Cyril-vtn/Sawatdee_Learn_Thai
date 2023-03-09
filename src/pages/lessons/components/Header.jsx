import React from "react";
import { useNavigate } from "react-router-dom";

// * IMPORT DES STYLES
import classes from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const returnToPath = () => {
    // créé une alert pour confirmer la sortie de la partie en cours
    if (
      window.confirm(
        "Voulez-vous vraiment quitter la leçon ? Votre progression ne sera pas sauvegardée."
      )
    ) {
      // si l'utilisateur confirme, on le redirige vers la page d'accueil
      navigate("/app/learn");
    }
  };
  return (
    <div className={classes.grid}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <button
            data-test="quit-button"
            className={classes.btn}
            onClick={returnToPath}
          ></button>
          <div
            className={classes.progress}
            style={{
              "--web-ui_internal_progress-bar-height": "16px",
              "--web-ui_internal_progress-bar-value": "20%",
            }}
            aria-valuemax="1"
            aria-valuemin="0"
            aria-valuenow="0"
            role="progressbar"
          >
            <div className={classes.background}>
              <div className={classes.ProgressBar}>
                <div className={classes.ProgressBarEffect}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
