"use client";

import React, { SyntheticEvent, useState } from "react";
import { actionCodeSettings, auth, provider } from "../firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { defaultUserCredentials } from "../types/auth";
import { useForm } from "../config/use-form";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "firebase/auth";
import Modal from "../components/layouts/modal";
import { getCustomErrorMessage } from "../config/error-map";
import { handleSignInWithGoogle } from "../config/sign-in-with-google";

const SignUp = () => {
  const [userData, setUserData] = useState(defaultUserCredentials);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { handleOnChange, formValues, setFormValues } = useForm(userData);
  const { email, password } = formValues;

  const handleSendLinkToEmail = async () => {
    setLoading(true);
    try {
      const res = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      console.log("Email Verification Res:", { res });
      window.localStorage.setItem("emailForSignIn", email);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // const user = userCredential.user;
      handleSendLinkToEmail();

      // if (user) {
      //   console.log(user);
      //   setSuccessMsg("Kindly check your email for a verification link!");
      // }
    } catch (error: any) {
      const customErrorMsg = getCustomErrorMessage(error.code);
      setErrorMsg(customErrorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col px-[32px] py-[50px]">
        <div className="mb-[36px] flex items-center flex-col">
          <Image
            src="/assets/images/logo.png"
            width={50}
            height={50}
            alt="EazyPlan Logo"
          />
          <h2 className="text-2xl font-bold">Create an Account</h2>
        </div>

        {/* Success and Error Messages */}
        {errorMsg && (
          <div className="mb-4 w-full max-w-sm bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 w-full max-w-sm bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative">
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-[24px]">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@myemail.com"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-[24px]">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={password}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-text text-white py-2 rounded-md hover:bg-primary hover:text-primary-text transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="w-full border-t border-t-primary-text my-[50px]">
          <div className="-mt-[14px] bg-main-bg w-fit px-[10px] mx-auto">
            OR
          </div>
        </div>

        <button
          onClick={handleSignInWithGoogle}
          className={clsx(
            "w-full max-w-sm flex rounded-sm",
            "bg-blue-500 text-white"
          )}
        >
          <div className="bg-white h-[40px] w-[40px] flex justify-center items-center">
            <Image
              src="/assets/images/google.png"
              width={20}
              height={20}
              alt="Google Logo"
            />
          </div>
          <div className="py-2 text-center w-full">Sign up with Google</div>
        </button>

        <div className="mt-[75px]">
          Already have an account?
          <Link href="/login" className="text-red-500 font-bold">
            Login
          </Link>
        </div>
      </div>

      {loading && (
        <Modal>
          <div className="mx-auto w-[50px] h-[50px] relative">
            <Image
              src="/assets/images/logo.png"
              alt="EazyPlan Logo"
              fill
              className="animate-ping"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default SignUp;
