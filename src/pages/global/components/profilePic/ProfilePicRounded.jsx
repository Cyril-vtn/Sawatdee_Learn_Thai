import React from "react";

//* IMPORT DES STYLES
import classes from "./ProfilePicRounded.module.css";

//* IMPORT DES IMAGES
import ProfileImg from "../../../../assets/images/profileImg.png";

//* IMPORT DU CONTEXTE
import { UserAuth } from "../../../../context/AuthContext";

const ProfilePicRounded = () => {
  // RECUPERATION DE LA PHOTO DE PROFIL DU CONTEXTE
  const { photo } = UserAuth();

  return (
    <span className={classes.profileImgContainer}>
      <div>
        {photo ? (
          // Affiche la nouvelle photo de profil si elle existe, sinon affiche une autre image.
          <img src={photo} alt="" draggable="false" />
        ) : (
          <img src={ProfileImg} alt="" draggable="false" />
        )}
      </div>
    </span>
  );
};

export default ProfilePicRounded;
