"use client";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Loggedin = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  // const userSession = sessionStorage.getItem("user");

  console.log(user, "User");

  if (!user) router.push("/sign-in");
  // if (!user && !userSession) router.push("/sign-in");

  return (
    <div>
      <button
        onClick={() => {
          signOut(auth);
          // sessionStorage.removeItem("user");
        }}
      >
        Log Out
      </button>
      This is a protected page
    </div>
  );
};

export default Loggedin;
