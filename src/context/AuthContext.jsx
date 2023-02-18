import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { auth } from "../firebase/config";

//* CREATION DU CONTEXTE
const UserContext = createContext();

//* CREATION DU PROVIDER
export const AuthContextProvider = ({ children }) => {
  //* CREATION DE L'ETAT POUR GERER L'UTILISATEUR
  const [user, setUser] = useState({});

  //* CREATION DES FONCTIONS POUR GERER LA CREATION D'UN COMPTE, LA CONNEXION ET LA DECONNEXION
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  //* CREATION DE L'EFFECT POUR GERER LA CONNEXION ET LA DECONNEXION
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //* RENDU DU PROVIDER AVEC EN VALUE LES FONCTIONS ET L'ETAT
  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
