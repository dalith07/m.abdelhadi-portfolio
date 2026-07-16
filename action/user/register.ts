"use server";

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validationSchema";
import bcrypt from "bcryptjs";
import z from "zod";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      status: "ACTIVE",
      role: "USER",
    },
  });

  // Don't call signIn here — do it client-side after registration succeeds.
  // Calling signIn inside a server action mixed with redirect:false can cause issues.

  return { success: "Account created successfully!" };
}
