import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import { collection, onSnapshot } from "firebase/firestore";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { db } from "../firebase/config";

//* CREATION DU CONTEXTE
const DataContext = createContext();

//* CREATION DU PROVIDER
export const PathContextProvider = ({ children }) => {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);

  //* CREATION DE L'EFFECT POUR RECUPERER LES DONNEES DE LA COLLECTION PATH
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "path"), (snapshot) => {
      setPath(snapshot.docs.map((doc) => doc.data()));
    });
    setLoading(false);
    return unsub;
  }, [loading]);

  //* RENDU DU PROVIDER AVEC EN VALUE LES FONCTIONS ET L'ETAT
  return (
    <DataContext.Provider value={{ path, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const PathAuth = () => {
  return useContext(DataContext);
};
