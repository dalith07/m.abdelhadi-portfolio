"use server";

import { prisma } from "@/lib/prisma";
import { UserRole, UserStatus } from "@prisma/client";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
    },
  });

  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {},
  });
  return users;
};

interface UpdateUserInput {
  userId: string;
  role: UserRole;
  status: UserStatus;
}

export async function updateUserRoleAndStatus({
  userId,
  role,
  status,
}: UpdateUserInput) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role,
        status,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Update user error:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};
