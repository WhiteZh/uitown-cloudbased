'use client';

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import {GlobalContext} from "@/lib/contexts";
import {use} from "react";

export function NavigationBar({onOpenLoginWindowAction}: {
    onOpenLoginWindowAction: () => void
}) {
    const {user} = use(GlobalContext);

    return (
        <div className="px-4 pt-4 flex flex-row justify-between items-center">
            <Link href="/" className="me-10">
                <Image src={logo} alt="UITOWN" className="w-auto h-12"/>
            </Link>
            <div className="flex-grow"></div>
            {
                user === null ? (
                    <button
                        className="text-sm mx-1 py-1.5 px-3 rounded-full text-black font-bold bg-[#1ac8db]"
                        onClick={onOpenLoginWindowAction}
                    >
                        Join in the Town
                    </button>
                ) : (

                    <Link
                        className="mx-1 h-8 w-8 rounded-full text-black font-bold bg-white flex flex-row justify-center items-center"
                        href={`/user`}
                        onClick={e => e.preventDefault()}
                    >
                        <i className="bi bi-person-fill text-2xl"></i>
                    </Link>
                )
            }
            <Link
                className="text-sm mx-1 py-1.5 px-3 rounded-full text-black font-bold bg-[#99dfec]"
                href={`/create`}
                onClick={e => e.preventDefault()}
            >
                Create
            </Link>
        </div>
    )
}