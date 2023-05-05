import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import { doc, getDoc, updateDoc } from "firebase/firestore";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

//* CREATION DU CONTEXTE
const LessonContext = createContext();

//* CREATION DU PROVIDER
export const LessonContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [shownIndexes, setShownIndexes] = useState([]);
  const [index, setIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lessonId, setLessonId] = useState();
  const [lessonError, setLessonError] = useState(0);

  //* RECUPERATION DU CONTEXTE DE L'UTILISATEUR

  // fonction qui permet de récupérer les données de la leçon
  const fetchData = async (lessonId) => {
    setLoading(true);
    setTimeout(async () => {
      const lessonDoc = doc(db, `lessons/${lessonId}`);
      await getDoc(lessonDoc).then((doc) => {
        if (doc.exists()) {
          setData(doc.data());
          getRandomIndex();

          setLoading(false);
        } else {
          setLoading(false);
          // si ce n'est pas une lecon existante on redirige vers la page d'accueil
          navigate("/app/learn");

          setLoading(false);
        }
      });
    }, 2000);
  };

  // fonction qui permet de reset la leçon quand l'utilisateur quitte la leçon
  const resetLesson = () => {
    setData([]);
    setShownIndexes([]);
    setIndex([]);
    setLoading(true);
    setLessonError(0);
  };

  const updateUserAfterLesson = async (user, lessonId) => {
    const userRef = doc(db, "users", user.uid);
    let dayStreak = [...user.dayStreak];
    let xp = 50; // xp que l'on augmente à chaque succès
    let userSuccess = [...user.Succes];
    // Récupérez le succès de l'utilisateur === Le début d'une belle histoire
    const storySuccess = userSuccess.find(
      (success) => success.name === "Le début d'une belle histoire"
    );
    // Récupérez le succès de l'utilisateur === Sans-faute
    const noMistakeSuccess = userSuccess.find(
      (success) => success.name === "Sans-faute"
    );
    // Récupérez le succès de l'utilisateur === Puits de science
    const wellOfKnowledgeSuccess = userSuccess.find(
      (success) => success.name === "Puits de science"
    );
    //* Si aucune erreur n'est commise
    if (lessonError === 0) {
      xp += 25;
      // Si le succès === sans-faute n'est pas complété
      if (!noMistakeSuccess.completed) {
        // trouvez l'index du tierCounts en fonction du tier actuel
        const tierCountIndex = noMistakeSuccess.tierCounts.findIndex(
          (count) => count > noMistakeSuccess.count + 1
        );

        // Si le tier augmente alors ajoutez l'xp du succès
        if (tierCountIndex !== noMistakeSuccess.tier) {
          xp += noMistakeSuccess.reward.xp;
        }

        // Si l'utilisateur à fini le succès
        if (
          noMistakeSuccess.tierCounts.length === tierCountIndex &&
          noMistakeSuccess.tier === noMistakeSuccess.tierCounts[tierCountIndex]
        ) {
          // update userSucces with succes
          userSuccess = [
            ...userSuccess.filter((success) => success.name !== "Sans-faute"),
            {
              ...noMistakeSuccess,
              count: noMistakeSuccess.count + 1,
              completed: true,
              tier: tierCountIndex,
            },
          ];
        } else {
          userSuccess = [
            ...userSuccess.filter((success) => success.name !== "Sans-faute"),
            {
              ...noMistakeSuccess,
              count: noMistakeSuccess.count + 1,
              tier: tierCountIndex,
            },
          ];
        }
      }
    }

    //* Si le succès === Puits de science n'est pas complété
    if (!wellOfKnowledgeSuccess.completed) {
      // trouvez l'index du tierCounts en fonction du tier actuel
      const tierCountIndex = wellOfKnowledgeSuccess.tierCounts.findIndex(
        (count) => count > wellOfKnowledgeSuccess.count + xp
      );

      // Si le tier augmente alors ajoutez l'xp du succès
      if (tierCountIndex !== wellOfKnowledgeSuccess.tier) {
        xp += wellOfKnowledgeSuccess.reward.xp;
      }

      userSuccess = [
        ...userSuccess.filter((success) => success.name !== "Puits de science"),
        {
          ...wellOfKnowledgeSuccess,
          count: wellOfKnowledgeSuccess.count + xp,
          tier: tierCountIndex,
        },
      ];
    }

    //*  Si le succès === Le début d'une belle histoire n'est pas complété
    if (!storySuccess.completed) {
      xp += storySuccess.reward.xp;

      // Mettez à jour le succès === Le début d'une belle histoire avec le compteur à 1
      userSuccess = [
        ...userSuccess.filter(
          (success) => success.name !== "Le début d'une belle histoire"
        ),
        {
          ...storySuccess,
          count: 1,
          completed: true,
        },
      ];
    }

    //* Mettre à jour la streak de l'utilisateur
    const lastUpdate = new Date(dayStreak[1]);
    const now = new Date();
    const diffMs = now.getTime() - lastUpdate.getTime();
    const diffHours = diffMs / (3600 * 1000);
    if (diffHours >= 48) {
      const newStreak = [0, now.toDateString()];
      dayStreak = [newStreak[0], newStreak[1]];
    } else if (diffHours >= 24) {
      const newStreak = [dayStreak[0] + 1, now.toDateString()];
      dayStreak = [newStreak[0], newStreak[1]];
    }

    // Mettez à jour Firebase avec l'id de la leçon complétée et verifié si l'utilisateur n'a pas déjà complété la leçon sinon je rien ajouté
    if (!user.finished.includes(lessonId)) {
      await updateDoc(userRef, {
        finished: [...user.finished, lessonId],
      });
    }

    // Mettez à jour Firebase avec les nouvelles données de l'utilisateur (xp, succès)
    // ! tier des niveaux à définir
    await updateDoc(userRef, {
      Succes: userSuccess,
      xp: user.xp + xp,
      dayStreak: dayStreak,
    });

    // redirect to /app/learn
    navigate("/app/learn");
  };

  const getRandomIndex = () => {
    let index;
    do {
      index = Math.floor(Math.random() * 5) + 1;
    } while (shownIndexes.includes(index));
    setShownIndexes([...shownIndexes, index]);
    setIndex(index);
  };
  return (
    <LessonContext.Provider
      value={{
        loading,
        lessonId,
        setLessonId,
        setLoading,
        data,
        setData,
        fetchData,
        getRandomIndex,
        index,
        shownIndexes,
        setLessonError,
        lessonError,
        updateUserAfterLesson,
        resetLesson,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export const LessonCtx = () => {
  return useContext(LessonContext);
};
