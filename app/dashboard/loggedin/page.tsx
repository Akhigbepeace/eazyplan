"use client";

import React from "react";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Loggedin = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
      This is a protected page
    </div>
  );
};

export default Loggedin;
