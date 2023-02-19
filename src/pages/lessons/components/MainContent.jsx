import React, { useState } from "react";
import Header from "./Header";
import classes from "./MainContent.module.css";
import Img from "../../../assets/images/thaiPersonWoman.png";
import WordBtn from "./WordBtn";
const MainContent = () => {
  const [words, setWords] = useState([]);
  const [wordBank, setWordBank] = useState([]);

  return (
    <>
      <Header />
      <div className={classes.mainContainer}>
        <div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <h1 className={classes.h1}>
                <span>Écris ceci en Thaï</span>
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",

                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <div className={classes.questionContainer}>
                  <div>
                    <img src={Img} className={classes.img} />
                  </div>
                  <div className={classes.bubbleContainer}>
                    <div className={classes.bubbleWrapper}>
                      <div>
                        <span>Me</span>
                        <span>?....................</span>
                      </div>
                    </div>
                    <div
                      className={classes.arrowContainer}
                      style={{
                        top: "calc(50% - 15px)",
                        transform: "translateY(-50%) rotate(-90deg)",
                      }}
                    >
                      <div className={classes.arrow}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={classes.wordsContainer}
                style={{ padding: "30px" }}
              >
                <div>{/* AJOUTER LES MOT ICI APRES CLIQUE */}</div>
              </div>
              <div className={classes.wordBankContainer}>
                <div className={classes.wordBankWrapper} data-test="word-bank">
                  <WordBtn />
                  <WordBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
