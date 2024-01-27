import Link from "next/link"

export default function MobileMenu ({ open } : { open: boolean }) {
    return (
        <div className={`${open? "block" : "hidden"} flex flex-col`}>
            <Link href="/about">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                About
                </span>
            </Link>
            <Link href="/solutions">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Solutions
                </span>
            </Link>
            <Link href="/pricing">
                <span className="block h-16 border-t border-gray-100 leading-[4rem] pl-3">
                Pricing
                </span>
            </Link>
        </div>
    )
}