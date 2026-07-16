'use client';

import { useSession, signOut } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

export default function BannedGuard({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "authenticated") return;

        if (session?.user?.isBanned) {
            alert(session.error || "Your account has been blocked!");
            signOut();
        }
    }, [session, status]);

    return <>{children}</>;
}
