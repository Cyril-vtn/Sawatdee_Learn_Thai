import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import { collection, doc, onSnapshot } from "firebase/firestore";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { db } from "../firebase/config";

//* CREATION DU CONTEXTE
const DataContext = createContext();

//* CREATION DU PROVIDER
export const PathContextProvider = ({ children }) => {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lessonId, setLessonId] = useState();

  const s1l1Document = doc(db, `lessons/${lessonId}`);

  //* CREATION DE L'EFFECT POUR RECUPERER LES DONNEES DE LA COLLECTION PATH
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "path"), (snapshot) => {
      setPath(snapshot.docs.map((doc) => doc.data()));
    });
    setLoading(false);
    return unsub;
  }, [loading]);

  return (
    <DataContext.Provider value={{ path, loading, lessonId, setLessonId }}>
      {children}
    </DataContext.Provider>
  );
};

export const PathAuth = () => {
  return useContext(DataContext);
};
