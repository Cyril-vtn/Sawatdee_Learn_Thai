import React, { useState } from "react";

//* IMPORT DE REACT ROUTER
import { Link, useNavigate } from "react-router-dom";

//* IMPORT DES STYLES
import classes from "./LoginModal.module.css";

//* IMPORT DES COMPOSANTS
import Bouton from "../../../pages/global/components/button/Bouton";
import Load from "../../global/components/loader/Load";

//* IMPORT DES IMAGES
import closeBtn from "../../../assets/svg/closeBtn.svg";

//* IMPORT DU CONTEXT
import { UserAuth } from "../../../context/AuthContext";

const LoginModal = () => {
  //* hook pour naviguer entre les pages
  const navigate = useNavigate();

  //* CREATION DES ETATS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //* RECUPERATION DE LA FONCTION DE CONNEXION DU CONTEXTE
  const { signIn } = UserAuth();

  //* CREATION DE LA FONCTION POUR GERER LA SOUMISSION DU FORMULAIRE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    //* vérification des champs

    if (password === "" || email === "") {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }
    const isValidEmail =
      /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/.test(email);
    if (!isValidEmail) {
      setError("L'adresse email n'est pas valide");
      return;
    }

    //* AJOUT D'UN DELAY POUR EVITER LES MULTIPLE CREATION D'UTILISATEURS
    setTimeout(async () => {
      try {
        await signIn(email, password);
        setLoading(false);
        navigate("/app/learn");
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
    }, 1000);
  };

  //* CREATION DU JSX
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
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
                        setPassword(e.target.value);
                        setError("");
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
