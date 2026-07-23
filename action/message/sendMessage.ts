"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function sendMessage(content: string, interest: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, error: "UNAUTHENTICATED" as const };
  }

  if (!content.trim()) {
    return { success: false, error: "EMPTY_MESSAGE" as const };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { success: false, error: "UNAUTHENTICATED" as const };
  }

  const message = await prisma.message.create({
    data: {
      content: content.trim(),
      interest,
      userId: user.id,
    },
  });

  return { success: true, message };
}
