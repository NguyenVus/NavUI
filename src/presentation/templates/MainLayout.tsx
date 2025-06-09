"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../organisms/Header";
import { Sidebar } from "../organisms/Sidebar";
import { ChatInput } from "../atoms/ChatInput";
import Footer from "@/presentation/organisms/Footer/Footer";

type Props = { children: React.ReactNode };

export const MainLayout = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth < 768) {
                setIsDesktop(false);
                setIsOpen(false);
            } else {
                setIsDesktop(true);
                setIsOpen(true);
            }
        };
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const sidebarWidth = 256;

    return (
        <div className="h-screen flex flex-col">
            <Header isOpen={isOpen} onToggleSidebar={() => setIsOpen(prev => !prev)} isDesktop={isDesktop} />

            <div className="flex min-h-screen  pt-14">
                <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} isDesktop={isDesktop} />


                <div
                    className="flex-1 flex flex-col"
                    style={{
                        marginLeft: isDesktop && isOpen ? sidebarWidth : 0,
                    }}
                >

                    <main className="flex-1 overflow-y-auto p-6 pb-48">
                        {children}
                    </main>

                </div>
            </div>
            <div
                className="fixed z-40 flex flex-col items-center justify-center w-full px-4"
                style={
                    isDesktop && isOpen
                        ? { left: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)`, bottom: 0 }
                        : { left: 0, width: "100%", bottom: 0 }
                }
            >

                <div className=" w-full max-w-3xl bg-white dark:bg-black  rounded-t-4xl">
                    <ChatInput />
                </div>
                <div className=" w-full bg-white dark:bg-black pb-2 pt-2">
                    <Footer />

                </div>

            </div>




        </div>
    );
};
