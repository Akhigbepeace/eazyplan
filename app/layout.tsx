import type { Metadata } from "next";
import "./globals.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const metadata: Metadata = {
  title: "EazyPlan",
  description: "Plan and achieve your goals",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
