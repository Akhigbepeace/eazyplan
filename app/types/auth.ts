export type UserCredentials = {
  email: string;
  password: string;
};

export const defaultUserCredentials: UserCredentials = {
  email: "",
  password: "",
};

export type ErrorMessages = { [key: string]: string };
