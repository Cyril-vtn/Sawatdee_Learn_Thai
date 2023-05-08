import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ListItem from "./ListItem";
import StatBox from "./StatBox";
import classes from "./UserStats.module.css";
export const UserStats = ({ user }) => {
  console.log(user);
  return (
    <div className={classes.userStatsWrapper}>
      <div className={classes.statsContainer}>
        <div className={classes.statsTitle}>
          <h2 className={classes.h2}>Statistiques</h2>
        </div>
        <div>
          <div className={classes.statsBoxContainer}>
            <StatBox
              img="https://d35aaqx5ub95lt.cloudfront.net/images/398e4298a3b39ce566050e5c041949ef.svg"
              text={user.dayStreak[0]}
              subtitle="Jours d'affilée"
            />
            <StatBox
              img="https://d35aaqx5ub95lt.cloudfront.net/images/profile/01ce3a817dd01842581c3d18debcbc46.svg"
              text={user.xp}
              subtitle="XP gagnés"
            />
            <StatBox
              img="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/8148b17e32d8706a82c02688f559e9ef.svg"
              text={user.division}
              subtitle="Division actuelle"
            />
            <StatBox
              img="https://d35aaqx5ub95lt.cloudfront.net/images/profile/3f97ae337724f7edb6dfbef23cd3a6e7.svg"
              text={user.top3}
              subtitle="Fois dans le top 3"
            />
          </div>
        </div>
      </div>
      <div className={classes.succesContainer}>
        <div className={classes.succesTitle}>
          <h2 className={classes.h2}>Succès</h2>
        </div>
        <div className={classes.succesListContainer}>
          <div className={classes.succesListWrapper}>
            <ul className={classes.succesList}>
              {/* afficher chaque succes de l'utilisateur */}
              {user.Succes.sort((a, b) => b.completed - a.completed).map(
                (succes) => {
                  return (
                    <ListItem
                      key={succes.name}
                      card={succes.img[0]}
                      cardGold={succes.img[1]}
                      title={succes.name}
                      completed={succes.completed}
                      description={succes.description}
                      tier={succes.tier}
                      tierCounts={succes.tierCounts}
                      count={succes.count}
                    />
                  );
                }
              )}
              <div className={`${classes.link} ${classes.disabled}`}>
                Afficher tout
                <span></span>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
