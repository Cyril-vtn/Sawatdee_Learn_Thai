import React, { createContext, useContext, useEffect, useState } from "react";

//* IMPORT DES FONCTIONS DE FIREBASE
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  deleteUser,
  updatePassword,
} from "firebase/auth";

//* IMPORT CREATION DATA
import userCreationData from "../utils/userCreationData";

//* IMPORT DE LA BASE DE DONNEES
import { db, storage } from "../firebase/config";

//* IMPORT DE LA CONFIGURATION DE FIREBASE
import { auth } from "../firebase/config";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

//* CREATION DU CONTEXTE
const UserContext = createContext();

//* CREATION DU PROVIDER
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //* CREATION DE L'ETAT POUR GERER L'UTILISATEUR
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [userProfilePhoto, setUserProfilePhoto] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );

  //*-------------------------- MODIFIER LA PHOTO DE PROFIL DE L'UTILISATEUR -------------------------- */
  const changeProfilePic = async (photo) => {
    // RECUPERATION DE LA PHOTO
    const type = photo.type.split("/")[1];
    // Stockage de la nouvelle photo sur Firebase Storage
    const storageRef = ref(storage, `/users/${user.uid}/avatar.${type}`);
    // SUPPRESSION DE L'ANCIENNE PHOTO DE PROFIL
    if (user.profilePic) {
      const oldProfilePicRef = ref(storage, user.profilePic);
      await deleteObject(oldProfilePicRef);
    }

    const snapshot = await uploadBytes(storageRef, photo);
    //MISE A JOUR DE LA PHOTO DE PROFIL DANS LE STATE USER
    setUser({ ...user, profilePic: snapshot.ref.fullPath });

    // TELECHARGEMENT DE LA PHOTO DE PROFIL DANS LE STATE PHOTO
    getDownloadURL(snapshot.ref).then((url) => {
      setPhoto(url);
      setUserProfilePhoto(url);
    });

    // MISE A JOUR DU SUCCES PHOTOG??NIQUE
    const photogenicSuccess = user.Succes.find(
      (success) => success.name === "Photog??nique"
    );
    if (photogenicSuccess && photogenicSuccess.count === 0) {
      // Si le compteur est ?? 0, mettez ?? jour le succ??s Photog??nique avec le compteur ?? 1
      const updatedSuccess = {
        ...photogenicSuccess,
        count: 1,
        completed: true,
      };
      const updatedSuccesses = [
        ...user.Succes.filter((success) => success.name !== "Photog??nique"),
        updatedSuccess,
      ];
      // Mettez ?? jour l'utilisateur dans Firestore avec le succ??s mis ?? jour
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profilePic: snapshot.ref.fullPath,
        Succes: updatedSuccesses,
      });
    } else {
      // Mettez ?? jour l'utilisateur dans Firestore avec le champ profilePic mis ?? jour
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { profilePic: snapshot.ref.fullPath });
    }
  };

  //* -------------------------- MODIFIER DE (PSEUDO,EMAIL,MDP,PHOTO DE PROFIL) DE L'UTILISATEUR -------------------------- */

  const updateUser = async (data) => {
    const isValidPseudo = /^[a-zA-Z0-9]+$/.test(data.pseudo);
    if (!isValidPseudo) {
      setError(
        "Le pseudo ne doit pas contenir d'espace ou de caract??res sp??ciaux"
      );
      return;
    }

    // si le mot de passe est vide
    if (data.password === "" || data.password === undefined) {
      setError("veuillez indiquer votre mot de passe");
      return;
    }
    // si les mots de passe sont identiques
    if (data.password === data.newPassword) {
      setError("veuillez entrer un nouveau mot de passe");
      return;
    }
    //  si le nouveau mot de passe est plus petit que 6 caract??res
    if (data.newPassword !== undefined && data.newPassword.length < 6) {
      setError("le mot de passe doit contenir au moins 6 caract??res");
      return;
    }
    // reconnectez l'utilsateur avant de modifier ses donn??es (s??curit?? de firebase)
    try {
      const userCrudential = await signInWithEmailAndPassword(
        auth,
        user.email,
        data.password
      );
    } catch (error) {
      setError("mot de passe incorrect");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    // si l'email est diff??rent de l'email actuel
    if (data.email && data.email !== user.email) {
      // mettez ?? jour l'email dans Firestore
      await updateDoc(userRef, { email: data.email });
      await updateEmail(auth.currentUser, data.email);
    }
    if (data.newPassword !== undefined && data.newPassword !== data.password) {
      await updatePassword(auth.currentUser, data.newPassword);
    }

    // si le pseudo est diff??rent du pseudo actuel
    if (data.pseudo && data.pseudo !== user.pseudo) {
      // recup??r?? le nombre random dans le tag de l'utilisateur actuel
      const previousTag = user.tag.split("#")[1];
      const newPseudoWithTag = `${data.pseudo}#${previousTag}`;

      // mettre ?? jour le pseudo et le tag dans le state
      setUser({ ...user, pseudo: data.pseudo, tag: newPseudoWithTag });

      // mettez ?? jour le pseudo dans Firestore
      await updateDoc(userRef, { pseudo: data.pseudo, tag: newPseudoWithTag });
    }
    if (data.photo !== user.profilePic) {
      await changeProfilePic(data.photo);
    }

    alert("modification effectu??e avec succ??s !");
    // redirigier l'utilisateur vers la page profile

    navigate(`app/profile/${data.pseudo}#${user.tag.split("#")[1]}`);
  };

  //* -------------------------- CREE UN UTILISATEUR DANS FIREBASE ET DANS LA BASE DE DONNEES -------------------------- */
  const createUser = async (email, password, pseudo) => {
    const UserCrudential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
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
    setIsLoggedIn(true);
    setUser(user);
  };

  //* -------------------------- SUPPRIMER LE COMPTE UTILISATEUR DE FIREBASE ET DE LA BASE DE DONNEES -------------------------- */
  const deleteUserPerma = async (user, password) => {
    const currentUser = auth.currentUser;
    // ! reauthentifier l'utilisateur avant de supprimer son compte (s??curit?? de firebase)
    try {
      const userCrudential = await signInWithEmailAndPassword(
        auth,
        user.email,
        password
      );
    } catch (error) {
      setError("mot de passe incorrect");
      return;
    }
    // si l'utilisateur ?? une photo de profil
    if (user?.profilePic) {
      const storageRef = ref(storage, user.profilePic);
      // supprimer la photo de profil de Firebase Storage
      await deleteObject(storageRef);
    }
    const userRef = doc(db, "users", user.uid);
    // supprimer l'utilisateur de la base de donn??es Firestore
    await deleteDoc(userRef);
    // supprimer l'utilisateur de Firebase Authentication
    await deleteUser(currentUser);
    setPhoto("");
    alert("compte supprim??");
    navigate("/register");
  };

  const signIn = (email, password) => {
    setIsLoggedIn(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setPhoto("");
    return signOut(auth);
  };

  //* -------------------------- CREATION DE L'EFFECT POUR GERER LA CONNEXION ET LA DECONNEXION -------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("isLoggedIn", isLoggedIn);
      //* SI L'UTILISATEUR EST DECONNECTE
      if (!currentUser) {
        setIsLoggedIn(false);
        setUser({});
        return;
      }

      // RECUPERAION DE L'UTILISATEUR DANS LA BASE DE DONNEES FIRESTORE ET SET DANS L'ETAT USER
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = getDoc(userRef).then((docSnap) => {
        const user = docSnap.data();
        if (user?.profilePic) {
          getDownloadURL(ref(storage, user.profilePic)).then((url) => {
            setPhoto(url);
          });
        }
        return setUser(docSnap.data());
      });
    });

    return () => {
      unsubscribe();
    };
  }, [photo, user?.profilePic]);

  //* RENDU DU PROVIDER AVEC EN VALUE LES FONCTIONS ET L'ETAT
  return (
    <UserContext.Provider
      value={{
        createUser,
        setUser,
        user,
        logout,
        signIn,
        deleteUserPerma,
        photo,
        setPhoto,
        setIsLoggedIn,
        isLoggedIn,
        changeProfilePic,
        userProfilePhoto,
        setUserProfilePhoto,
        error,
        setError,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
