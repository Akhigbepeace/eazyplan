import { ErrorMessages } from "../types/auth";

const errorMessages: ErrorMessages = {
  "auth/email-already-in-use": "An account already exists with this email.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/operation-not-allowed": "Email/password accounts are not enabled.",
  "auth/weak-password": "The password is too weak.",
  "auth/wrong-password": "The password is incorrect.",
  "auth/user-not-found": "No user found with this email.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  // Add other error codes and their corresponding messages
};

export const getCustomErrorMessage = (errorCode: string): string => {
  return (
    errorMessages[errorCode] ||
    "An unexpected error occurred. Please try again."
  );
};
