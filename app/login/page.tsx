"use client";

import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "../../config/use-form";
import { defaultUserCredentials } from "../../types/auth";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from "../components/molecules/loading";

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { handleOnChange, formValues, setFormValues } = useForm(
    defaultUserCredentials
  );
  const { email, password } = formValues;

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result) {
        if (result.ok) {
          toast.success("Successful !");
          setFormValues(defaultUserCredentials);
          router.push("/dashboard");
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordType = () => setPasswordVisibility(!passwordVisibility);

  const handleGoogleLogin = async () => {
    const googleRes = await signIn("google");

    console.log({ googleRes });
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
          <h2 className="text-2xl font-bold">Login</h2>
        </div>

        <ToastContainer />

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

            <div className="bg-white flex items-center rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300 w-full">
              <input
                required
                name="password"
                id="password"
                placeholder="Enter your password"
                type={passwordVisibility ? "text" : "password"}
                value={password}
                onChange={handleOnChange}
                className="border-none w-full focus:outline-none px-3 py-2 bg-transparent"
              />
              <button
                type="button"
                onClick={handlePasswordType}
                className="border bg-gray-300 rounded-md px-2 py-1"
              >
                <span>{passwordVisibility ? "Hide" : "Show"}</span>
              </button>
            </div>
          </div>

          <Link href="/forgot-password" className="grid text-right mb-5">
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300"
          >
            Log in
          </button>
        </form>

        <div className="w-full border-t border-t-primary my-[50px]">
          <div className="-mt-[14px] bg-main-bg w-fit px-[10px] mx-auto">
            OR
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
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

      {loading && <LoadingModal loading={loading} />}
    </>
  );
};

export default Login;
