"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UpdateProfileSchema } from "@/lib/validationSchema";
import type { UpdateProfileSchemaType } from "@/lib/validationSchema";

export async function updateProfile(values: UpdateProfileSchemaType) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const validatedFields = UpdateProfileSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, phoneNumber, streetAddress, city, postalCode, image } =
    validatedFields.data;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        ...(image ? { image } : {}),
        profile: {
          upsert: {
            create: { phoneNumber, streetAddress, city, postalCode },
            update: { phoneNumber, streetAddress, city, postalCode },
          },
        },
      },
    });

    return { success: "Profile updated successfully!" };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Something went wrong while saving your profile." };
  }
}
