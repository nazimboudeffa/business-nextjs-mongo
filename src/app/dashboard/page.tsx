"use client"

import { useEffect } from 'react'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/navigation'

export default function Dashboard() {

    const router = useRouter()

    useEffect(() => {
        const cookies = parseCookies()
        const token = cookies['jwt']

        console.log(token)

        if (!token) {
            router.push('/auth/sign-in')
        }
    },[router])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}