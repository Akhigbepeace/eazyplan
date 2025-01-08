export type UserCredentials = {
  email: string;
  password: string;
  confirmPassword?: string;
  userName: string;
};

export const defaultUserCredentials: UserCredentials = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export type ErrorMessages = { [key: string]: string };
