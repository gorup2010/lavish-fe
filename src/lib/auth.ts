import { z } from "zod";

import { api, api2 } from "./api-client";
import { AuthResponse, RefreshResponse } from "@/types/api";

export const getMyAccountInformation = (): Promise<AuthResponse> => {
  return api2.get("/refresh");
};

export const refreshToken = (): Promise<RefreshResponse> => {
  return api2.get("/refresh");
};

export const logout = (): Promise<void> => {
  return api.post("/logout");
};

export const test = () => {
  return api.get("/test");
}

// TODO: test only. nhớ fix lại
export const loginInputSchema = z.object({
  //email: z.string().email({ message: "Invalid email address." }),
  email: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .trim(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const loginWithEmailAndPassword = (
  data: LoginInput
): Promise<AuthResponse> => {
  return api.post("/login", data);
};

export const registerInputSchema = z
  .object({
    email: z.string().email("Invalid email address").trim(),
    firstname: z
      .string()
      .min(1, "")
      .regex(/^[A-Za-z]*$/, "First name can only contain letters.")
      .trim(),
    lastname: z
      .string()
      .regex(/^[A-Za-z][A-Za-z]$/, "Last name can only contain letters.")
      .trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .trim(),
    confirmedPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long")
      .trim(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords do not match",
    path: ["confirmedPassword"],
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

// TODO: Fix
export const registerWithEmailAndPassword = (
  data: RegisterInput
): Promise<AuthResponse> => {
  return api.post("/register", data);
};
