"use client";

import { setUserInfo } from "@/Slices/taskSlice";
import LoginScreen from "@/components/Login/LoginScreen";
import Navigation from "@/components/navigation";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthWrapper = (props) => {
  const [showLoginScreen, setShowLoginScreen] = useState(true);
  const dispatch = useDispatch();
  //   Auth Listner
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowLoginScreen(false);
        dispatch(setUserInfo(user));
      } else {
        setShowLoginScreen(true);
      }
    });
    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      {showLoginScreen ? (
        <LoginScreen />
      ) : (
        <>
          <Navigation />
          {props.children}
        </>
      )}
    </>
  );
};

export default AuthWrapper;
