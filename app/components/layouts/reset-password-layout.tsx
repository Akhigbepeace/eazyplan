"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "@/config/use-form";
import { defaultUserCredentials } from "@/types/auth";
import LoadingModal from "../molecules/loading";

const ResetPasswordLayout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { token, email } = {
    token: searchParams.get("token"),
    email: searchParams.get("email"),
  };

  const { handleOnChange, formValues, setFormValues } = useForm(
    defaultUserCredentials
  );
  const { password, confirmPassword } = formValues;

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid link or expired token.");
    }
  }, [token, email]);

  const handleResetPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status) {
        toast.success(data.message);
        setFormValues(defaultUserCredentials);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col px-[32px] py-[50px]">
        <div className="mb-[36px] flex items-center flex-col">
          <h2 className="text-2xl font-bold">Reset Your Password</h2>
        </div>

        <ToastContainer />

        <form onSubmit={handleResetPassword} className="w-full max-w-sm">
          <div className="mb-[24px]">
            <label htmlFor="password" className="block mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="mb-[24px]">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-primary border border-gray-300"
              value={confirmPassword}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>

      {loading && <LoadingModal loading={loading} />}
    </>
  );
};

export default ResetPasswordLayout;
