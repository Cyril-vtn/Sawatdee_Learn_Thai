import React, { useEffect, useRef } from "react";

//* IMPORT DES STYLES
import classes from "./Modal.module.css";

//* IMPORT DE LA LIBRAIRIE ANIMEJS
import anime from "animejs/lib/anime.es.js";

//* IMPORT DE LA LIBRAIRIE REACT ROUTER DOM
import { useNavigate } from "react-router-dom";

//* CREATION DU COMPOSANT MODAL
const Modal = ({ title, onClose, id }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  //* CREATION DE LA FONCTION POUR GERER LE CLICK SUR LE BOUTON ET COMMENCER LA LECON EN RECUPERANT L'ID DU BOUTON
  const handleLesson = (id) => {
    if (id) {
      navigate(`/lessons`);
    }
  };

  //* CREATION DE FADING IN ET FADING OUT
  const fadeIn = () => {
    anime({
      targets: modalRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 150,
      easing: "easeOutQuad",
    });
  };

  //* CREATION DE LA FONCTION POUR FERMER LA MODAL EN CLIQUANT A L'EXTERIEUR
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  //* CREATION DE LA FONCTION POUR FERMER LA MODAL EN SCROLLANT
  const handleScroll = () => {
    onClose();
  };

  useEffect(() => {
    fadeIn();

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleOutsideClick, handleScroll, fadeIn]);

  //* CREATION DU JSX
  return (
    <div
      className={classes.container}
      style={{ "--margin": "12px" }}
      ref={modalRef}
    >
      <div
        className={classes.wrapper}
        style={{
          transform: "translateX(0%) translateX(-147.5px)",
          zIndex: 1,
        }}
      >
        <div className={classes.content}>
          <div>
            <div className={classes.titleContainer}>
              <h1 className={classes.title}>
                {title ? title : "Titre de la leçon"}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => handleLesson(id)}
              className={classes.btn}
            >
              Commencer +10 XP
            </button>
          </div>
        </div>
        <div
          className={classes.pointerWrapper}
          style={{ left: "calc(0% + 147.5px - 15px)" }}
        >
          {/* PETIT FLECHE EN BORD DE MODAL */}
          <div className={classes.pointer}></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
