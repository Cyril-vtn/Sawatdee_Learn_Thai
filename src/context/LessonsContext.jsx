import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import { collection, onSnapshot } from "firebase/firestore";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { db } from "../firebase/config";

//* CREATION DU CONTEXTE
const LessonsContext = createContext();

//* CREATION DU PROVIDER
export const LessonsContextProvider = ({ children }) => {
  const [id, setId] = useState();
  const [lesson, setLesson] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetLesson = (id) => {
    setLoading(true);
    const lesson = onSnapshot(collection(db, "lessons"), (snapshot) => {
      setLesson(snapshot.docs.map((doc) => doc.data()));
      setLoading(false);
    });
  };

  //* RENDU DU PROVIDER AVEC EN VALUE LES FONCTIONS ET L'ETAT
  return (
    <DataContext.Provider value={{ path, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const LessonsCtx = () => {
  return useContext(LessonsContext);
};
