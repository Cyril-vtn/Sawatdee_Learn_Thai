import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  deleteUser,
} from "firebase/auth";

//* IMPORT CREATION DATA
import userCreationData from "../utils/userCreationData";

//* IMPORT DE LA BASE DE DONNEES
import { db, storage } from "../firebase/config";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { auth } from "../firebase/config";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

//* CREATION DU CONTEXTE
const UserContext = createContext();

//* CREATION DU PROVIDER
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //* CREATION DE L'ETAT POUR GERER L'UTILISATEUR
  const [user, setUser] = useState({});

  // !UPDATE DE L'UTILISATEUR A MODIFIE
  const updateUserInfo = async (user, data) => {
    try {
      if (data?.email !== user.email) {
        await updateEmail(user, email);
      }
      if (data?.pseudo !== user.pseudo) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { pseudo: data.pseudo });
      }
      if (data.password !== data.newPassword) {
        await updatePassword(user, data.newPassword).then(() => {
          console.log("Password updated!");
        });
      }
      if (data.photo !== user.profilPic) {
        await changeProfilePic(user, data.photo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //* CREE UN UTILISATEUR DANS FIREBASE ET DANS LA BASE DE DONNEES
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

  //* SUPPRIMER LE COMPTE UTILISATEUR DE FIREBASE ET DE LA BASE DE DONNEES
  const deleteUserPerma = async (user) => {
    const currentUser = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    // supprimer l'utilisateur de la base de données Firestore
    await deleteDoc(userRef);
    // supprimer l'utilisateur de Firebase Authentication
    await deleteUser(currentUser);
    // si l'utilisateur à une photo de profil
    if (user.profilePic) {
      const storageRef = ref(storage, `/users/${user.uid}/avatar.jpeg`);
      // supprimer la photo de profil de Firebase Storage
      await deleteObject(storageRef);
      alert("compte supprimé");
      navigate("/");
    }
    navigate("/");
  };

  //* CHANGER LA PHOTO DE PROFIL
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
      value={{
        createUser,
        setUser,
        user,
        logout,
        signIn,
        updateProfilePhoto,
        updateUserInfo,
        deleteUserPerma,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
