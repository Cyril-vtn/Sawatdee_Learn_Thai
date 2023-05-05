import React from "react";

//* IMPORT DES STYLES
import classes from "./ProfilePicRounded.module.css";

//* IMPORT DES IMAGES
import ProfileImg from "../../assets/images/profileImg.png";

//* IMPORT DU CONTEXTE
import { UserAuth } from "../../context/AuthContext";

const ProfilePicRounded = ({ style, Img }) => {
  // RECUPERATION DE LA PHOTO DE PROFIL DU CONTEXTE

  return (
    <div className={classes.imgContainer}>
      {Img ? (
        // Affiche la photo de profil si elle existe, sinon affiche une autre image.
        <img src={Img} alt="" draggable="false" style={{ ...style }} />
      ) : (
        <img src={ProfileImg} alt="" draggable="false" style={{ ...style }} />
      )}
    </div>
  );
};

export default ProfilePicRounded;
