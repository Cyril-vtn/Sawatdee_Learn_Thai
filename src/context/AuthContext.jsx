import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase/config";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password, displayName) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (UserCredential) => {
        set(ref(database, "users/" + UserCredential.user.uid), {
          name: displayName,
          email: email,
          uid: UserCredential.user.uid,
          createdAt: UserCredential.user.metadata.creationTime,
          level: 1,
          totalXp: 0,
          weeklyXp: 0,
          monthlyXp: 0,
          profilePicture: "",
        });
      }
    );
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
