'use client';

import {ReactNode, useState} from "react";
import {Notification} from "@/lib/contexts";
import {SetNotifications} from "@/lib/contexts";
import NotificationBar from "@/app/(client)/NotificationBar";


export default function Layout({children}: {
    children: ReactNode
}) {
    const [notifications, setNotifications] = useState<Notification[]>([{message: 'hi'}]);

    return (
        <>
            <NotificationBar notifications={notifications} setNotificationsAction={setNotifications}/>
            <SetNotifications.Provider value={setNotifications}>
                {children}
            </SetNotifications.Provider>
        </>
    );
}