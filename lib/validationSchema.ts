import { z } from "zod";

// Register Schema
export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Login Schema
export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const ProfileSchema = z.object({
  phoneNumber: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  image: z.string().optional(), // 🔥 مهم
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
