"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/lib/validationSchema";
import z from "zod";
import bcrypt from "bcryptjs";
import { createLog } from "./logs";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (existingUser.status === "BANNED") {
    return { error: "You are banned and cannot log in" };
  }

  if (existingUser.status === "SUSPENDED") {
    return { error: "Your account is suspended" };
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordsMatch) {
    await createLog("ERROR", "Login failed - wrong password", { email });
    return { error: "Invalid credentials!" };
  }

  await createLog("INFO", "User credentials validated", {
    userId: existingUser.id,
    email: existingUser.email,
  });

  // Don't call signIn() here on the server — do it client-side.
  return { success: "Login successful!" };
}
