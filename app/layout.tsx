import type {Metadata} from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import StatefulLayout from "@/app/StatefulLayout";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: {
        template: '%s | UI Town',
        default: 'UI Town',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {

    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.png" sizes="any"/>
        </head>
        <body className={`antialiased font-[Arial]`}>
            <StatefulLayout>
                {children}
            </StatefulLayout>
        </body>
        </html>
);
}
