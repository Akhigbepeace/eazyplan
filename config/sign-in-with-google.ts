import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../app/firebase/config";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type GoogleSignInProps = {
  router: AppRouterInstance;
  redirectPath: string;
};

export const handleSignInWithGoogle = async (props: GoogleSignInProps) => {
  const { router, redirectPath } = props;
  try {
    const result = await signInWithPopup(auth, provider);

    if (result.user) router.push(redirectPath);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    const email = error.customData.email;

    const credential = GoogleAuthProvider.credentialFromError(error);

    console.log({ errorCode, errorMessage, email, credential });
  }
};
