"use client";

import React, { useState, SyntheticEvent } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from "../components/molecules/loading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Someting went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col px-6 py-8">
        <div className="mb-6 flex items-center flex-col">
          <Image
            src="/assets/images/logo.png"
            width={50}
            height={50}
            alt="EazyPlan Logo"
          />
          <h2 className="text-2xl font-bold mt-2">Forgot Password</h2>
        </div>

        <ToastContainer />

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>

      {loading && <LoadingModal loading={loading} />}
    </>
  );
};

export default ForgotPassword;
