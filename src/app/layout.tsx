import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/toast-provider";
import { PostHogProvider } from "@/components/posthog-provider";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s - Project 0 Early Access',
        default: 'Early Access - Project 0',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden bg-white`}
            >
                <PostHogProvider>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </PostHogProvider>
            </body>
        </html>
    );
}
