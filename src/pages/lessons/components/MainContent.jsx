import React, { useState, useEffect } from "react";
import Header from "./Header";
import classes from "./MainContent.module.css";
import Load from "../../../components/loader/Load";
import Img from "../../../assets/images/thaiPersonWoman.png";
import WordBtn from "./WordBtn";
import { LessonCtx } from "../../../context/LessonContext";

import { useParams } from "react-router-dom";
import Footer from "./Footer";

const MainContent = () => {
  // récupéré le contexte
  const { loading, data, fetchData, index, shownIndexes } = LessonCtx();
  // state pour les réponses sélectionnées
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // récupéré les parametre de l'url
  const { lessonid } = useParams();

  useEffect(() => {
    // on récupère les données de la leçon
    fetchData(lessonid);
  }, []);

  // on récupère la question avec l'index généré aléatoirement
  const questionKey = `Q${index}`;
  const question = data[questionKey];

  // fonction pour gérer le click sur les mots
  const handleAnswerClick = (answer) => {
    if (selectedAnswers.includes(answer)) {
      // Si la réponse est déjà sélectionnée, on la retire du tableau
      setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
    } else {
      // Si la réponse n'est pas sélectionnée, on vérifie qu'il n'y a pas déjà 1 réponses sélectionnées
      if (selectedAnswers.length == 1) return;
      // Sinon, on l'ajoute au tableau
      setSelectedAnswers([...selectedAnswers, answer]);
    }
  };

  const isAnswerSelected = (answer) => {
    // Retourne true si la réponse est déjà sélectionnée, false sinon
    return selectedAnswers.includes(answer);
  };
  if (loading)
    return (
      <Load
        style={{ backgroundColor: "#58cc02" }}
        centerClass={classes.center}
      />
    );
  else {
    return (
      <>
        <Header />
        <div className={classes.mainContainer}>
          <div>
            <div className={classes.content}>
              <div className={classes.wrapper}>
                <h1 className={classes.h1}>
                  <span>{`Question ${shownIndexes.length} !`}</span>
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
                            {question.question}
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
                    {selectedAnswers.map((answer, i) => (
                      <WordBtn
                        key={i}
                        word={answer}
                        onClick={() => handleAnswerClick(answer)}
                      />
                    ))}
                  </div>
                </div>
                <div className={classes.wordBankContainer}>
                  <div
                    className={classes.wordBankWrapper}
                    data-test="word-bank"
                  >
                    {question.possibilities.map((answer, i) => (
                      <WordBtn
                        key={i}
                        word={answer}
                        disabled={isAnswerSelected(answer)}
                        onClick={() => handleAnswerClick(answer)}
                        selectedAnswers={selectedAnswers}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};
export default MainContent;
