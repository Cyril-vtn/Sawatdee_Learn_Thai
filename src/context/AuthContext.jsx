import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//* IMPORT CREATION DATA
import userCreationData from "../utils/userCreationData";

//* IMPORT DE LA BASE DE DONNEES
import { db } from "../firebase/config";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { auth } from "../firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

//* CREATION DU CONTEXTE
const UserContext = createContext();

//* CREATION DU PROVIDER
export const AuthContextProvider = ({ children }) => {
  //* CREATION DE L'ETAT POUR GERER L'UTILISATEUR
  const [user, setUser] = useState({});

  //* CREATION DES FONCTIONS POUR GERER LA CREATION D'UN COMPTE, LA CONNEXION ET LA DECONNEXION
  const createUser = async (email, password, pseudo) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (UserCrudential) => {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        const user = {
          email: UserCrudential.user.email,
          uid: UserCrudential.user.uid,
          pseudo: pseudo,
          tag: `${pseudo}#${randomNumber}`,
          ...userCreationData,
        };
        //* send user to firestore database
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, user);

        setUser(user);
      }
    );
  };

  const updateProfilePhoto = async (photoUrl) => {
    // Mettre à jour l'URL de la photo de profil dans la base de données Firestore
    const userRef = doc(db, "users", user.uid);
    return await updateDoc(userRef, { photoUrl });

    // Mettre à jour l'objet utilisateur dans l'état local
    setUser((prevUser) => ({ ...prevUser, photoUrl }));
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
      //* SI L'UTILISATEUR EST DECONNECTE
      if (!currentUser) {
        setUser({});
        return;
      }

      //* RECUPERAION DE L'UTILISATEUR DANS LA BASE DE DONNEES FIRESTORE ET SET DANS L'ETAT USER
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = getDoc(userRef).then((docSnap) => {
        return setUser(docSnap.data());
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //* RENDU DU PROVIDER AVEC EN VALUE LES FONCTIONS ET L'ETAT
  return (
    <UserContext.Provider
      value={{ createUser, setUser, user, logout, signIn, updateProfilePhoto }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
