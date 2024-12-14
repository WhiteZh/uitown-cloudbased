'use client';

import {Notification} from "@/lib/contexts";
import {Dispatch} from "react";

export default function NotificationBar({notifications, setNotificationsAction}: {
    notifications: Notification[],
    setNotificationsAction: Dispatch<Notification[]>,
}) {
    return (
        <div className="absolute z-[1000] w-full">
            {notifications.map(e => (
                <div
                    className={`text-center py-1.5 px-0 opacity-80 relative`}
                    style={{backgroundColor: e.color || 'lightblue'}}
                    key={e.message}
                >
                    {e.message}
                    <i
                        className="bi bi-x hover:text-[#333] cursor-pointer absolute right-2"
                        onClick={() => setNotificationsAction(notifications.filter(x => x.message != e.message))}
                    />
                </div>
            ))}
        </div>
    );
}