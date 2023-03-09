import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

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
  const [question, setQuestion] = useState();

  // fonction qui permet de récupérer les données de la leçon
  const fetchData = async (lessonId) => {
    setLoading(true);
    // setTimeout(async () => {
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

        console.log("Le document n'existe pas!");
        setLoading(false);
      }
    });
    // }, 2000);
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
        question,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export const LessonCtx = () => {
  return useContext(LessonContext);
};
