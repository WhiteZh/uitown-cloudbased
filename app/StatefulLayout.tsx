'use client';

import {ReactNode, useState} from "react";
import {Notification, User, UserAndSetUserContext} from "@/lib/contexts";
import {SetNotificationsContext} from "@/lib/contexts";
import Notifications from "@/app/Notifications";
import {NavigationBar} from "@/app/NavigationBar";
import LoginWindow from "@/app/LoginWindow";


export default function StatefulLayout({children}: {
    children: ReactNode
}) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [showWindow, setShowWindow] = useState<boolean>(false);

    return (
        <div className="@apply font-[Arial] bg-[linear-gradient(135deg,black,#737373)] min-h-screen max-h-screen overflow-auto [scrollbar-width: none]">
            {showWindow && <LoginWindow onCloseAction={() => setShowWindow(false)}/>}
            <Notifications notifications={notifications} setNotificationsAction={setNotifications}/>
            <NavigationBar onOpenLoginWindowAction={() => setShowWindow(true)}/>
            <SetNotificationsContext.Provider value={setNotifications}>
                <UserAndSetUserContext.Provider value={{user, setUser}}>
                    {children}
                </UserAndSetUserContext.Provider>
            </SetNotificationsContext.Provider>
        </div>
    );
}