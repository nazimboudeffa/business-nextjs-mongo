"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {

    const { data: session } = useSession();

    return (
        <div>
            <h1>Dashboard</h1>
            {session && <p className="text-2xl tracking-normal py-10 font-semibold">{session.user?.email}</p>}
            <Button onClick={() => signOut()}>
                Sign Out
            </Button>
        </div>
    )
}