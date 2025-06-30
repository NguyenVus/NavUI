// components/molecules/ChatMenuDropdown.tsx
import React from "react";

type ChatHistoryDropdownProps = {
    onDelete: () => void;
    onArchive: () => void;
    onShare: () => void;
    onRenameChat: () => void;
};

export const ChatMenuDropdown = ({ onDelete, onArchive, onShare,onRenameChat }: ChatHistoryDropdownProps) => {
    return (
        <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-xl z-50 text-sm">
            <button onClick={onArchive} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Save</button>
            <button onClick={onShare} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Share</button>
            <button onClick={onRenameChat} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Rename</button>
            <button onClick={onDelete} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700">Delete</button>
        </div>
    );
};
