"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const RootPage = () => {
  const brandName = "/assets/images/brand-name-logo.png";
  const calendar = "/assets/images/calendar-logo.png";

  const router = useRouter();
  setTimeout(() => {
    router.push("/features");
  }, 3000);

  return (
    <div className="bg-primary flex flex-col items-center gap-5 justify-center h-screen">
      <div className="animate-fadein">
        <Image src={calendar} alt="calendar" width={160} height={146} />
      </div>
      <Image src={brandName} alt="eazyplan" width={337} height={60} />
    </div>
  );
};

export default RootPage;
