import { UserAuthFormSignUp } from "@/components/user-auth-form-sign-up"
import Link from "next/link"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'

export default async function SignUp() {
    
    const session = await getServerSession(authOptions);

    if (session) redirect("/dashboard");

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className="absolute left-4 top-4 md:left-8 md:top-8"
            >
                <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                    Home
                </>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Sign up
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        By signing in, you agree to our <Link href="/tos"><u>Terms of Service</u></Link> and <Link href="/privacy-policy"><u>Privacy Policy</u></Link>
                    </p>
                </div>
                <UserAuthFormSignUp />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/auth/sign-in"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Already have an account? Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}