"use client";
import React, { useState, useEffect, } from "react";
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
    const [chatHistory, setChatHistory] = useState<{ id: string; messages: Message[] }[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);


    // 🧠 Setup layout + khởi tạo chat ID
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

        const storedHistory = localStorage.getItem("chatHistory");
        if (storedHistory) {
            try {
                const parsed = JSON.parse(storedHistory);
                setChatHistory(parsed);
            } catch (e) {
                console.error("❌ Failed to parse chatHistory:", e);
            }
        }


        setCurrentChatId(prev => prev ?? crypto.randomUUID());

        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);


    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);


    useEffect(() => {
        if (!currentChatId) return;
        setChatHistory(prev => {
            const index = prev.findIndex(chat => chat.id === currentChatId);
            if (index !== -1) {
                const updated = [...prev];
                updated[index] = { id: currentChatId, messages };
                return updated;
            }
            return [...prev, { id: currentChatId, messages }];
        });
    }, [messages, currentChatId]);

    const getCurrentMessages = () => {
        return chatHistory.find(chat => chat.id === currentChatId)?.messages || [];
    };


    const handleSendMessage = async (text: string, imageBase64?: string) => {
        if (isLoading) return;

        setIsLoading(true);

        // 1. Đảm bảo có chat ID hiện tại
        let activeChatId = currentChatId;
        if (!activeChatId) {
            activeChatId = crypto.randomUUID();
            setCurrentChatId(activeChatId);
        }

        // 2. Cập nhật chatHistory với message ảnh (nếu có)
        if (imageBase64) {
            const imageMessage: Message = { sender: "user", imageBase64 };
            setChatHistory(prev => {
                const updated = [...prev];
                const index = updated.findIndex(chat => chat.id === activeChatId);
                if (index !== -1) {
                    updated[index] = {
                        ...updated[index],
                        messages: [...updated[index].messages, imageMessage],
                    };
                } else {
                    updated.push({ id: activeChatId, messages: [imageMessage] });
                }
                return updated;
            });
        }

        // 3. Cập nhật chatHistory với message text (nếu có)
        if (text.trim()) {
            const textMessage: Message = { sender: "user", text };
            setChatHistory(prev => {
                const updated = [...prev];
                const index = updated.findIndex(chat => chat.id === activeChatId);
                if (index !== -1) {
                    updated[index] = {
                        ...updated[index],
                        messages: [...updated[index].messages, textMessage],
                    };
                } else {
                    updated.push({ id: activeChatId, messages: [textMessage] });
                }
                return updated;
            });
        }

        try {
            // 4. Gọi Gemini API với cả text và image
            const replyText = await sendMessageToGemini(text, imageBase64);
            const botMessage: Message = { sender: "bot", text: replyText };

            // 5. Cập nhật lại chatHistory với bot message
            setChatHistory(prev => {
                const updated = [...prev];
                const index = updated.findIndex(chat => chat.id === activeChatId);
                if (index !== -1) {
                    updated[index] = {
                        ...updated[index],
                        messages: [...updated[index].messages, botMessage],
                    };
                }
                return updated;
            });
        } catch (error) {
            console.error("Lỗi gọi Gemini:", error);
            const errorMsg: Message = {
                sender: "bot",
                text: "⚠️ Lỗi hệ thống, thử lại sau.",
            };

            setChatHistory(prev => {
                const updated = [...prev];
                const index = updated.findIndex(chat => chat.id === activeChatId);
                if (index !== -1) {
                    updated[index] = {
                        ...updated[index],
                        messages: [...updated[index].messages, errorMsg],
                    };
                }
                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    };

    // const handleSendMessage = async (text: string, imageBase64?: string) => {
    //     if (isLoading) return;
    //
    //
    //     setIsLoading(true);
    //
    //     try {
    //         if (imageBase64) {
    //             setMessages(prev => [...prev, { sender: 'user', imageBase64 }]);
    //         }
    //
    //         if (text.trim()) {
    //             setMessages(prev => [...prev, { sender: 'user', text }]);
    //         }
    //
    //         const replyText = await sendMessageToGemini(text, imageBase64);
    //         setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
    //     } catch (error) {
    //         console.error("Lỗi gọi Gemini:", error);
    //         setMessages(prev => [...prev, { sender: 'bot', text: "⚠️ Hệ thống đang quá tải, vui lòng thử lại sau." }]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleNewChat = () => {
        if (messages.length > 0 && currentChatId) {
            setChatHistory(prev => {
                const existingIndex = prev.findIndex(chat => chat.id === currentChatId);
                if (existingIndex !== -1) {
                    const updated = [...prev];
                    updated[existingIndex] = { id: currentChatId, messages };
                    return updated;
                }
                return [...prev, { id: currentChatId, messages }];
            });
        }

        const newId = crypto.randomUUID();
        setCurrentChatId(newId);
        setMessages([]);
    };

    const handleSelectChat = (id: string) => {
        const selectedChat = chatHistory.find(chat => chat.id === id);
        if (selectedChat) {
            setCurrentChatId(id);
            setMessages(selectedChat.messages);
        }
    };

    const sidebarWidth = 256;

    return (
        <div className="h-screen flex flex-col">
            <Header isOpen={isOpen} onToggleSidebar={() => setIsOpen(prev => !prev)} isDesktop={isDesktop} />
            <div className="flex min-h-screen pt-14">
                <Sidebar
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    isDesktop={isDesktop}
                    onNewChat={handleNewChat}
                    onSelectChat={handleSelectChat}
                    chatHistory={chatHistory}
                />
                <div
                    className="flex-1 flex flex-col transition-all duration-300"
                    style={{
                        marginLeft: isDesktop ? (isOpen ? sidebarWidth : 0) : 0,
                    }}
                >
                    <main className="flex-1 overflow-y-auto p-6 pb-48">
                        <DashboardPage messages={getCurrentMessages()} isLoading={isLoading} />
                    </main>
                </div>
            </div>

            <div
                className="fixed flex flex-col items-center justify-center w-full px-4 transition-all duration-300 ease-in-out"
                style={
                    isDesktop && isOpen
                        ? { left: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)`, bottom: 0 }
                        : { left: 0, width: "100%", bottom: 0 }
                }
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
