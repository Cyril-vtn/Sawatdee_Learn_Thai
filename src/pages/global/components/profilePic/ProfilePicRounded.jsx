import React, { useEffect, useState } from "react";
import classes from "./ProfilePicRounded.module.css";
import { storage } from "../../../../firebase/config";
import ProfileImg from "../../../../assets/images/profileImg.png";
import { UserAuth } from "../../../../context/AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
const ProfilePicRounded = () => {
  const { user, photo } = UserAuth();

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
