import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// * IMPORT DES STYLES
import classes from "./MainContent.module.css";

// * IMPORT DES COMPOSANTS
import Header from "./Header";
import Load from "../../../components/loader/Load";
import Img from "../../../assets/images/thaiPersonWoman.png";
import WordBtn from "./WordBtn";
import Footer from "./Footer";
import Modal from "../../../components/modalLessonAnwser/Modal";

// * IMPORT DU CONTEXT
import { LessonCtx } from "../../../context/LessonContext";

//* Import des sons
import CorrectAnswerSound from "../../../assets/sounds/correct_answer_sound.mp3";
import BadAnswerSound from "../../../assets/sounds/bad_answer_sound.mp3";
const MainContent = () => {
  // récupéré le contexte
  const {
    loading,
    data,
    fetchData,
    index,
    shownIndexes,
    getRandomIndex,
    setLessonError,
    lessonError,
    updateUserAfterLesson,
    resetLesson,
  } = LessonCtx();
  // state pour les réponses sélectionnées
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [correct, setCorrect] = useState(true);
  // récupéré les parametre de l'url
  const { lessonid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // on récupère les données de la leçon
    fetchData(lessonid);
  }, []);

  //* on récupère la question avec l'index généré aléatoirement
  const questionKey = `Q${index}`;
  const question = data[questionKey];

  //* fonction pour gérer le click sur les mots
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

  //* fonction pour gérer la validation
  const handleValidation = () => {
    const correctAnswerSound = new Audio(CorrectAnswerSound); //bonne réponse
    const badAnswerSound = new Audio(BadAnswerSound); //mauvaise réponse
    const isCorrect = selectedAnswers[0] === question.answer; // true ou false

    if (isCorrect) {
      // si la réponse est correcte
      correctAnswerSound.volume = 0.5;
      correctAnswerSound.play();
    }
    if (!isCorrect) {
      // si la réponse est incorrecte
      badAnswerSound.volume = 0.3;
      badAnswerSound.play();
      setLessonError(lessonError + 1);
    }
    setShowModal(true);
    setCorrect(isCorrect);
  };

  const isAnswerSelected = (answer) => {
    // Retourne true si la réponse est déjà sélectionnée, false sinon
    return selectedAnswers.includes(answer);
  };

  //  fonction pour gérer le click sur le bouton suivant dans le modal
  const handleNextClick = () => {
    if (shownIndexes.length === 5) {
      // si c'est la dernière question, on redirige vers la page d'accueil
      return navigate("/app/learn");
    }
    // on cache le modal
    setShowModal(false);
    // on vide le tableau des réponses sélectionnées
    setSelectedAnswers([]);
    // récupérer un nouvel index
    getRandomIndex();
  };

  return (
    <div className={classes.flex}>
      {loading ? (
        <Load
          style={{ backgroundColor: "#58cc02" }}
          centerClass={classes.center}
        />
      ) : (
        <>
          <Header index={shownIndexes.length} reset={resetLesson} />
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
          <Modal
            correct={correct}
            showModal={showModal}
            helper={data?.helper}
            onClick={handleNextClick}
            index={shownIndexes.length}
            exemple={question?.exemple}
            error={lessonError}
            finishedLesson={updateUserAfterLesson}
            id={lessonid}
          />
          <Footer
            onClick={handleValidation}
            disabled={selectedAnswers?.length == 1 ? false : true}
          />
        </>
      )}
    </div>
  );
};
export default MainContent;
