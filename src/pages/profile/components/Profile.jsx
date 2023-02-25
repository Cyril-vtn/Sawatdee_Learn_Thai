import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//* IMPORT CSS
import classes from "./Profile.module.css";

//* IMPORT CONFIG FIREBASE
import { db, storage } from "../../../firebase/config";

//* IMPORT IMG
import flagRounded from "../../../assets/svg/flagRounded.svg";
import Img from "../../../assets/images/profileImg.png";

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
  //* RECUPERATION DE L'UTILISATEUR
  const { user, setUser } = UserAuth();

  const [userFromUrl, setUserFromUrl] = useState();
  const [photo, setPhoto] = useState("");

  const { userid } = useParams();

  // * RECUPERATION DE L'ID DE L'URL
  const userIdFromUrl = window.location.href.split("/")[5];

  //* RECUPERATION DE L'UTILISATEUR SUR FIREBASE GRACE A SON ID DANS L'URL
  useEffect(() => {
    const q = query(collection(db, "users"), where("tag", "==", userIdFromUrl));
    const querySnapshot = getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (user?.profilePic) {
          getDownloadURL(ref(storage, user.profilePic)).then((url) => {
            setPhoto(url);
            setUserFromUrl(doc.data());
          });
        }
      });
    });
  }, [user]);

  // * MISE A JOUR DE LA PHOTO DE PROFIL
  const HandleChangeProfilePic = async (e) => {
    // RECUPERATION DE LA PHOTO
    const type = e.target.files[0].type.split("/")[1];
    console.log(type);
    const storageRef = ref(storage, `/users/${user.uid}/avatar.${type}`);
    await uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      //* MISE A JOUR DE LA PHOTO DE PROFIL DANS LE STATE USER
      setUser({ ...user, profilePic: snapshot.ref.fullPath });
      console.log(snapshot.ref.fullPath);
      //* MISE A JOUR DE LA PHOTO DE PROFIL DANS LA BASE DE DONNEES FIRESTORE
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, { ...user, profilePic: snapshot.ref.fullPath });
      // RECHARGER LA PAGE ACTUEL
      window.location.reload();
    });
  };

  // * SI L'UTILISATEUR N'EST PAS ENCORE CHARGER
  if (!userFromUrl) return <div>loading</div>;

  return (
    <div className={classes.profile}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.profileInfoContainer}>
            <div className={classes.profileInfo}>
              <h1 data-test="profile-username" className={classes.profileTitle}>
                <span>{userFromUrl.pseudo}</span>
                <div>{userFromUrl.tag}</div>
              </h1>
              <div className={classes.userInfoWrapper}>
                <div className={classes.userInfo}>
                  <img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/ee1babf2becff2aa8ef6634fd9d76cc6.svg" />
                  <div>Membre depuis Décembre 2022</div>
                </div>
                <div className={classes.userInfo}>
                  <img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/ca7b8ce89fb2e61323e8c7dcb24c1094.svg" />
                  <div>1 abonnement / 1 abonné</div>
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
                <img src={photo} alt="" draggable="false" />
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
                <Link to="#" className="btnStyle btnText" draggable="false">
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
          <UserStats />
        </div>
      </div>
    </div>
  );
};

export default Profile;
