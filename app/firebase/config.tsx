import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

const firebaseConfig1 = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const firebaseConfig = {
  apiKey: "AIzaSyAlpxsSg07dJYBIoMfZUbxo74d2pXs-Mfg",
  authDomain: "nuclear-test.firebaseapp.com",
  projectId: "nuclear-test",
  storageBucket: "nuclear-test.appspot.com",
  messagingSenderId: "229346895614",
  appId: "1:229346895614:web:4fbe3d7a47af9edf6467af",
  measurementId: "G-6ZZZGQ2NFK"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
export { app, auth, analytics };
