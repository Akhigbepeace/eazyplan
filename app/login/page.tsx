"use client";

import React, { SyntheticEvent, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { handleSignInWithGoogle } from "../config/sign-in-with-google";
import { useForm } from "../config/use-form";
import { defaultUserCredentials } from "../types/auth";

const Login = () => {
  const [userData, setUserData] = useState(defaultUserCredentials);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const { handleOnChange, formValues, setFormValues } = useForm(userData);
  const { email, password } = formValues;

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log("Login Res: ", { res });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-[32px] py-[50px]">
      <div className="mb-[36px] flex items-center flex-col">
        <Image
          src="/assets/images/logo.png"
          width={50}
          height={50}
          alt="EazyPlan Logo"
        />
        <h2 className="text-2xl font-bold">Login</h2>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <div className="mb-[24px]">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
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
          Log in
        </button>
      </form>

      <div className="w-full border-t border-t-primary-text my-[50px]">
        <div className="-mt-[14px] bg-main-bg w-fit px-[10px] mx-auto">OR</div>
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
        <div className="py-2 text-center w-full">Login with Google</div>
      </button>

      <div className="mt-[75px]">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-red-500 font-bold">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
