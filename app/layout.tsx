import type { Metadata } from "next";
import "./globals.css";
import { Lato, Montserrat } from "next/font/google";
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className="bg-main-bg">{children}</body>
    </html>
  );
}
