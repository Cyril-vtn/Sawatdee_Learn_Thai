import React, { useState } from "react";

//* IMPORT DES REACT ROUTER
import { Link, useNavigate } from "react-router-dom";

//* IMPORT DES STYLES
import classes from "./RegisterModal.module.css";
import "../../../pages/global/components/button/Bouton.css";

//* IMPORT DES IMAGES
import closeBtn from "../../../assets/svg/closeBtn.svg";

//* IMPORT DES COMPOSANTS
import Bouton from "../../../pages/global/components/button/Bouton";
import Load from "../../global/components/loader/Load";

//* IMPORT DU CONTEXT
import { UserAuth } from "../../../context/AuthContext";

const RegisterModal = () => {
  //* hook pour naviguer entre les pages
  const navigate = useNavigate();

  //* CREATION DES ETATS
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //* RECUPERATION DE LA FONCTION DE CONNEXION DU CONTEXTE
  const { createUser, user } = UserAuth();

  //* CREATION DE LA FONCTION POUR GERER LA SOUMISSION DU FORMULAIRE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //* vérification des champs
    if (
      password === "" ||
      email === "" ||
      pseudo === "" ||
      confirmedPassword === ""
    ) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    // * LE PSEUDO NE DOIT PAS CONTENIR DE CARACTERE SPECIAUX NI D'ESPACE

    const isValidPseudo = /^[a-zA-Z0-9]+$/.test(pseudo);
    if (!isValidPseudo) {
      setError(
        "Le pseudo ne doit pas contenir d'espace ou de caractères spéciaux"
      );
      return;
    }

    if (password !== confirmedPassword) {
      setError("Le mot de passe doit être identique");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    const isValidEmail =
      /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/.test(email);
    if (!isValidEmail) {
      setError("L'adresse email n'est pas valide");
      return;
    }
    setLoading(true);

    try {
      await createUser(email, password, pseudo);
      setLoading(false);
      navigate("/app/learn");
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

  //* CREATION DU JSX
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
                      type="text"
                      autoComplete="name"
                      placeholder="Pseudo *"
                      onChange={(e) => {
                        setError("");
                        setPseudo(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setError("");
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </label>
              </div>

              {/* MOT DE PASSE  */}
              <div className={classes.inputContainer}>
                <label htmlFor="" className={classes.Label}>
                  <div className={classes.inputContent}>
                    <input
                      type="password"
                      autoComplete="current-password"
                      aria-autocomplete="list"
                      placeholder="Mot de passe *"
                      onChange={(e) => {
                        setError("");
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </label>
              </div>

              {/* CONFIRMATION DE MOT DE PASSE  */}
              <div className={classes.inputContainer}>
                <label htmlFor="" className={classes.Label}>
                  <div className={classes.inputContent}>
                    <input
                      type="password"
                      autoComplete="current-password"
                      aria-autocomplete="list"
                      placeholder="Confirmer le mot de passe *"
                      onChange={(e) => {
                        setError("");
                        setConfirmedPassword(e.target.value);
                      }}
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
