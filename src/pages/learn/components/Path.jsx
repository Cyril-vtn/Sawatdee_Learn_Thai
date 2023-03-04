import React, { useState } from "react";

//* IMPORT DES STYLES
import classes from "./Path.module.css";
import "./PathColor.css";

//* IMPORT DES COMPOSANTS
import LessonBtn from "./LessonBtn";
import BackToTopBtn from "../../../components/backToTopBtn/index";
import Load from "../../../components/loader/Load";

//* IMPORT DU CONTEXTE
import { PathAuth } from "../../../context/DataContext";

//* CREATION DU COMPOSANT
const LessonPath = () => {
  //* RECUPERATION DES DONNEES DU CONTEXTE
  const { path, loading } = PathAuth();

  //* CREATION DE L'ETAT POUR GERER L'ACTIVE BUTTON
  const [activeButton, setActiveButton] = useState(null);

  //* CREATION DE LA FONCTION POUR GERER LE CLICK SUR LES BOUTONS
  const handleButtonClick = (id) => {
    setActiveButton(id);
  };

  //* CREATION DU JSX
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          {loading && <Load />}
          <div className={classes.pathWrapper}>
            <div className={classes.path}>
              {/* MAP SUR LE STATE PATH RECUPERE DU CONTEXTE  */}
              {path.map((section) => {
                return (
                  <section
                    className={section.color}
                    style={{ ...section.sectionStyle }}
                    key={section.id}
                  >
                    <header className={classes.pathHeader}>
                      <h1 className={classes.pathH1}>{section.title}</h1>
                      <span className={classes.pathSpan}>
                        {section.description}
                      </span>
                    </header>
                    <div className={classes.pathContent}>
                      {section.btnStyle.map((style, i) => {
                        const btnId = `${section.id}L${i + 1}`;
                        const modalTitle =
                          section.modalTitle && section.modalTitle[i];
                        return (
                          <React.Fragment key={btnId}>
                            <LessonBtn
                              style={style}
                              ModalContent={modalTitle}
                              key={btnId}
                              id={btnId}
                              isActive={activeButton === btnId}
                              onClick={() => handleButtonClick(btnId)}
                              setActive={setActiveButton}
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
            <BackToTopBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPath;
