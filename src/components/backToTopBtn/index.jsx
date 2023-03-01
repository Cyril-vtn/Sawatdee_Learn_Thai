import React, { useEffect, useState } from "react";
import classes from "./classes.module.css";
const index = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    showTopBtn && (
      <button className={classes.btn} onClick={goToTop}>
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/6a4aeae39e2054b3d9a33cc8e5a05816.svg"
          aria-label="revenir en haut de la page"
        />
      </button>
    )
  );
};

export default index;
