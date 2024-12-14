'use client';

import {ReactNode, useState} from "react";
import {Notification} from "@/lib/contexts";
import {SetNotifications} from "@/lib/contexts";
import NotificationBar from "@/app/NotificationBar";


export default function StatefulLayout({children}: {
    children: ReactNode
}) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    return (
        <div className="@apply font-[Arial] bg-[linear-gradient(135deg,black,#737373)] min-h-screen max-h-screen overflow-auto [scrollbar-width: none]">
            <NotificationBar notifications={notifications} setNotificationsAction={setNotifications}/>
            <SetNotifications.Provider value={setNotifications}>
                {children}
            </SetNotifications.Provider>
        </div>
    );
}