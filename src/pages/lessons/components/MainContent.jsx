import React, { useState, useEffect } from "react";
import Header from "./Header";
import classes from "./MainContent.module.css";
import Img from "../../../assets/images/thaiPersonWoman.png";
import WordBtn from "./WordBtn";

import { useLessonsCtx } from "../../../context/LessonsContext";
const MainContent = () => {
  const { id, getLesson, lesson, loading } = useLessonsCtx();
  console.log(lesson);
  useEffect(() => {
    getLesson(id);
  }, [id]);
  return (
    <>
      <Header />
      <div className={classes.mainContainer}>
        <div>
          <div className={classes.content}>
            {/* {lesson.map((question) => {
              return ( */}
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
                        <span>qzdqd</span>
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
                <div className={classes.wordBankWrapper} data-test="word-bank">
                  {/* {question.possibility.map((word) => (
                    <WordBtn key={word} word={word} />
                  ))} */}
                  <WordBtn />
                  <WordBtn />
                  <WordBtn />
                </div>
              </div>
            </div>
            {/* ); })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
