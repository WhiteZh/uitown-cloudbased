'use client';

import {ReactNode, useState} from "react";
import {Notification, User, UserAndSetUserContext} from "@/lib/contexts";
import {NotificationsAndSetNotificationsContext} from "@/lib/contexts";
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
        <div className="bg-[linear-gradient(135deg,black,#737373)] min-h-screen max-h-screen overflow-auto [scrollbar-width: none] flex flex-col">
            {showWindow && <LoginWindow onCloseAction={() => setShowWindow(false)}/>}
            <Notifications notifications={notifications} setNotificationsAction={setNotifications}/>
            <NavigationBar onOpenLoginWindowAction={() => setShowWindow(true)}/>
            <div className={`flex-grow overflow-auto flex flex-col`}>
                <NotificationsAndSetNotificationsContext.Provider value={{notifications, setNotifications}}>
                    <UserAndSetUserContext.Provider value={{user, setUser}}>
                        {children}
                    </UserAndSetUserContext.Provider>
                </NotificationsAndSetNotificationsContext.Provider>
            </div>
        </div>
    );
}