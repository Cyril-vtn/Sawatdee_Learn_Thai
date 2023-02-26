import React from "react";
import classes from "./ListItem.module.css";
import "./cardStyle.css";

const ListItem = ({
  card,
  cardGold,
  title,
  completed,
  description,
  tierCounts = [1],
  tier,
  count,
}) => {
  // Fonction pour calculer la progression
  function calculateProgressPercentage(count, tier, tierCounts) {
    const maxCount = tierCounts[tier];
    const percentComplete = (count / maxCount) * 100;
    return percentComplete;
  }

  // Fonction pour afficher dynamiquement le nombre dans la description
  function modifierPhrase(description, tierCounts, tier) {
    if (!tierCounts || !tierCounts[tier]) {
      // S'il n'y a pas de tierCount, on retourne la description telle quelle
      return description;
    }

    const nombreRegex = /\d+/; // Regex qui cherche un ou plusieurs chiffres
    const match = description.match(nombreRegex);

    if (!match) {
      // S'il n'y a pas de nombre dans la description, on retourne la description telle quelle
      return description;
    }
    const oldN = match[0];
    const newSring = description.replace(nombreRegex, tierCounts[tier]);
    return newSring;
  }

  return (
    <li className={classes.listItem}>
      <div className={classes.cardContainer}>
        <div className={`${completed ? cardGold : card} _3_QUJ `}>
          <div className="_3SIlB _13kYE _3SIlB">NIVEAU {tier + 1}</div>
        </div>
      </div>
      <div style={{ width: "30px" }}></div>
      <div className={classes.progressBarContainer}>
        <div className={classes.progressBarTitle}>
          <h3>{title}</h3>
          <div>{`${count}/${tierCounts[tier]}`}</div>
        </div>
        <div className={classes.progressBar}>
          <div className={classes.progressBar_BarContainer}>
            <div style={{ width: "100%" }}>
              <div
                aria-valuemax={tierCounts[tier]}
                aria-valuemin="0"
                aria-valuenow={count}
                role="progressbar"
                style={{
                  "--web-ui_internal_progress-bar-height": "14px",
                  // calculer la progression en utilisant la fonction calculateProgressPercentage
                  "--web-ui_internal_progress-bar-value": `${calculateProgressPercentage(
                    count,
                    tier,
                    tierCounts
                  )}%`,
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
            {modifierPhrase(description, tierCounts, tier)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
