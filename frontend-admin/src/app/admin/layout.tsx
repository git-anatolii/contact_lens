import type { Metadata } from "next";

import SideBar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin Page",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex w-1/6"><SideBar /></div>
            <div className="flex w-5/6 p-6 overflow-y-auto">{children}</div>
        </div>
    );
}
