import React, { useState, useEffect } from "react";
import Header from "./Header";
import classes from "./MainContent.module.css";
import Load from "../../../components/loader/Load";
import Img from "../../../assets/images/thaiPersonWoman.png";
import WordBtn from "./WordBtn";
// //* IMPORT DE LA CONFIGURATION DE FIREBASE
import { db } from "../../../firebase/config";

import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const MainContent = () => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  // récupéré les parametre de l'url
  const { lessonid } = useParams();

  useEffect(() => {
    setLoading(true);

    const s1l1Document = doc(db, `lessons/${lessonid}`);
    getDoc(s1l1Document).then((doc) => {
      if (doc.exists()) {
        setData(doc.data().Q1[0]);
        console.log("Document data:", doc.data().Q1[0]);
        // setId("");
        setLoading(false);
      } else {
        console.log("Le document n'existe pas!");
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Load style={{ backgroundColor: "#58cc02" }} />;
  else {
    console.log(data);
    return (
      <>
        <Header />
        <div className={classes.mainContainer}>
          <div>
            <div className={classes.content}>
              <div className={classes.wrapper}>
                <h1 className={classes.h1}>
                  <span>qzd</span>
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
                    <img src={Img} className={classes.img} />

                    <div className={classes.bubbleContainer}>
                      <div className={classes.bubbleWrapper}>
                        <div>
                          <span className={classes.question}>
                            {data.question}
                          </span>
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
                <div className={classes.wordsContainer}>
                  <div>
                    <WordBtn />
                  </div>
                </div>
                <div className={classes.wordBankContainer}>
                  <div
                    className={classes.wordBankWrapper}
                    data-test="word-bank"
                  >
                    {data.possibility.map((word, i) => (
                      <WordBtn key={i} word={word} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default MainContent;
