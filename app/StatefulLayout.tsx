'use client';

import {ReactNode, useEffect, useState} from "react";
import {GlobalContext, Notification, User} from "@/lib/contexts";
import Notifications from "@/app/Notifications";
import {NavigationBar} from "@/app/NavigationBar";
import LoginWindow from "@/app/LoginWindow";
import {match, P} from "ts-pattern";


export default function StatefulLayout({children}: {
    children: ReactNode
}) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [showWindow, setShowWindow] = useState<boolean>(false);

    useEffect(() => {
        const rawUserInfo = sessionStorage.getItem("user");

        if (rawUserInfo === null) return;

        const userInfo: User | null = match(JSON.parse(rawUserInfo))
            .with(P.select({
                id: P.number,
                name: P.string,
                email: P.string,
                password_hashed: P.string,
                aboutme: P.string,
                icon: P.union(null, P.string)
            }), it => it)
            .otherwise((it) => {
                console.error("Unexpected userInfo in sessionStorage");
                console.error(it);
                return null;
            });

        if (userInfo === null) {
            sessionStorage.removeItem("user");
            return;
        }

        setUser(userInfo);
    }, []);

    function updateUser(newUser: User | null): void {
        if (newUser !== null) {
            sessionStorage.setItem("user", JSON.stringify(newUser));
        } else {
            sessionStorage.removeItem("user");
        }
        setUser(newUser);
    }

    function createNotification(message: string, options?: {color?: string}): void {
        const notification: Notification = {message, time: Date.now()};

        if (options) {
            if (options.color) {
                notification.color = options.color;
            }
        }

        setNotifications([...notifications, notification]);
    }

    return (
        <GlobalContext.Provider value={{user, updateUser, notifications, createNotification}}>
            <div
                className="bg-[linear-gradient(135deg,black,#737373)] min-h-screen max-h-screen overflow-auto [scrollbar-width: none] flex flex-col">
                {showWindow && <LoginWindow onCloseAction={() => setShowWindow(false)}/>}
                <Notifications notifications={notifications} setNotificationsAction={setNotifications}/>
                <NavigationBar onOpenLoginWindowAction={() => setShowWindow(true)}/>
                <div className={`flex-grow overflow-auto flex flex-col`}>
                    {children}
                </div>
            </div>
        </GlobalContext.Provider>
    );
}