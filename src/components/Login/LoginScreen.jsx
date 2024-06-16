/* eslint-disable react/no-unescaped-entities */
"use client";

import { auth } from "@/firebaseConfig";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import mindImage from "../../../public/mind.jpg";
import SubmitButton from "../Buttons/SubmitButton";
import ErrorMessage from "../Errors/ErrorMessageLogin";

export default function LoginScreen() {
  // States
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handler
  const submitHandler = (event) => {
    event.preventDefault();
    if (isSignUp) {
      if (username == "" || password == "" || confirmPassword == "") {
        setInvalid(true);
        setErrorMessage("Please Fill All Feilds");
      }
      if (confirmPassword !== password) {
        setInvalid(true);
        setErrorMessage("Password didn't match !!!!");
      } else {
        createUserWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // ...
            console.log(user, userCredential);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setInvalid(true);
            setErrorMessage(errorMessage);
            // ..
          });
      }
      setPassword("");
      setUserName("");
      setConfirmPassword("");
    } else {
      signInWithEmailAndPassword(auth, username, password)
        .then((cred) => {
          console.log(cred);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setInvalid(true);
          setErrorMessage(errorMessage);
          // ..
        });
    }

    setPassword("");
    setUserName("");
  };

  const GoogleLogInHandler = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log("SIGNED IN WITH Google ---------------->", user, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(
          "SIGNED IN WITH GITHUB Google ---------------->",
          email,
          credential,
          errorMessage,
          errorCode
        );
      });
  };

  const GitHubLogInHandler = (event) => {
    const provider = new GithubAuthProvider();
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        console.log("SIGNED IN WITH GITHUB ---------------->", user, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(
          "SIGNED IN WITH GITHUB Error ---------------->",
          email,
          credential,
          errorMessage,
          errorCode
        );
      });
  };

  return (
    <div className="container grid grid-cols-2 gap-5 ml-48 mt-11 h-5/6 absolute">
      {/* Image */}
      <div className="border rounded-xl ">
        <Image
          alt="mind Image"
          src={mindImage}
          style={{
            width: "100%",
            height: "100%",
          }}
          className="rounded-xl"
          quality={100}
        />
      </div>
      <div className="border rounded-xl flex justify-center px-20">
        <form className="container mt-52 h-96 w-3/4">
          <h1 className="font-bold text-5xl font-lato text-gray-700">
            Sign {isSignUp ? "up" : "in"}
          </h1>
          {/* Error message */}
          {invalid && (
            <ErrorMessage message={errorMessage} setInvalid={setInvalid} />
          )}

          {/* Email*/}
          <input
            className=" my-5 flex border rounded-lg h-12  font-lato bg-inherit w-full p-2"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          ></input>
          {/* Password*/}
          <input
            className=" my-5 flex border rounded-lg h-12  font-lato bg-inherit w-full p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          {/*Confirm Password*/}
          {isSignUp && (
            <input
              className=" my-5 flex border rounded-lg h-12  font-lato bg-inherit w-full p-2"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          )}
          <SubmitButton
            heading={isSignUp ? "Register" : "Sign in"}
            callBackFunction={submitHandler}
            disabled={invalid}
          />
          {!isSignUp && (
            <>
              {/* Seperator */}
              <div className="w-full grid grid-cols-7 gap-4 mt-7">
                <span className="col-span-3 border h-0 mt-3"></span>
                <span className="col-span-1 font-lato text-gray-400 flex justify-center">
                  <span>or</span>
                </span>
                <span className="col-span-3 border h-0 mt-3"></span>
              </div>

              {/* SSO Buttons */}

              <div className="grid grid-cols-2 gap-4 mt-7">
                <SubmitButton
                  heading="Google"
                  callBackFunction={GoogleLogInHandler}
                />
                <SubmitButton
                  heading="Git Hub"
                  callBackFunction={GitHubLogInHandler}
                />
              </div>
            </>
          )}

          {/* Sign Up Link */}
          <div
            className="container flex justify-center mt-7"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            <span className="font-lato font-bold text hover:text-blue-400 cursor-pointer">
              {isSignUp
                ? "<  Already Have an Account"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
        </form>
      </div>
      {/* Form */}
    </div>
  );
}
