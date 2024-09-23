import type { Metadata } from "next";
import "./globals.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, connectAuthEmulator } from "firebase/auth";

export const metadata: Metadata = {
  title: "EazyPlan",
  description: "Plan and achieve your goals",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;

  return (
    <html lang="en">
      <body className="bg-main-bg text-primary-text">{children}</body>
    </html>
  );
}
