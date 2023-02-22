import React from "react";
import { useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import Img from "../../../assets/images/profileImg.png";
const Profile = () => {
  const { userid } = useParams();
  console.log(userid);
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
                    <input type="file" accept="image/*" name="image" />
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
