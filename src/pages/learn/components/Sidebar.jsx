import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.css";
import logo from "../../../assets/svg/logoGreen.svg";
import logoSmall from "../../../assets/svg/logoSmall.svg";
import disconnectIcon from "../../../assets/images/disconnectIcon.png";
import ProfilePicRounded from "../../global/components/profilePic/ProfilePicRounded";
import { UserAuth } from "../../../context/AuthContext";

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
        <NavLink to="/learn" className={classes.logoLink}>
          <picture>
            <source
              srcset={logo}
              media="(min-width: 769px)"
              type="image/svg+xml"
            />
            <img srcset={logoSmall} className={classes.logoSmall} />
          </picture>
        </NavLink>
      </div>
      <div className={classes.sidebarBtnContainer}>
        <NavLink
          to="/learn"
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
          to="/alphabet"
          className={({ isActive }) => {
            return isActive ? classes.active : classes.inactive;
          }}
        >
          <span className={classes.linkContent}>
            <div className={classes.linkImg}>
              <img src="https://d35aaqx5ub95lt.cloudfront.net/vendor/5187f6694476a769d4a4e28149867e3e.svg" />
            </div>
            <span className={classes.linkText}>L'ALPHABET</span>
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
