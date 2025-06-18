import { useEffect, useRef } from "react";
import Image from "next/image";

type Message = {
    sender: 'user' | 'bot';
    text?: string;
    imageBase64?: string;
};

export const DashboardPage = ({ messages, isLoading, }: { messages: Message[], isLoading: boolean }) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full max-w-3xl mx-auto">
            {messages.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 mt-50 text-xl text-center">
                    Tôi có thể giúp gì bạn?
                </div>
            ) : (
                <div className="space-y-2">
                    {messages.map((msg, idx) => {
                        const isUser = msg.sender === 'user';
                        return (
                            <div
                                key={idx}
                                className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`py-2.5 px-5 rounded-3xl break-words whitespace-pre-wrap inline-block max-w-[80%] space-y-2 ${
                                        isUser
                                            ? "bg-gray-100 dark:bg-gray-800"
                                            : "bg-blue-100 dark:bg-blue-900 text-black dark:text-white"
                                    }`}
                                >
                                    {msg.text && <div>{msg.text}</div>}
                                    {msg.imageBase64 && (
                                        <Image
                                            src={`data:image/png;base64,${msg.imageBase64}`}
                                            alt="user-upload"
                                            width={400}
                                            height={300}
                                            className="rounded-xl"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {isLoading && (
                    <div className="w-full flex justify-start">
                        <div className="py-2.5 px-5 rounded-3xl bg-blue-100 dark:bg-blue-900 text-black dark:text-white max-w-[80%]">
                            Đang phản hồi...
                        </div>
                    </div>
                )}
                    <div ref={bottomRef} />
                </div>
            )}
        </div>
    );
};
