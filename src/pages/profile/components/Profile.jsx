import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//* IMPORT COMPONENTS
import Load from "../../../components/loader/Load";
import ProfilePicRounded from "../../../components/profilePic/ProfilePicRounded";

//* IMPORT CSS
import classes from "./Profile.module.css";

//* IMPORT CONFIG FIREBASE
import { db, storage } from "../../../firebase/config";

//* IMPORT IMG
import flagRounded from "../../../assets/svg/flagRounded.svg";

//* IMPORT FIREBASE STORAGE
import { collection, query, where, getDocs } from "firebase/firestore";

//* IMPORT CONTEXT
import { UserAuth } from "../../../context/AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { UserStats } from "./UserStats";

const Profile = () => {
  // RECUPERATION DE L'UTILISATEUR
  const { user } = UserAuth();
  const { userProfilePhoto, setUserProfilePhoto, changeProfilePic } =
    UserAuth();
  const [userFromUrl, setUserFromUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // RECUPERATION DE L'ID DE L'URL
  const userIdFromUrl = window.location.href.split("/")[5];
  useEffect(() => {
    setIsLoading(true);
    // Crée une requête Firestore pour récupérer l'utilisateur avec l'ID de l'URL.
    const q = query(collection(db, "users"), where("tag", "==", userIdFromUrl));
    // Exécute la requête et récupère le snapshot.
    getDocs(q).then((querySnapshot) => {
      // Si le snapshot est vide, cela signifie qu'il n'y a pas d'utilisateur avec cet ID, alors définit "empty" à true et quitte la fonction.
      if (querySnapshot.empty === true) {
        return;
      }
      // Si le snapshot n'est pas vide, itère sur chaque document (dans ce cas, il n'y a qu'un document car "tag" est unique) dans le snapshot.
      querySnapshot.forEach((doc) => {
        // Récupère les données de l'utilisateur actuel dans la boucle forEach.
        const userFromSnapshot = doc.data();
        if (userFromSnapshot.profilePic) {
          getDownloadURL(ref(storage, userFromSnapshot.profilePic)).then(
            (url) => {
              setUserProfilePhoto(url);
            }
          );
        }
        setUserFromUrl(userFromSnapshot);
      });
      setIsLoading(false);
    });
  }, [userIdFromUrl]); // si le user.succes change, alors on recharge le useEffect

  //* -------------------------- MISE A JOUR DE LA PHOTO DE PROFIL -------------------------- *//
  const HandleChangeProfilePic = async (e) => {
    const photo = e.target.files[0];
    // si l'utilisateur ne fait rien et clique sur la croix de la fenêtre de sélection de fichier, alors la fonction s'arrête
    if (!e.target.files[0]) {
      return;
    }
    // appel de la fonction du contexte
    await changeProfilePic(photo);
  };

  //* -------------------------- MISE A JOUR DE LA DATE DE CREATION DU COMPTE -------------------------- *//
  function formatDate(date) {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);

    return `${monthCapitalized} ${year}`;
  }

  return (
    <div className={classes.profile}>
      {isLoading ? (
        <Load
          centerClass={classes.center}
          style={{ backgroundColor: "rgb(var(--color-macaw)" }}
        />
      ) : (
        <div className={classes.container}>
          <div className={classes.header}>
            {/* CONTENU DE L'EN-TÊTE DU PROFIL */}
            <div className={classes.profileInfoContainer}>
              <div className={classes.profileInfo}>
                <h1
                  data-test="profile-username"
                  className={classes.profileTitle}
                >
                  <span>{userFromUrl.pseudo}</span>
                  <div>{userFromUrl.tag}</div>
                </h1>
                <div className={classes.userInfoWrapper}>
                  {/* CONTENU DE L'EN-TÊTE DU PROFIL */}
                  <div className={classes.userInfo}>
                    <img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/ee1babf2becff2aa8ef6634fd9d76cc6.svg" />

                    <div>
                      Membre depuis
                      <span>
                        {""} {formatDate(new Date(userFromUrl?.createdAt))}
                      </span>
                    </div>
                  </div>
                  <div className={classes.userInfo}>
                    <img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/ca7b8ce89fb2e61323e8c7dcb24c1094.svg" />
                    <div>{userFromUrl?.friends.length} abonnement</div>
                  </div>
                </div>
                <div className={classes.country}>
                  <svg
                    viewBox="0 2310 82 66"
                    style={{ height: "30px", width: "40px" }}
                  >
                    <image href={flagRounded} alt="Drapeau Thaïlande" />
                  </svg>
                </div>
              </div>

              {/* IMAGE DE PROFILE */}
              <div className={classes.profilePicContainer}>
                <div className={classes.profilePic}>
                  <ProfilePicRounded Img={userProfilePhoto} />
                  {user.tag === userIdFromUrl && (
                    <div className={classes.editBtn}>
                      <label className={classes.label}>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          name="image"
                          onChange={HandleChangeProfilePic}
                        />
                        <img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/00e52dc386f5aeaef537e239c70739ab.svg" />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {user.tag === userIdFromUrl && (
              <div className={classes.btnWrapper}>
                <div className={classes.btn}>
                  <Link
                    to="../settings/account"
                    className="btnStyle btnText"
                    draggable="false"
                  >
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/00e52dc386f5aeaef537e239c70739ab.svg"
                      alt=""
                    />
                    <div>Modifier mon profil</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className={classes.userStatsContainer}>
            <UserStats user={user?.tag === userFromUrl ? user : userFromUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
