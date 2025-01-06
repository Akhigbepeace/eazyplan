import React from "react";
import Typography from "../atoms/typography";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link"; 

const FeaturesThree = () => {
  return (
    <div className="h-screen p-5">
      <Link
        href="/sign-up"
        className="flex items-center justify-end gap-2 underline"
      >
        <Typography family="lato" variant="p" weight="light" color="black">
          Continue
        </Typography>

        <FaArrowRight scale={40} />
      </Link>
      <div className="flex flex-col items-center justify-center text-center h-[80vh]">
        <iframe src="https://lottie.host/embed/ba14cb05-bc9e-401d-a8b2-97b3045b3618/DPY8D5mSkf.json"></iframe>

        <div className="flex flex-col items-center mt-5 gap-3">
          <div className="whitespace-nowrap"></div>
          <Typography
            family="montserrat"
            variant="h1"
            weight="extraBold"
            color="black"
          >
            AI Powered Suggestions
          </Typography>
          <Typography
            family="lato"
            variant="p"
            weight="light"
            color="black"
            opacity="xl"
          >
            Receive smart, personalized goal suggestions tailored to your
            interests and aspirations.
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-xl p-2 bg-[rgba(163,216,244,0.4)] mt-10 w-fit mx-auto">
        <div className="w-[15px] h-[15px] rounded-full bg-[#A3D8F4]" />
        <div className="w-[15px] h-[15px] rounded-full bg-[#A3D8F4]" />
        <div className="w-[35px] h-[15px] rounded-full bg-[#A3D8F4]" />
      </div>
    </div>
  );
};

export default FeaturesThree;
