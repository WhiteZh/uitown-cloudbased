import { createContext, Dispatch } from "react";

export type Notification = {
    message: string,
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

export const SetNotificationsContext = createContext<Dispatch<Notification[]>>(undefined as any);

export const UserAndSetUserContext = createContext<{
    user: User | null,
    setUser: Dispatch<User | null>
}>(undefined as any);