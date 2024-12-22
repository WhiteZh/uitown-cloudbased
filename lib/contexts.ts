import { createContext, Dispatch } from "react";

export type Notification = {
    message: string,
    time: number,
    color?: string,
}

export type User = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
    description: string,
    icon: string | null,
};

export const NotificationsAndSetNotificationsContext = createContext<{
    notifications: Notification[],
    setNotifications: Dispatch<Notification[]>
}>(undefined as any);

export const UserAndSetUserContext = createContext<{
    user: User | null,
    setUser: (user: User | null) => void
}>(undefined as any);