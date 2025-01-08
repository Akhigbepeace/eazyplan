"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Verified = () => {
  const router = useRouter();

  const handleContinue = () => {
    // Redirect the user to onboarding or dashboard
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600">
          Email Verified! 🎉
        </h1>
        <p className="mt-4 text-gray-700">
          Thank you for verifying your email address. You&apos;re now one step
          closer to setting and achieving your goals!
        </p>

        <div className="mt-6">
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Continue to Onboarding
          </button>
        </div>

        <div className="mt-6 text-gray-500 text-sm">
          Need help?{" "}
          <Link href="/help" className="text-blue-500 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verified;
