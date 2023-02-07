import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./MainContent.module.css";
import logo from "../../../assets/brand/logo.png";
import ThaiWorld from "../../../assets/images/thaiWorldLogo.png";
import Bouton from "../../../pages/global/components/button/Bouton";

const Home = () => {
  return (
    <>
      <div className={classes.home}>
        <div className={classes.background}>
          <div className={classes.navbar}>
            <div className={classes.navbarContent}>
              <Link to="/" className={classes.logo}>
                <img src={logo} alt="logo sawatdee" />
              </Link>
              <div style={{ display: "flex", gap: "25px" }}>
                <div className={classes.langTextContainer}>
                  <p>Langue du site: fr</p>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.homeContainer}>
            <div className={classes.homeContent}>
              <div className={classes.mainImgContainer}>
                <img
                  src={ThaiWorld}
                  alt="logo de la Thailande en forme de terre"
                />
              </div>
              <div className={classes.mainTextContainer}>
                <div className={classes.mainText}>
                  La méthode gratuite, fun et efficace pour apprendre le Thai !
                </div>
                <div className={classes.mainButtonContainer}>
                  <Bouton
                    text="C'est parti !"
                    link="/register"
                    classes={classes.boutonRegistermain}
                  />
                  <Bouton
                    text="J'ai déjà un compte"
                    link="/login"
                    classes={classes.boutonLoginMain}

                    //set onclick for isLogging=true ! and open
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// backgroundColor: props.backgroundColor,
// borderBottom: props.borderBottom,
// borderBottomWidth: props.borderBottomWidth,
// padding: props.padding,
// color: props.color,
