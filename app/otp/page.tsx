"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const OTP = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp || otp.length !== 6) {
      setErrorMsg("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "OTP verified successfully!");
        setTimeout(() => {
          router.push("/onboarding");
        }, 2000);
      } else {
        setErrorMsg(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMsg("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-8 py-12">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="text-gray-600 mb-6">We've sent an OTP to {email}</p>

      <ToastContainer />

      <form onSubmit={handleVerifyOTP} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full px-3 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-primary text-center text-xl"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div className="mt-6 text-gray-500">
        Didn’t receive an OTP?{" "}
        <button
          className="text-primary font-bold"
          onClick={() => router.push(`/signup?email=${email}`)}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;
