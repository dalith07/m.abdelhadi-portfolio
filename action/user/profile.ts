// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use server";

// import { ProfileSchemaType } from "@/app/lib/validationSchema";
// import { auth } from "@/auth";
// import { prisma } from "@/lib/prisma";
// import { UpdateProfileSchema } from "@/lib/validationSchema";
// import { z } from "zod";

// export const createOrUpdateProfile = async (
//   values: ProfileSchemaType,
//   userId: string,
// ) => {
//   const { image, ...profileData } = values;

//   try {
//     // update profile
//     await prisma.profile.upsert({
//       where: { userId },
//       update: profileData,
//       create: {
//         userId,
//         ...profileData,
//       },
//     });

//     // 🔥 update user image
//     if (image) {
//       await prisma.user.update({
//         where: { id: userId },
//         data: { image },
//       });
//     }

//     return { success: "Profile updated successfully" };
//   } catch (error) {
//     return { error: "Something went wrong" };
//   }
// };

// // export async function updateUserProfile(
// //   values: z.infer<typeof ProfileSchema>,
// //   userId: string,
// // ) {
// //   try {
// //     // 1️⃣ validation
// //     const validated = ProfileSchema.safeParse(values);
// //     if (!validated.success) {
// //       return { error: "Invalid data" };
// //     }

// //     const { phoneNumber, streetAddress, city, postalCode, image } =
// //       validated.data;

// //     // 2️⃣ update PROFILE (upsert)
// //     await prisma.profile.upsert({
// //       where: { userId },
// //       update: {
// //         phoneNumber,
// //         streetAddress,
// //         city,
// //         postalCode,
// //       },
// //       create: {
// //         userId,
// //         phoneNumber,
// //         streetAddress,
// //         city,
// //         postalCode,
// //       },
// //     });

// //     // 3️⃣ update USER image (global avatar)
// //     if (image) {
// //       await prisma.user.update({
// //         where: { id: userId },
// //         data: {
// //           image,
// //         },
// //       });
// //     }

// //     return { success: "Profile updated successfully" };
// //   } catch (error) {
// //     console.error("UPDATE PROFILE ERROR:", error);
// //     return { error: "Something went wrong" };
// //   }
// // }

// export async function updateProfile(
//   values: z.infer<typeof UpdateProfileSchema>,
// ) {
//   const session = await auth();
//   if (!session?.user?.id) {
//     return { error: "Not authenticated" };
//   }

//   const validatedFields = UpdateProfileSchema.safeParse(values);
//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { name, phoneNumber, streetAddress, city, postalCode, image } =
//     validatedFields.data;

//   try {
//     await prisma.user.update({
//       where: { id: session.user.id },
//       data: {
//         name,
//         ...(image ? { image } : {}),
//         profile: {
//           upsert: {
//             create: { phoneNumber, streetAddress, city, postalCode },
//             update: { phoneNumber, streetAddress, city, postalCode },
//           },
//         },
//       },
//     });

//     return { success: "Profile updated successfully!" };
//   } catch (error) {
//     console.error("Failed to update profile:", error);
//     return { error: "Something went wrong while saving your profile." };
//   }
// }
