import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import logo from "../../assets/logoGreen.svg";
import flagRounded from "../../assets/flagRounded.svg";
import streakFlame from "../../assets/fireStreak.svg";
import ProfileImg from "../../assets/profileImg.png";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContent}>
        <div style={{ display: "flex" }}>
          <Link to="/learn" className={classes.logo}>
            <img src={logo} alt="logo sawatdee" />
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          <div className={classes.flagWrapper}>
            <span className={classes.flagContainer}>
              <svg
                viewBox="0 2310 82 66"
                style={{ height: "37.0244px", width: "46px" }}
              >
                <image href={flagRounded} alt=""></image>
              </svg>
            </span>
          </div>
          <div className={classes.streakWrapper}>
            <span className={classes.streakContainer}>
              <div>
                <img
                  src={streakFlame}
                  alt="logo de streak (jour de connexion d'affilée)"
                />
              </div>
              <span className={classes.streakText}>0</span>
            </span>
          </div>
          <div className={classes.profileImgWrapper}>
            <span className={classes.profileImgContainer}>
              <div>
                <img src={ProfileImg} alt="" />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
