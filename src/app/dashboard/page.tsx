"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Dashboard() {

    const router = useRouter()

    useEffect(() => {
        
        const cookie = localStorage.getItem("business-user")
        if (!cookie) {
            router.push('/auth/sign-up')
        }
        
    },[router])

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={() => {
                localStorage.removeItem("business-user")
                router.push('/')
            }
            }>
                Sign Out
            </Button>
        </div>
    )
}