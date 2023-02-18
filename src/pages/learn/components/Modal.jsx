import React, { useEffect, useRef } from "react";

//* IMPORT DES STYLES
import classes from "./Modal.module.css";

//* IMPORT DE LA LIBRAIRIE ANIMEJS
import anime from "animejs/lib/anime.es.js";

//* CREATION DU COMPOSANT MODAL
const Modal = ({ title, onClose, active }) => {
  const modalRef = useRef(null);

  //* CREATION DE FADING IN ET FADING OUT
  const fadeIn = () => {
    anime({
      targets: modalRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 300,
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
              <h1 className={classes.title}>{title}</h1>
            </div>
            <p className={classes.paragraph}>Leçon 1 sur 4</p>
            <button className={classes.btn}>Commencer +10 XP</button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Modal;
