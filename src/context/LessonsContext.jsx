import React, { createContext, useContext, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import { collection, getDocs } from "firebase/firestore";
//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { db } from "../firebase/config";

//* CREATION DU CONTEXTE
const LessonsContext = createContext();

//* CREATION DU PROVIDER
export const LessonsContextProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [lesson, setLesson] = useState();
  const [loading, setLoading] = useState(false);

  // * FONCTION POUR RECUPERER UNE LECON AVEC UN IDEE DONNE EN PARAMETRE PAR LE BOUTON CLIQUÉ
  // const lessonRef = doc(db, `lessons/${id}`);
  // useEffect(() => {
  //   const lessonQuiz = getDoc(lessonRef);
  //   setLesson(lessonQuiz);
  //   setLoading(false);
  //   return lessonQuiz;
  // }, [loading]);

  const getLesson = async (id) => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, `lessons/${id}`));
    querySnapshot.forEach((doc) => {
      setLesson(doc.data());
      setLoading(false);
    });
  };

  //* RENDU DU PROVIDER AVEC EN VALUE LES FONCTIONS ET L'ETAT
  return (
    <LessonsContext.Provider value={{ id, setId, getLesson, lesson, loading }}>
      {children}
    </LessonsContext.Provider>
  );
};

//* RENVOYER LE CONTEXTE DEPUIS CETTE FONCTION
export const useLessonsCtx = () => {
  return useContext(LessonsContext);
};
