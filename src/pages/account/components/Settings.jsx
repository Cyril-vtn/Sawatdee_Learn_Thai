import React, { useEffect, useState } from "react";

// import du context pour récupérer les données de l'utilisateur
import { UserAuth } from "../../../context/AuthContext";

// IMPORT CSS
import classes from "./settings.module.css";

const Settings = () => {
  // * RECUPERATION DE L'UTILISATEUR
  const { user, deleteUserPerma } = UserAuth();
  const [error, setError] = useState();

  const [input, setInput] = useState({
    photo: "",
    pseudo: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const [isDisabled, setIsDisabled] = useState(true); // nouvel état pour le bouton

  useEffect(() => {
    // utiliser useEffect pour récupérer les données de l'utilisateur et les mettre dans le state input
    if (user) {
      setInput({
        photo: user.profilePic ? user.profilePic : "",
        pseudo: user.pseudo ? user.pseudo : "",
        email: user.email ? user.email : "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    // si c'est un changement de photo
    if (e.target.name === "photo") {
      setError(null);
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

  // fonction pour mettre à jour les données de l'utilisateur si changement
  const handleFetchNewData = async (e) => {
    e.preventDefault();
    // si l'utilisateur a changé son pseudo
    if (input.pseudo !== user.pseudo) {
      // mettre à jour le pseudo dans la base de données
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { pseudo: input.pseudo });
    }
    // si l'utilisateur a changé son email
    if (input.email !== user.email) {
      // mettre à jour l'email dans la base de données et authentification
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { email: input.email });
      await updateEmail(user, input.email);
    }
    // si l'utilisateur a changé son mot de passe
    if (input.password !== input.newPassword) {
      // mettre à jour le mot de passe dans la base de données
      await updatePassword(user, input.newPassword);
    }
    // si l'utilisateur a changé sa photo de profil
    if (input.photo !== user.profilePic) {
      // mettre à jour la photo de profil dans la base de données
      await changeProfilePic(user, input.photo);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      await deleteUserPerma(user);
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
                      className={`${!error ? classes.fileTxt : classes.error}`}
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
          <div className={classes.accountBtn}>
            <button
              className={`btnStyle ${classes.confirmBtn}`}
              disabled={isDisabled}
            >
              <input
                onChange={handleInputChange}
                accept="image/*"
                className={classes.inputFile}
                name="photo"
                type="file"
              />
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
