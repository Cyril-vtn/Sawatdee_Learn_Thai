import React from "react";
import classes from "./ProfilePicRounded.module.css";
import ProfileImg from "../../../../assets/images/profileImg.png";

const ProfilePicRounded = () => {
  return (
    <div>
      <span className={classes.profileImgContainer}>
        <div>
          <img src={ProfileImg} alt="" />
        </div>
      </span>
    </div>
  );
};

export default ProfilePicRounded;
