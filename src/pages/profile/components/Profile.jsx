import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//* IMPORT COMPONENTS
import Load from "../../../components/loader/Load";
import ProfilePicRounded from "../../../components/profilePic/ProfilePicRounded";

//* IMPORT CSS
import classes from "./Profile.module.css";

//* IMPORT CONFIG FIREBASE
import { db, storage } from "../../../firebase/config";

//* IMPORT IMG
import flagRounded from "../../../assets/svg/flagRounded.svg";
import profilePic from "../../../assets/images/profileImg.png";

//* IMPORT FIREBASE STORAGE
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

//* IMPORT CONTEXT
import { UserAuth } from "../../../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserStats } from "./UserStats";

const Profile = () => {
  const params = useParams();

  //* RECUPERATION DE L'UTILISATEUR
  const { user, setUser, photo, setPhoto } = UserAuth();
  const [userFromUrl, setUserFromUrl] = useState();
  const [empty, setEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // * RECUPERATION DE L'ID DE L'URL
  const userIdFromUrl = window.location.href.split("/")[5];

  useEffect(() => {
    // set de params ici pour reload la page en cas de changement de params
    const tag = params;
    setIsLoading(true);

    // Crée une requête Firestore pour récupérer l'utilisateur avec l'ID de l'URL.
    const q = query(collection(db, "users"), where("tag", "==", userIdFromUrl));
    // Exécute la requête et récupère le snapshot.
    const querySnapshot = getDocs(q).then((querySnapshot) => {
      // Si le snapshot est vide, cela signifie qu'il n'y a pas d'utilisateur avec cet ID, alors définit "empty" à true et quitte la fonction.
      if (querySnapshot.empty === true) {
        setEmpty(true);
        return;
      }
      // Si le snapshot n'est pas vide, itère sur chaque document (dans ce cas, il n'y a qu'un document car "tag" est unique) dans le snapshot.
      querySnapshot.forEach((doc) => {
        // Récupère les données de l'utilisateur actuel dans la boucle forEach.
        const userFromSnapshot = doc.data();
        // Si l'utilisateur actuel a une photo de profil, récupère l'URL de téléchargement de l'image et met à jour l'état de "photo" avec cette URL.

        setUserFromUrl(userFromSnapshot);
        setIsLoading(false);
      });
    });
  }, [userIdFromUrl, user]); // La dépendance vide signifie que l'effet ne sera déclenché qu'une fois, lorsque le composant est monté.```

  // * MISE A JOUR DE LA PHOTO DE PROFIL
  const HandleChangeProfilePic = async (e) => {
    // RECUPERATION DE LA PHOTO
    const type = e.target.files[0].type.split("/")[1];
    // Stockage de la nouvelle photo sur Firebase Storage
    const storageRef = ref(storage, `/users/${user.uid}/avatar.${type}`);
    await uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      console.log(snapshot.ref); //MISE A JOUR DE LA PHOTO DE PROFIL DANS LE STATE USER
      setUser({ ...user, profilePic: snapshot.ref.fullPath });
      // TELECHARGEMENT DE LA PHOTO DE PROFIL DANS LE STATE PHOTO
      getDownloadURL(snapshot.ref).then((url) => {
        setPhoto(url);
      });
      // MISE A JOUR DU SUCCES PHOTOGÉNIQUE
      const photogenicSuccess = user.Succes.find(
        (success) => success.name === "Photogénique"
      );
      if (photogenicSuccess && photogenicSuccess.count === 0) {
        // Si le compteur est à 0, mettez à jour le succès Photogénique avec le compteur à 1
        const updatedSuccess = {
          ...photogenicSuccess,
          count: 1,
          completed: true,
        };
        const updatedSuccesses = [
          ...user.Succes.filter((success) => success.name !== "Photogénique"),
          updatedSuccess,
        ];
        // Mettez à jour l'utilisateur dans Firestore avec le succès mis à jour
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
          ...user,
          profilePic: snapshot.ref.fullPath,
          Succes: updatedSuccesses,
        });
      }
    });
  };

  // * MISE A JOUR DE LA DATE DE CREATION DU COMPTE
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
      ) : empty ? (
        <div>Utilisateur introuvable</div>
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
                      Membre depuis{" "}
                      {formatDate(new Date(userFromUrl?.createdAt))}
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
                    <image href={flagRounded} alt="" />
                  </svg>
                </div>
              </div>

              {/* IMAGE DE PROFILE */}
              <div className={classes.profilePicContainer}>
                <div className={classes.profilePic}>
                  <ProfilePicRounded />
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
            <UserStats user={userFromUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
