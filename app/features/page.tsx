"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FeatureOne from "../components/layouts/feature-one";
import FeatureTwo from "../components/layouts/feature-two";
import FeaturesThree from "../components/layouts/features-three";

const Features = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop={false}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      showArrows={true}
      interval={4000}
      transitionTime={2000}
    >
      <FeatureOne />
      <FeatureTwo />
      <FeaturesThree />
    </Carousel>
  );
};

export default Features;
