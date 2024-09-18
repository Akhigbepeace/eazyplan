import type { Metadata } from "next";
import "./globals.css";
import { Lato, Montserrat } from "next/font/google";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, connectAuthEmulator } from "firebase/auth";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "EazyPlan",
  description: "Plan and achieve your goals",
};

const lato = Lato({
  subsets: ["latin"],
  display: "auto",
  weight: "400",
  variable: "--font-lato",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;

  return (
    <html lang="en" className={clsx(lato.variable, montserrat.variable)}>
      <body>{children}</body>
    </html>
  );
}
