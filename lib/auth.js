import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signinWithGithub = () => {
    return firebase
      .default
      .auth()
      .signInWithPopup(new firebase.default.auth.GithubAuthProvider())
      .then((response) => {
        setUser(response.user);

        return response.user;
      });
  }

  const signout = () => {
    return firebase
      .default
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  }

  useEffect(() => {
    const unsubscribe = firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }), [];

  return {
    user,
    signinWithGithub,
    signout,
  };
}