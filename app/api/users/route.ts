import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  const formatted = users.map((u) => ({
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

  const total = await prisma.user.count();
  const newSignups = await prisma.user.count({
    where: {
      createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    },
  });

  return NextResponse.json({
    users: formatted,
    stats: { total, activeThisWeek: total, newSignups },
  });
}
