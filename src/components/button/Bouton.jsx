import React from "react";
import { Link } from "react-router-dom";
import "./Bouton.css";

const Bouton = (props) => {
  return (
    <>
      <Link
        to={props.link}
        style={{
          backgroundColor: props.backgroundColor,
          borderBottom: props.borderBottom,
          border: props.border,
          borderBottomWidth: props.borderBottomWidth,
          padding: props.padding,
          color: props.color,
          width: props.width,
        }}
        className={`${props.classes} bouton`}
        onClick={props.onclick}
      >
        {props.text}
      </Link>
    </>
  );
};

export default Bouton;
