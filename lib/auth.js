import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

function formatUser(user) {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
  };
}

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser);

      setUser(user);

      return user;
    }

    setUser(false);

    return false;
  }

  const signinWithGithub = () => {
    return firebase
      .default
      .auth()
      .signInWithPopup(new firebase.default.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  }

  const signout = () => {
    return firebase
      .default
      .auth()
      .signOut()
      .then(() => handleUser(false));
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