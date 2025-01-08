export type User = {
  name: string;
  email: string;
  password: string;
  otp?: string;
  otpExpiration?: Date;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
};
