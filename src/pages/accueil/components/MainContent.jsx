import React from "react";

//* IMPORT DE REACT ROUTER DOM
import { Link, NavLink } from "react-router-dom";

//* IMPORT DES STYLES
import classes from "./MainContent.module.css";

//* IMPORT DES IMAGES
import logo from "../../../assets/brand/logo.png";
import ThaiWorld from "../../../assets/images/thaiWorldLogo.png";

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
                  <NavLink
                    to="/register"
                    className={`btnStyle ${classes.btnLogin}`}
                    style={{ width: "100%" }}
                  >
                    C'est parti !
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btnStyle"
                    style={{ width: "100%" }}
                  >
                    J'ai déjà un compte
                  </NavLink>
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
