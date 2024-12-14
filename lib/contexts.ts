import { createContext, Dispatch } from "react";

export type Notification = {
    message: string,
    color?: string,
}

export const SetNotifications = createContext<Dispatch<Notification[]>>(undefined as any);

