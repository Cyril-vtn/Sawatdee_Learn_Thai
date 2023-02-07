import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//  firebase import
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

//css import
import classes from "./RegisterModal.module.css";
import "../../../pages/global/components/button/Bouton.css";

// img import
import closeBtn from "../../../assets/svg/closeBtn.svg";

// components import
import Bouton from "../../../pages/global/components/button/Bouton";
import Load from "../../global/components/loader/Load";

// import du context
import { UserAuth } from "../../../context/AuthContext";

const RegisterModal = () => {
  // useNvigate pour géré la navigation du site (voir import si besoin)
  const navigate = useNavigate();

  // gestion des input avec useState avec React
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Récupération des function du context (voir import si besoin)
  const { createUser, user } = UserAuth();

  // submit fonction en async
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // gestion des erreurs des inputs
    if (password !== confirmedPassword) {
      setError("Le mot de passe doit être identique");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    // trigger l'apparition du loader
    setLoading(true);

    // try catch pour executer la fonction et géré les erreurs
    try {
      await createUser(email, password, name);
      setLoading(false);
      navigate("/learn");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Adresse email déjà utilisé");
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

        {/* composant Btn pour aller à la page de login */}
        <Bouton link="/login" text="Connexion" classes={classes.loginBtn} />

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit}>
          <div className={classes.formContainer}>
            <h1 className={classes.title}>S'inscrire</h1>

            {/* GESTION DE L'ERREUR  */}
            {error ? <h3 className={classes.h3}>{error}</h3> : null}

            <div className={classes.inputWrapper}>
              {/* NAME  */}
              <div className={classes.inputContainer}>
                <label className={classes.Label}>
                  <div className={classes.inputContent}>
                    <input
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Prénom *"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              {/* EMAIL INPUT */}
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

              {/* CONFIRMATION DE MOT DE PASSE  */}
              <div className={classes.inputContainer}>
                <label htmlFor="" className={classes.Label}>
                  <div className={classes.inputContent}>
                    <input
                      required
                      type="password"
                      autoComplete="current-password"
                      aria-autocomplete="list"
                      placeholder="Confirmer le mot de passe *"
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <button
                type="submit"
                // Passage en mode disable pour eviter les multiple creation d'utilisateurs
                disabled={loading ? true : false}
                className={`${classes.nextStepBtn} bouton`}
              >
                {/* Géré l'apparition du composant Load si le state Loading est true */}
                {!loading ? "C'est parti !" : <Load />}
              </button>
            </div>
            <div className={classes.stroke}>
              <div></div>
            </div>
          </div>
          <div className={classes.termsWrapper}>
            <div className={classes.termContainer}>
              <span>
                En te t'inscrivant à Sawatdee, tu acceptes nos
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

export default RegisterModal;
