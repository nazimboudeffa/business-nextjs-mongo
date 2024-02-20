"use client"
import Header from "@/components/Header"
import { fontHeading } from "@/lib/fonts"

import { useSession } from "next-auth/react";

import Analyzer from "./analyzer"

export default function SearchEngineOptimization() {

    const { data: session } = useSession();

    return (
        <>
        <Header session = { session } />
        <header className="mt-10 flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-[980px] flex-col gap-2">
            <h1
                className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
            >
                SEO
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                Analyse your sites to be ranked in the first places on search engines.
            </p>
        </div>
        </header>
        <section className="flex flex-col gap-10 mt-10 items-center">
            {!session ? (<div>You must be loggedin</div>) : (<Analyzer />)}
        </section>
        </>
    )

}