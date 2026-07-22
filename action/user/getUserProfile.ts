// import { prisma } from "@/lib/prisma";

// export async function getUsers() {
//   const users = await prisma.user.findMany({
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
//       name: true,
//       handle: true,
//       createdAt: true,
//       status: true,
//     },
//   });

//   return users.map((u) => ({
//     id: u.id,
//     name: u.name ?? "Anonymous",
//     handle: u.handle ?? `guest_${u.id.slice(0, 6)}`,
//     joined: new Intl.DateTimeFormat("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     }).format(u.createdAt),
//     status: u.status ?? "Active",
//   }));
// }

// export async function getUserStats() {
//   const total = await prisma.user.count();
//   const activeThisWeek = await prisma.user.count({
//     where: {
//       lastActiveAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
//     },
//   });
//   const newSignups = await prisma.user.count({
//     where: {
//       createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
//     },
//   });

//   return { total, activeThisWeek, newSignups };
// }
"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name ?? "Anonymous",
    handle: u.email ?? `guest_${u.id.slice(0, 6)}`,
    joined: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(u.createdAt),
    status: "Active",
  }));
}

export async function getUserStats() {
  const total = await prisma.user.count();
  const newSignups = await prisma.user.count({
    where: {
      createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    },
  });
  return { total, activeThisWeek: total, newSignups };
}

export async function getUserProfile(userId: string) {
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        image: true,
        profile: {
          select: {
            phoneNumber: true,
            streetAddress: true,
            city: true,
            postalCode: true,
          },
        },
      },
    });

    if (!user) return null;

    // flatten so the component doesn't need to know about the nested relation
    return {
      image: user.image,
      phoneNumber: user.profile?.phoneNumber ?? "",
      streetAddress: user.profile?.streetAddress ?? "",
      city: user.profile?.city ?? "",
      postalCode: user.profile?.postalCode ?? "",
    };
  } catch (error) {
    console.error("getUserProfile error:", error);
    return null;
  }
}
