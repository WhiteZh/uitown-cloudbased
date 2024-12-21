import {coolJazzFont} from "@/lib/fonts";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Browse"
}

export default function Browse() {
    return (
        <div className={`grid grid-cols-[14rem_auto] grid-rows-[auto_auto]`}>
            <div className={`col-start-1 row-start-1`}/>
            <div className="px-2 text-[#D0C3F1] col-start-2 row-start-1">
                <h3 className="text-2xl mt-7 mb-1.5 mx-0 font-extrabold">To Select</h3>
                <h6 className={`${coolJazzFont.className} tracking-[0.2rem] font-extrabold italic indent-8 my-3 mx-0 text-xs`}>
                    Choose the code of your choice
                </h6>
            </div>
            <div className={`flex flex-row col-start-1 row-start-2`}>
                <div className={`w-full flex flex-col px-5`}>
                    <Link href="/browse" className={`rounded-full hover:bg-[#272030] ps-4 pe-5 py-2 text-white text-lg font-extrabold`}>All</Link>
                    {/*<hr className={`border-neutral-50 border-opacity-70 my-1 mx-1`}/>*/}
                </div>
                <div className={`flex-grow`}>

                </div>
            </div>
            <div className={`col-start-2 row-start-2`}>

            </div>
        </div>
    )
}