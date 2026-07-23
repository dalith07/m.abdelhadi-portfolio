// action/message/getMessages.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function getMessages() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return messages.map((m) => ({
    id: m.id,
    content: m.content,
    interest: m.interest,
    createdAt: m.createdAt.toISOString(),
    user: {
      id: m.user.id,
      name: m.user.name ?? "Anonymous",
      email: m.user.email ?? "No email on file",
      image: m.user.image,
    },
  }));
}
