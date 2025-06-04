"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../organisms/Header";
import { Sidebar } from "../organisms/Sidebar";

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

    return (
        <div>
            <Header isOpen={isOpen} onToggleSidebar={() => setIsOpen(prev => !prev)} isDesktop={isDesktop} />


            <div className="flex min-h-screen pt-14">
                <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} isDesktop={isDesktop} />

                <main
                    className={`flex-1 p-6 transition-all duration-300`}
                    style={{
                        marginLeft: isDesktop && isOpen ? 256 : 0,
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};
