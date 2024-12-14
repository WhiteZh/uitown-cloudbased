'use client';

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export function NavigationBar() {
    return (
        <div className="px-4 pt-4 flex flex-row justify-between items-end">
            <Link href="/" className="me-10">
                <Image src={logo} alt="UITOWN" className="w-auto h-12"/>
            </Link>
            <div className="flex-grow"></div>
            <button className="text-sm self-center mx-1 py-1.5 px-3 rounded-full text-black font-bold bg-[#1ac8db]">Join in the Town</button>
            <Link
                className="text-sm self-center mx-1 py-1.5 px-3 rounded-full text-black font-bold bg-[#99dfec]"
                href={`/create`}
                onClick={e => e.preventDefault()}
            >
                Create
            </Link>
        </div>
    )
}