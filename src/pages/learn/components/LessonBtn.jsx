import React, { useState } from "react";

//* IMPORT DES STYLES
import classes from "./LessonBtn.module.css";

//* IMPORT DES COMPOSANTS
import Modal from "./Modal";

//* CREATION DU COMPOSANT
const LessonBtn = ({ id, onClick, style, isActive, setActive }) => {
  return (
    <div className={classes.pathBtnContainer} style={{ ...style }}>
      <div className={classes.pathBtnWrapper}>
        <div>
          <button
            onClick={() => {
              onClick(id);
            }}
            className={`${classes.btn} ${classes._3rLLs}`}
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg"
              className={classes.img}
              draggable="false"
            />
          </button>
        </div>
        {/* COMPOSANT RENDU SI IL EST ACTIF (EN CLIQUAND SUR LE BOUTON DONT L'ID EST ASSOCIE)  */}
        {isActive && (
          <Modal
            title={`Modal ${id}`}
            active={isActive}
            onClose={() => setActive(null)}
          >
            Modal content for {id}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LessonBtn;
