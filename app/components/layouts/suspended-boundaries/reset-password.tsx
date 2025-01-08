"use client";

import React, { Suspense } from "react";
import LoadingModal from "../../molecules/loading";

const ResetPasswordLayout = React.lazy(
  () => import("../reset-password-layout")
);

const SuspendedResetPassword = () => (
  <Suspense fallback={<LoadingModal loading />}>
    <ResetPasswordLayout />
  </Suspense>
);

export default SuspendedResetPassword;
