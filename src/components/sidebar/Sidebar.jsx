import React, { useState } from "react";

//* IMPORT REACT ROUTER
import { NavLink } from "react-router-dom";

//* IMPORT DES STYLES
import classes from "./Sidebar.module.css";

//* IMPORT DES IMAGES
import logo from "../../assets/svg/logoGreen.svg";
import logoSmall from "../../assets/svg/logoSmall.svg";
import disconnectIcon from "../../assets/images/disconnectIcon.png";
import ProfilePicRounded from "../profilePic/ProfilePicRounded";
import alphabetIcon from "../../assets/images/alphabetIcon.png";

//* IMPORT DU CONTEXTE
import { UserAuth } from "../../context/AuthContext";

//* IMPORT DES COMPOSANTS
import Load from "../loader/Load";

const Sidebar = () => {
  // RECUPERATION DES FONCTION/STATE DU CONTEXTE
  const { logout, user, setIsLoggedIn, photo, setPhoto, setUserProfilePhoto } =
    UserAuth();

  // CREATION DES STATE
  const [loading, setLoading] = useState(false);

  // FONCTION POUR GERER LA DECONNEXION
  const handleLogout = async () => {
    if (confirm("souhaitez-vous vraiment être déconnecté ?")) {
      setLoading(true);

      try {
        await logout();
        setPhoto(null);
        setUserProfilePhoto(null);
        setIsLoggedIn(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    } else {
      return;
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
            <span className={classes.linkText}>ALPHABET</span>
          </span>
        </NavLink>

        <NavLink
          to={`profile/${user?.tag}`}
          className={({ isActive }) => {
            return isActive ? classes.active : classes.inactive;
          }}
        >
          <span className={classes.linkContent}>
            <div className={classes.linkImg}>
              <ProfilePicRounded Img={photo} />
            </div>
            <span className={classes.linkText}>MON PROFIL</span>
          </span>
        </NavLink>
        <button className={classes.disconnectBtn} onClick={handleLogout}>
          <span>
            <img
              src={disconnectIcon}
              alt=""
              className={classes.disconnectIcon}
            />
            <span className={classes.linkText}>
              {loading ? <Load /> : "DECONNEXION"}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
