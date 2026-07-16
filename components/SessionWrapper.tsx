'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, } from 'react';
import BannedGuard from './banned-guard';

export default function SessionWrapper({ children }: { children: ReactNode }) {
    return (
        <SessionProvider refetchOnWindowFocus={false}>
            <BannedGuard>
                {children}
            </BannedGuard>
        </SessionProvider>
    );
}
