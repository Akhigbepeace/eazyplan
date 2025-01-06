export type UserCredentials = {
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
};

export const defaultUserCredentials: UserCredentials = {
  email: "",
  password: "",
  phoneNumber: "",
  confirmPassword: "",
};

export type ErrorMessages = { [key: string]: string };
