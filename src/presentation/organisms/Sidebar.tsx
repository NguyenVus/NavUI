import { NavItem } from "../atoms/NavItem";
import Image from 'next/image'
import { X, MoreHorizontal } from "lucide-react";
import { IconButton } from "../atoms/IconButton";


type Message = {
    sender: 'user' | 'bot';
    text?: string;
    imageBase64?: string;
};
type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    isDesktop: boolean;
    onNewChat: () => void;
    chatHistory: {id: string; messages: Message[]} [];
    onSelectChat: (id: string) => void;
};

export const Sidebar = ({ isOpen,onClose, isDesktop, onNewChat, chatHistory, onSelectChat }: SidebarProps) => {

    return (
        <aside
            className={`
                bg-gray-50 dark:bg-gray-900 shadow-md w-64
                flex flex-col
            
                ${isDesktop ? "fixed top-0 left-0 h-screen" : "fixed inset-0 h-full z-40"}
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >

            <div className="h-14 flex items-center justify-between px-4 shrink-0">
                <h2 className="text-xl font-bold">Menu</h2>
                {!isDesktop && (
                    <IconButton
                        icon={<X size={24} />}
                        ariaLabel="Close sidebar"
                        onClick={onClose}
                    />
                )}
            </div>


            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
                <nav className="flex text-sm flex-col space-y-2">
                    <NavItem label="New Chat" onClick={onNewChat} />
                    <NavItem label="Search Chat" onClick={onNewChat} />
                    <NavItem label="Library" onClick={onNewChat}  />
                </nav>
                <nav className="flex text-sm flex-col space-y-2">
                    <NavItem label="Sora" onClick={onNewChat} />
                    <NavItem label="GPT" onClick={onNewChat} />
                </nav>
                <div className="pl-2 text-gray-500 dark:text-gray-400">Chats</div>
                <nav className="flex text-sm flex-col space-y-2">
                    {chatHistory
                        .filter(chat => chat.messages.some(msg => msg.sender === "user" && msg.text)) // chỉ hiển thị nếu có nội dung
                        .map(chat => {
                            const firstUserMessage = chat.messages.find(msg => msg.sender === "user" && msg.text);
                            const previewText = firstUserMessage?.text?.slice(0, 30) || "Chat mới";

                            return (
                                <NavItem
                                    key={chat.id}
                                    label={previewText}
                                    onClick={() => onSelectChat(chat.id)}
                                    rightIcon={<MoreHorizontal size={18} />}
                                />
                            );
                        })}
                </nav>



            </div>
            <div className="h-14 flex items-center justify-between px-4 shrink-0">
                <div className="flex-1 items-center px-3">
                    <Image src="/globe.svg" alt="Logo" width={100} height={100}  />
                </div>
                <div className="min-w-0">
                    <div className="flex min-w-0 grow items-center text-sm gap-2">
                        <div className="truncate">Upgrade plan</div>
                    </div>
                    <div className="not-group-data-disabled:text-token-text-tertiary text-gray-500 leading-dense my-0.5 text-xs">More
                        access to the best models
                    </div>
                </div>


            </div>
        </aside>
    );
};
