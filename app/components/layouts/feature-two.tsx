import React from "react";
import Typography from "../atoms/typography";

const FeatureTwo = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center text-center p-5 h-[80vh]">
        <iframe src="https://lottie.host/embed/f672062b-8e7f-4147-b680-1494137ab732/6CXEBZ3tvw.json"></iframe>

        <div className="flex flex-col items-center mt-5 gap-3">
          <div className="whitespace-nowrap">
            <Typography
              family="montserrat"
              variant="h1"
              weight="extraBold"
              color="black"
            >
              Track Your Progress
            </Typography>
          </div>
          <Typography
            family="lato"
            variant="p"
            weight="light"
            color="black"
            opacity="xl"
          >
            Visualize your journey with interactive progress bars and reminders
            that keep you focused on achieving your long-term goals.
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-xl p-2 bg-[rgba(163,216,244,0.4)] mt-20 w-fit mx-auto">
        <div className="w-[15px] h-[15px] rounded-full bg-[#A3D8F4]" />
        <div className="w-[35px] h-[15px] rounded-full bg-[#A3D8F4]" />
        <div className="w-[15px] h-[15px] rounded-full bg-[#A3D8F4]" />
      </div>
    </div>
  );
};

export default FeatureTwo;
