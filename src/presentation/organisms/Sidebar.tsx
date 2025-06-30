import { NavItem } from "../atoms/NavItem";
import Image from 'next/image'
import { X, MoreHorizontal } from "lucide-react";
import { IconButton } from "../atoms/IconButton";
import {ChatMenuDropdown} from "../molecules/ChatHistotyDropDown"
import {useState, useEffect,useRef } from "react";

type Message = {
    sender: 'user' | 'bot';
    text?: string;
    imageBase64?: string;
};
type ChatHistoryItem = {
    id: string;
    messages: Message[];
    customName?: string;
};
type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    isDesktop: boolean;
    onNewChat: () => void;
    chatHistory: ChatHistoryItem[];
    onSelectChat: (id: string) => void;
    onRenameChat: (id: string, newName: string) => void;
    onDeleteChat: (id: string) => void;
    currentChatId: string | null;
};

export const Sidebar = ({ isOpen,onClose, isDesktop, onNewChat, chatHistory, onSelectChat,onDeleteChat, onRenameChat, currentChatId }: SidebarProps) => {
    const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const [editingChatId, setEditingChatId] = useState<string | null>(null);
    const [newName, setNewName] = useState<string>("");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                !isDesktop && isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, isDesktop, onClose]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpenId(null);
            }
        };

        if (dropdownOpenId !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpenId]);

    const handleToggleDropdown = (chatId: string) => {
        const element = document.getElementById(`dropdown-anchor-${chatId}`);
        if (element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (windowHeight - rect.bottom < 200) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }
        }

        setDropdownOpenId(prev => (prev === chatId ? null : chatId));
    };

    const handleDeleteChat = (chatId: string) => {
        onDeleteChat(chatId);
        setDropdownOpenId(null);
    };

    const handleRenameChat = (chatId: string, currentName: string = "") => {
        setEditingChatId(chatId);
        setNewName(currentName || "");
        setDropdownOpenId(null);
    };


    const handleArchiveChat = (chatId: string) => {
        console.log("📦 Archive chat:", chatId);
        setDropdownOpenId(null);
    };

    const handleShareChat = (chatId: string) => {
        console.log("🔗 Share chat:", chatId);
        setDropdownOpenId(null);
    };
    return (
        <aside
            ref={sidebarRef}
            className={`
                bg-gray-50 dark:bg-gray-900 shadow-md w-64
                flex flex-col
  
                ${isDesktop ? "fixed top-0 left-0 h-screen" : "fixed inset-0 h-full z-30"}
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
                            const previewText = chat.customName || firstUserMessage?.text?.slice(0, 30) || "Chat mới";

                            return (
                                <div key={chat.id} className="relative" id={`dropdown-anchor-${chat.id}`}>
                                    {editingChatId === chat.id ? (
                                        <input
                                            className="w-full p-2 text-sm bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded border focus:outline-none"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onRenameChat(chat.id, newName.trim());
                                                    setEditingChatId(null);
                                                }
                                            }}
                                            onBlur={() => {
                                                if (newName.trim() !== "") {
                                                    onRenameChat(chat.id, newName.trim());
                                                }
                                                setEditingChatId(null);
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        <NavItem
                                            label={previewText}
                                            onClick={() => onSelectChat(chat.id)}
                                            onIconClick={() => handleToggleDropdown(chat.id)}
                                            rightIcon={<MoreHorizontal size={18} />}
                                            isActive={chat.id === currentChatId}
                                            isDropdownOpen={dropdownOpenId === chat.id}
                                        />
                                    )}

                                    {dropdownOpenId === chat.id && (
                                        <div
                                            ref={dropdownRef}
                                            className={`absolute right-0 z-40 ${
                                                dropdownPosition === 'top'
                                                    ? 'bottom-full mb-40'
                                                    : 'top-full mt-2'
                                            }`}
                                        >
                                            <ChatMenuDropdown
                                                onDelete={() => handleDeleteChat(chat.id)}
                                                onArchive={() => handleArchiveChat(chat.id)}
                                                onShare={() => handleShareChat(chat.id)}
                                                onRenameChat={() => handleRenameChat(chat.id, chat.customName || "")} // 👈 truyền customName
                                            />
                                        </div>
                                    )}
                                </div>

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
