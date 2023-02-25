import React from "react";
import classes from "./ListItem.module.css";
import "./cardStyle.css";

const ListItem = ({ cardBackground, level, title }) => {
  return (
    <li className={classes.listItem}>
      <div className={classes.cardContainer}>
        <div className={`${cardBackground} _3_QUJ `}>
          <div className="_3SIlB _13kYE _3SIlB">NIVEAU {level}</div>
        </div>
      </div>
      <div style={{ width: "30px" }}></div>
      <div className={classes.progressBarContainer}>
        <div className={classes.progressBarTitle}>
          <h3>{title}</h3>
        </div>
        <div className={classes.progressBar}>
          <div className={classes.progressBar_BarContainer}>
            <div style={{ width: "100%" }}>
              <div
                aria-valuemax="3"
                aria-valuemin="0"
                aria-valuenow="2"
                role="progressbar"
                style={{
                  "--web-ui_internal_progress-bar-height": "14px",
                  "--web-ui_internal_progress-bar-value": "67%",
                }}
                className={classes.progressBar_Bar}
              >
                <div className={classes.fullProgressBar}>
                  <div
                    className={classes.fullProgressBar_Content}
                    style={{ opacity: "1" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.progressBarDescription}>
            Réaliser une série de 3 jours
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
