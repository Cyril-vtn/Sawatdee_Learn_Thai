import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//  firebase import
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

//css import
import classes from "./LoginModal.module.css";

// img import
import closeBtn from "../../../assets/closeBtn.svg";

// component import
import Bouton from "../../UI/Bouton";
import Load from "../../UI/Load";

// import du context
import { UserAuth } from "../../../context/AuthContext";

const LoginModal = () => {
  // useNvigate pour géré la navigation du site (voir import si besoin)
  const navigate = useNavigate();

  // gestion des input avec useState avec React
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Récupération des function du context (voir import si besoin)
  const { signIn, user } = UserAuth();

  // submit fonction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // trigger l'apparition du loader
    setLoading(true);

    // try catch pour executer la fonction et géré les erreurs
    try {
      await signIn(email, password);
      setLoading(false);
      navigate("/learn");
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/wrong-password") {
        setError("Mot de passe incorrect");
        setLoading(false);
        return;
      }
      if (err.code === "auth/user-not-found") {
        setError("Adresse mail introuvable");
        setLoading(false);
        return;
      }
      setError("Une erreur est survenue");
      setLoading(false);
    }
  };

  // rendu du composant
  return (
    <div className={classes.registerModal}>
      <div className={classes.registerModalContainer}>
        {/* Btn pour revenir à la page d'acceuil */}
        <Link className={classes.closeBtn} to="/">
          <img src={closeBtn} alt="" />
        </Link>

        {/* composant Btn pour aller à la page register */}
        <Bouton
          link="/register"
          text="s'incrire !"
          classes={classes.loginBtn}
        />

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit}>
          <div className={classes.formContainer}>
            <h1 className={classes.title}>Se connecter</h1>

            {/* GESTION DE L'ERREUR  */}
            {error ? <h3 className={classes.h3}>{error}</h3> : null}
            <div className={classes.inputWrapper}>
              {/* EMAIL  */}
              <div className={classes.inputContainer}>
                <label className={classes.Label}>
                  <div className={classes.inputContent}>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="E-mail *"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              {/* MOT DE PASSE  */}
              <div className={classes.inputContainer}>
                <label htmlFor="" className={classes.Label}>
                  <div className={classes.inputContent}>
                    <input
                      required
                      type="password"
                      autoComplete="current-password"
                      aria-autocomplete="list"
                      placeholder="Mot de passe *"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </label>
              </div>
            </div>
            <button
              type="submit"
              // Passage en mode disable pour eviter les multiple creation d'utilisateurs
              disabled={loading ? true : false}
              className={`${classes.nextStepBtn} bouton`}
            >
              {/* Géré l'apparition du composant Load si le state Loading est true */}
              {!loading ? "C'est parti !" : <Load />}
            </button>
            <div className={classes.stroke}>
              <div></div>
            </div>
          </div>
          <div className={classes.termsWrapper}>
            <div className={classes.termContainer}>
              <span>
                En te connectant à Sawatdee, tu acceptes nos
                <a href="#"> Conditions d'utilisation </a>
                et notre
                <a href="#"> Politique de confidentialité</a>.
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
