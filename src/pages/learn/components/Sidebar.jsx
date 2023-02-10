import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.css";
import logo from "../../../assets/svg/logoGreen.svg";
import logoSmall from "../../../assets/svg/logoSmall.svg";
import disconnectIcon from "../../../assets/images/disconnectIcon.png";
import ProfilePicRounded from "../../global/components/profilePic/ProfilePicRounded";
import { UserAuth } from "../../../context/AuthContext";
import alphabetIcon from "../../../assets/images/alphabetIcon.png";
const Sidebar = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>
        <NavLink to="/app/learn" className={classes.logoLink}>
          <picture>
            <source
              srcSet={logo}
              media="(min-width: 769px)"
              type="image/svg+xml"
            />
            <img srcSet={logoSmall} className={classes.logoSmall} />
          </picture>
        </NavLink>
      </div>
      <div className={classes.sidebarBtnContainer}>
        <NavLink
          to="/app/learn"
          className={({ isActive }) => {
            return isActive ? classes.active : classes.inactive;
          }}
        >
          <span className={classes.linkContent}>
            <div className={classes.linkImg}>
              <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg" />
            </div>
            <span className={classes.linkText}>APPRENDRE</span>
          </span>
        </NavLink>
        <NavLink
          to="/app/alphabet"
          className={({ isActive }) => {
            return isActive ? classes.active : classes.inactive;
          }}
        >
          <span className={classes.linkContent}>
            <div className={classes.linkImg}>
              <img src={alphabetIcon} />
            </div>
            <span className={classes.linkText}>CONSONNES</span>
          </span>
        </NavLink>
        <NavLink
          to="/app/vowel"
          className={({ isActive }) => {
            return isActive ? classes.active : classes.inactive;
          }}
        >
          <span className={classes.linkContent}>
            <div className={classes.linkImg}>
              <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/5187f6694476a769d4a4e28149867e3e.svg" />
            </div>
            <span className={classes.linkText}>VOYELLES</span>
          </span>
        </NavLink>
        <NavLink
          to="/profile:id"
          className={({ isActive }) => {
            return isActive ? classes.active : classes.inactive;
          }}
        >
          <span className={classes.linkContent}>
            <div className={classes.linkImg}>
              <ProfilePicRounded />
            </div>
            <span className={classes.linkText}>MON PROFIL</span>
          </span>
        </NavLink>
        <NavLink
          to="#"
          className={classes.disconnectBtn}
          onClick={handleLogout}
        >
          <span>
            <img
              src={disconnectIcon}
              alt=""
              className={classes.disconnectIcon}
            />
            <span className={classes.linkText}>DECONNEXION</span>
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
