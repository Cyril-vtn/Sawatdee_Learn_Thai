import React, { useEffect, useState } from "react";

// import du context pour récupérer les données de l'utilisateur
import { UserAuth } from "../../../context/AuthContext";

// IMPORT CSS
import classes from "./settings.module.css";

const Settings = () => {
  // * RECUPERATION DE L'UTILISATEUR
  const {
    user,
    deleteUserPerma,
    changeProfilePic,
    error,
    setError,
    updateUser,
  } = UserAuth();

  const [input, setInput] = useState({
    photo: "",
    pseudo: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(true); // nouvel état pour le bouton
  useEffect(() => {
    setInput({
      photo: "aucun fichier sélectionné",
    });
    setError("");
    // utiliser useEffect pour récupérer les données de l'utilisateur et les mettre dans le state input
    if (user) {
      setInput({
        photo: user.profilePic ? user.profilePic : "",
        pseudo: user.pseudo ? user.pseudo : "",
        email: user.email ? user.email : "",
      });
    }
  }, [user]);

  //* -------------------------- FONCTION POUR GERER LES CHANGEMENTS DANS LES INPUTS -------------------------- */
  const handleInputChange = (e) => {
    //si l'utilisateur ferme la fenêtre de modification de photo
    if (e.target.name === "photo" && e.target.files.length === 0) {
      return;
    }
    // reset du state photo
    setInput({
      ...input,
      photo: "aucun fichier sélectionné",
    });
    setError("");
    // si c'est un changement de photo
    if (e.target.name === "photo") {
      const fileSize = e.target.files[0].size; // taille en bytes
      const maxSize = 1 * 1024 * 1024; // 1MB en bytes

      // si la taille de l'image est supérieure à 1MB
      if (fileSize > maxSize) {
        setError("La taille de l'image ne doit pas dépasser 1MB");
        return;
      }

      setIsDisabled(false);
      // si la taille de l'image est inférieure à 1MB set la nouvelle photo dans le state input

      setInput({
        ...input,
        photo: e.target.files[0],
      });
      return;
    }
    setIsDisabled(false);
    // autres inputs
    setInput({
      ...input,

      [e.target.name]: e.target.value,
    });
  };

  //* -------------------------- FONCTION POUR GERER LA SOUMISSION DU FORMULAIRE -------------------------- */
  const handleFetchNewData = async (e) => {
    e.preventDefault();
    // si l'utilisateur a changé son pseudo

    await updateUser(input);
  };

  //* -------------------------- FONCTION POUR SUPPRIMER LE COMPTE -------------------------- */
  const handleDeleteAccount = async () => {
    // si le champ password est vide
    if (input.password == "" || input.password == null || !input.password) {
      setError(
        "Veuillez renseigner votre mot de passe pour supprimer votre compte"
      );
      return;
    }
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      await deleteUserPerma(user, user.password);
    }
  };

  return (
    <div className={classes.settings}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.compteSection}>
            <div className={classes.title}>
              <h1 className="_3HPNX">Compte</h1>
            </div>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td className={classes.inputTitle}>Photo de profil</td>
                  <td className={classes.labelContainer}>
                    <div className={classes.labelWrapper}>
                      <label className={`btnStyle ${classes.label}`}>
                        <input
                          onChange={handleInputChange}
                          accept="image/*"
                          className={classes.inputFile}
                          name="photo"
                          type="file"
                        />
                        Choisir un fichier
                      </label>
                      <div className={classes.fileName}>
                        {!input.photo.name
                          ? "aucun fichier sélectionné"
                          : input.photo.name}
                      </div>
                    </div>
                    <div
                      className={`${
                        error !==
                        "La taille de l'image ne doit pas dépasser 1MB"
                          ? classes.fileTxt
                          : classes.error
                      }`}
                    >
                      taille maximale = 1 MB
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={classes.inputTitle}>
                    <label htmlFor="pseudo">Pseudo</label>
                  </td>
                  <td className={classes.inputTd}>
                    <input
                      id="pseudo"
                      name="pseudo"
                      className={classes.input}
                      type="text"
                      value={input.pseudo}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td className={classes.inputTitle}>
                    <label htmlFor="email">E-mail</label>
                  </td>
                  <td className={classes.inputTd}>
                    <input
                      id="email"
                      name="email"
                      className={classes.input}
                      type="text"
                      value={input.email}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.inputTitle}>
                    <label htmlFor="password">Mot de passe actuel</label>
                  </td>
                  <td className={classes.inputTd}>
                    <input
                      id="password"
                      name="password"
                      className={classes.input}
                      type="password"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.inputTitle}>
                    <label htmlFor="newPassword">Nouveau mot de passe</label>
                  </td>
                  <td className={classes.inputTd}>
                    <input
                      id="newPassword"
                      name="newPassword"
                      className={classes.input}
                      type="password"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="_3ky4c V9dBP">
            <hr className="_2tnT1" />
          </div>
          {error ? (
            <div className={classes.errorContainer}>
              <div className={classes.error}>{error}</div>
            </div>
          ) : null}

          <div className={classes.accountBtn}>
            <button
              className={`btnStyle ${classes.confirmBtn}`}
              disabled={isDisabled}
              onClick={handleFetchNewData}
              type="Submit"
            >
              Confirmer les changements
            </button>

            <a
              className={classes.deleteAccount}
              href="#"
              onClick={handleDeleteAccount}
              tabIndex="0"
            >
              Supprimer mon compte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
