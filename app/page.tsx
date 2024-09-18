import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      Welcome to Eazy Plan
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
};

export default Home;
 