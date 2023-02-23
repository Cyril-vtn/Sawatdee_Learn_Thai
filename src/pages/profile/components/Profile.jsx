import React, { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import Img from "../../../assets/images/profileImg.png";
import { ref, uploadBytes } from "firebase/storage";

//* IMPORT FIREBASE STORAGE
import { storage, firebaseConfig } from "../../../firebase/config";
const Profile = () => {
  //* GET USER ID FROM URL
  const { userid } = useParams();

  // * UPLOAD PROFILE PIC
  const [file, setFile] = useState();
  const HandleChangeProfilePic = async (e) => {
    setFile(e.target.files[0]);

    const storageRef = ref(
      storage,
      `gs://sawatdee-developpement.appspot.com/users/${userid}/profile.jpg`
    );

    const metadata = {
      method: "PUT",
      contentType: "image/*",
    };
    await uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <div className={classes.profile}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.profileInfoContainer}>
            <div className={classes.profileInfo}>
              <h1 data-test="profile-username" className={classes.profileTitle}>
                <span>{userid}</span>
                <div></div>
              </h1>
              <div></div>
              <div>
                <img src="" alt="" />
              </div>
            </div>
            <div className={classes.profilePicContainer}>
              <div className={classes.profilePic}>
                <img src={Img} alt="" />
                <div className={classes.editBtn}>
                  <label className={classes.label}>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={HandleChangeProfilePic}
                    />
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/00e52dc386f5aeaef537e239c70739ab.svg"
                      alt=""
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div>{userid}</div>
      </div>
    </div>
  );
};

export default Profile;
