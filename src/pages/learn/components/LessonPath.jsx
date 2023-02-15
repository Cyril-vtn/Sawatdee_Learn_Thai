import React from "react";
import LessonBtn from "./LessonBtn";
import classes from "./LessonPath.module.css";
import color from "./LessonBtnColor.module.css";

const data = [
  {
    id: "S1",
    colorSection: {
      // backgroundColor: "#555555",
    },
    title: "section 1",
    description: "Utilise des mots de base !",
    sectionStyle: {
      left: "0px",
      position: "absolute",
      top: "0px",
      width: "100%",
    },
    btnStyle: [
      {
        left: "0px",
        marginBottom: "0px",
        marginTop: "24px",
      },
      {
        left: "-44px",
        marginBottom: "0px",
        marginTop: "11px",
      },
      {
        left: "-70px",
        marginBottom: "0px",
        marginTop: "20px",
      },
      {
        left: "-44px",
        marginBottom: "0px",
        marginTop: "20px",
      },
      {
        left: "0px",
        marginBottom: "0px",
        marginTop: "11px",
      },
    ],
    lessons: [],
  },
];

const LessonPath = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.pathWrapper}>
          <div className={classes.path}>
            {data.map((section) => {
              return (
                <section style={{ ...section.sectionStyle }} key={section.id}>
                  <header className={classes.pathHeader}>
                    <h1 className={classes.pathH1}>{section.title}</h1>
                    <span className={classes.pathSpan}>
                      {section.description}
                    </span>
                  </header>
                  <div className={classes.pathContent}>
                    {section.btnStyle.map((style, i) => {
                      return (
                        <LessonBtn
                          style={style}
                          color={section.colorSection}
                          key={i}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPath;
