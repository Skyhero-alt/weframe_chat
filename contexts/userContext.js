import { createContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      // Firebase user is signed in
      const { displayName, email, photoURL } = firebaseUser;
      const user = {
        username: displayName,
        email,
        avatar: photoURL,
      };
      setUser(user);
    } else {
      // Firebase user is not signed in
      setUser(null);
    }
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
