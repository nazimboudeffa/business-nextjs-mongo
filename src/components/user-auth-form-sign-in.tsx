"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { singUpSchema } from "@/lib/validators"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";

type FormData = z.infer<typeof singUpSchema>

export function UserAuthFormSignIn() {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(singUpSchema),
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

    async function onSubmit(cred : FormData) {
        setIsLoading(true)

        try {
            const res = await signIn("credentials", {
                email: cred.email,
                password: cred.password,
                redirect: false,
            });
            
            if (res?.error) {
                throw new Error(res.error)
            }

            setIsLoading(false)
        
            router.push("/dashboard");

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    const handleSignInWithGoogle = async() => {
        setIsGoogleLoading(true)

        setIsGoogleLoading(false)
    }

    return (
        <div className="grid gap-6 max-w-[400px] md:max-w-[500px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="username@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        {errors?.email && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("password")}
                        />
                        {errors?.password && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        className={cn(buttonVariants())}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign in with Email
                    </button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => {
                    setIsGoogleLoading(true)
                    handleSignInWithGoogle()
                }}
                disabled={isLoading || isGoogleLoading}
            >
                {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Sign In with Google
            </button>
        </div>
    )
}