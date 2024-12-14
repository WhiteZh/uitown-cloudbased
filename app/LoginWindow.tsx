'use client';

import {useRef} from "react";
import {zhiMangXingFont} from "@/lib/fonts";

export default function LoginWindow({onCloseAction}: {
    onCloseAction: () => void,
}) {
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    function login() {

    }

    return (
        <>
            <div className="z-10 absolute h-screen w-screen opacity-30 bg-black" onClick={onCloseAction}></div>
            <div
                className="h-[368px] w-[560px] absolute bg-[linear-gradient(90deg,#8c52ff,#5ce1e6)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] flex flex-col z-10"
            >
                <div className={`${zhiMangXingFont.className} text-5xl text-white py-4 self-center mb-5`}>UITOWN</div>
                <div className="flex flex-col">
                    <div className="flex flex-row mb-3 justify-center">
                        <input placeholder="username/email"
                               className="h-11 w-80 rounded-full my-1.5 ms-1.5 outline-0 ps-0.5 font-mono text-xs text-center"
                               ref={emailInput}
                               onKeyDown={e => {if (e.key == 'Enter') passwordInput.current?.focus()}}
                        />
                    </div>
                    <div className="flex flex-row mb-3 justify-center">
                        <input placeholder="password" type="password"
                               className="h-11 w-80 rounded-full my-1.5 ms-1.5 outline-0 ps-0.5 font-mono text-xs text-center"
                               ref={passwordInput}
                               onKeyDown={e => {if (e.key == 'Enter') login()}}
                        />
                    </div>
                    <button
                        className="mb-7 h-10 px-5 rounded-full bg-[#4e2780] text-white font-bold text-sm self-center my-2 cursor-pointer"
                        onClick={login}
                    >
                        Login/Registration
                    </button>
                    <div className="buttons flex flex-row justify-center *:text-[#4e2780] *:w-8 *:h-8 *:cursor-pointer *:mx-0.5">
                        <button>
                            <i className="bi bi-github"></i>
                        </button>
                        <button>
                            <i className="bi bi-twitter-x"></i>
                        </button>
                        <button>
                            <i className="bi bi-instagram"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}