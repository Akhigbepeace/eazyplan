import React from "react";
import Typography from "../atoms/typography";

const FeatureOne = () => {
  return (
    <div className="h-screen bg-secondary">
      <div className="flex flex-col items-center justify-center text-center p-5 bg-secondary h-[80vh]">
        <iframe src="https://lottie.host/embed/c045ac14-8322-47cf-b486-81b299b1d4d9/vVvfRGktKg.json"></iframe>

        <div className="flex flex-col items-center mt-5 gap-3">
          <div className="whitespace-nowrap">
            <Typography
              family="montserrat"
              variant="h1"
              weight="extraBold"
              color="black"
            >
              Easily Set Your Goals
            </Typography>
          </div>
          <Typography
            family="lato"
            variant="p"
            weight="light"
            color="black"
            opacity="xl"
          >
            Create and organize your goals with just a few taps. Prioritize and
            break them down into manageable tasks to stay on track
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-xl p-2 bg-[rgba(163,216,244,0.4)] mt-20 w-fit mx-auto">
        <div className="w-[35px] h-[15px] rounded-full bg-[#A3D8F4]" />
        <div className="w-[15px] h-[15px] rounded-full bg-[#A3D8F4]" />
        <div className="w-[15px] h-[15px] rounded-full bg-[#A3D8F4]" />
      </div>
    </div>
  );
};

export default FeatureOne;
