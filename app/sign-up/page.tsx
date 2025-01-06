"use client";

import React, { SyntheticEvent, useState } from "react";
import { actionCodeSettings, auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { defaultUserCredentials } from "../../types/auth";
import { useForm } from "../../config/use-form";
import twilio from "twilio";
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { getCustomErrorMessage } from "../../config/error-map";
import { handleSignInWithGoogle } from "../../config/sign-in-with-google";
import LoadingModal from "../components/molecules/loading";
// import sgMail from "@sendgrid/mail";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendgridApiKey = process.env.SENDGRID_API_KEY as string;

const SignUp = () => {
  const [userData, setUserData] = useState(defaultUserCredentials);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const client = twilio(accountSid, authToken);
  // console.log({ twilio });

  const { handleOnChange, formValues, setFormValues } = useForm(userData);
  const { email, password, confirmPassword, phoneNumber } = formValues;

  // const sendVerification = async () => {
  //   try {
  //     sgMail.setApiKey(sendgridApiKey);
  //     // const message = await client.messages.create({
  //     //   body: "This is the ship that made the Kessel Run in fourteen parsecs?",
  //     //   from: "+2349155003700",
  //     //   to: phoneNumber,
  //     // });
  //     // console.log({ message });

  //     const msg = {
  //       to: email,
  //       from: "officialeazyplan@gmail.com",
  //       subject: "Sending with Twilio SendGrid is Fun",
  //       text: "and easy to do anywhere, even with Node.js",
  //       html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  //     };
  //     const emailRes = await sgMail.send(msg);
  //     console.log({ emailRes });
  //   } catch (error) {
  //     console.error("Error sending verification:", error);
  //   }
  // };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // if (userCredential.user) {
      //   sendVerification();
      // }
    } catch (error: any) {
      setErrorMsg(getCustomErrorMessage(error.code));
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
            <label htmlFor="phoneNumber" className="block mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="+234 0123456789"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={phoneNumber}
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

          <div className="mb-[24px]">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={confirmPassword}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="w-full border-t border-t-primary my-[50px]">
          <div className="-mt-[14px] bg-main-bg w-fit px-[10px] mx-auto">
            OR
          </div>
        </div>

        <button
          onClick={() =>
            handleSignInWithGoogle({ router, redirectPath: "/onboarding" })
          }
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
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 font-bold">
            Login
          </Link>
        </div>
      </div>

      {loading && <LoadingModal loading={loading} />}
    </>
  );
};

export default SignUp;
