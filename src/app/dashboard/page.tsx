"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Dashboard() {

    const router = useRouter()

    const logout = async () => {

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            })

            if (!res.ok) {
                throw new Error(await res.text())
            }

            const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

            localStorage.removeItem("business-user")
            router.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        
        const cookie = localStorage.getItem("business-user")
        if (!cookie) {
            router.push('/auth/sign-in')
        }
        
    },[router])

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={() => logout()}>
                Sign Out
            </Button>
        </div>
    )
}