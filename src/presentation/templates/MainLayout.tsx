"use client";
import React, { useState, useEffect } from "react";
import { Header } from "../organisms/Header";
import { Sidebar } from "../organisms/Sidebar";
import { ChatInput } from "../atoms/ChatInput";
import Footer from "@/presentation/organisms/Footer/Footer";
import { DashboardPage } from "../pages/DashboardPage";
import { sendMessageToGemini } from "@/domain/usecases/chat/sendMessagetoGemini";

type Message = {
    sender: 'user' | 'bot';
    text?: string;
    imageBase64?: string;
};

export const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);


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

    const handleSendMessage = async (text: string, imageBase64?: string) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            if (imageBase64) {
                setMessages(prev => [...prev, { sender: 'user', imageBase64 }]);
            }

            if (text.trim() ) {
                setMessages(prev => [...prev, { sender: 'user', text }]);
            }
            const replyText = await sendMessageToGemini(text, imageBase64);
            setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
        } catch (error) {
            console.error("Lỗi gọi Gemini:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "⚠️ Hệ thống đang quá tải, vui lòng thử lại sau." }]);
        } finally {
            setIsLoading(false);
        }
    };
    // const handleSendMessage = async (text: string, imageBase64?: string) => {
    //     if (imageBase64) {
    //         const imageMessage: Message = {
    //             sender: 'user',
    //             imageBase64,
    //         };
    //         setMessages(prev => [...prev, imageMessage]);
    //     }
    //
    //     if (text.trim() !== "") {
    //         const textMessage: Message = {
    //             sender: 'user',
    //             text,
    //         };
    //         setMessages(prev => [...prev, textMessage]);
    //         // setLoading(true);
    //
    //         const replyText = await sendMessageToGemini(text, imageBase64);
    //         const botMessage: Message = {
    //             sender: 'bot',
    //             text: replyText,
    //         };
    //         setMessages(prev => [...prev, botMessage]);
    //         // setLoading(false);
    //     }
    // };



    const sidebarWidth = 256;

    return (
        <div className="h-screen flex flex-col">
            <Header isOpen={isOpen} onToggleSidebar={() => setIsOpen(prev => !prev)} isDesktop={isDesktop} />
            <div className="flex min-h-screen pt-14">
                <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} isDesktop={isDesktop} />
                <div
                    className={`
            flex-1 flex flex-col 
            transition-all duration-300
        `}
                    style={{
                        marginLeft: isDesktop ? (isOpen ? sidebarWidth : 0) : 0,
                    }}
                >
                    <main className="flex-1 overflow-y-auto p-6 pb-48">
                        <DashboardPage messages={messages} isLoading={isLoading}/>
                    </main>
                </div>
            </div>

            <div
                className="fixed  flex flex-col items-center justify-center w-full px-4 transition-all duration-300 ease-in-out"
                style={isDesktop && isOpen
                    ? { left: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)`, bottom: 0 }
                    : { left: 0, width: "100%", bottom: 0 }}
            >
                <div className="w-full max-w-3xl bg-white dark:bg-black rounded-t-4xl">
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
                <div className="w-full bg-white dark:bg-black pb-2 pt-2">
                    <Footer />
                </div>
            </div>

        </div>
    );
};
