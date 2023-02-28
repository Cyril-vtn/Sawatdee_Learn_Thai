import React, { useState } from "react";

// import du context pour récupérer les données de l'utilisateur
import { UserAuth } from "../../../context/AuthContext";

// IMPORT CSS
import classes from "./settings.module.css";

const Settings = () => {
  const [tag, setTag] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState();
  const [error, setError] = useState();

  // * RECUPERATION DE L'UTILISATEUR
  const { user, updateProfilePhoto } = UserAuth();

  const handlePhotoChange = (event) => {
    setError(null);
    const fileSize = event.target.files[0].size; // taille en bytes
    console.log(fileSize);
    const maxSize = 1 * 1024 * 1024; // 1MB en bytes
    if (fileSize > maxSize) {
      setError("La taille de l'image ne doit pas dépasser 1MB");
      return;
    }
    setPhoto(event.target.files[0]);
  };

  // ! Fonction pour mettre à jour la photo de profil a utiliser sur un obuton global en dessous
  const handleUpdateProfilePhoto = () => {
    const newPhotoUrl = photo;
    console.log(newPhotoUrl);
    try {
      updateProfilePhoto(newPhotoUrl);
    } catch (error) {
      console.log(error);
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
                          onChange={handlePhotoChange}
                          accept="image/*"
                          className={classes.inputFile}
                          name="picture"
                          type="file"
                        />
                        Choisir un fichier
                      </label>
                      <div className={classes.fileName}>
                        {!photo ? "aucun fichier sélectionné" : photo.name}
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
                      name="name"
                      className={classes.input}
                      type="text"
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
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.inputTitle}>
                    <label htmlFor="NewPassword">Nouveau mot de passe</label>
                  </td>
                  <td className={classes.inputTd}>
                    <input
                      id="NewPassword"
                      name="password"
                      className={classes.input}
                      type="password"
                    />
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <a
                      className={classes.deleteAccount}
                      href="https://drive-thru.duolingo.com/"
                      tabIndex="0"
                    >
                      Supprimer mon compte
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="_3ky4c V9dBP">
            <hr className="_2tnT1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
