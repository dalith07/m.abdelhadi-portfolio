// action/user/update-profile.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(values: {
  name?: string;
  phoneNumber?: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  image?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const userId = session.user.id;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: values.name,
        image: values.image,
        profile: {
          upsert: {
            create: {
              phoneNumber: values.phoneNumber,
              streetAddress: values.streetAddress,
              city: values.city,
              postalCode: values.postalCode,
            },
            update: {
              phoneNumber: values.phoneNumber,
              streetAddress: values.streetAddress,
              city: values.city,
              postalCode: values.postalCode,
            },
          },
        },
      },
    });
    return { success: "Profile updated" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: "Something went wrong" };
  }
}
