"use client";

import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { defaultUserCredentials } from "../../types/auth";
import { useForm } from "../../config/use-form";
import LoadingModal from "../components/molecules/loading";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { handleOnChange, formValues, setFormValues } = useForm(
    defaultUserCredentials
  );
  const { email, password, userName } = formValues;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const apiRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, email, password }),
      });

      const res = await apiRes.json();

      if (res.status) {
        toast.success(res.message);
        setFormValues(defaultUserCredentials);
        router.push(`/otp?email=${email}`);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error("An error occurred during sign-up.");
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

        <ToastContainer />

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-[24px]">
            <label htmlFor="userName" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={userName}
              onChange={handleOnChange}
              required
            />
          </div>

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
              minLength={6}
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={password}
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
          // onClick={handleGoogleSignIn}
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
