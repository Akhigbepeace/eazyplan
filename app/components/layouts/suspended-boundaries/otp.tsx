"use client";

import React, { Suspense } from "react";
import LoadingModal from "../../molecules/loading";

const OTPLayout = React.lazy(() => import("../otp-layout"));

const SuspendedOTP = () => (
  <Suspense fallback={<LoadingModal loading />}>
    <OTPLayout />
  </Suspense>
);

export default SuspendedOTP;
