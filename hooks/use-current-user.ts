import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  // console.log("user.role specifically:", session.data?.user?.role);

  return session.data?.user;
};
