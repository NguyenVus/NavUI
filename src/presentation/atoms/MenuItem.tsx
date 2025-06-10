// components/atoms/MenuItem.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
}

export const MenuItem = ({ icon: Icon, label, onClick }: MenuItemProps) => (
    <li
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
        <Icon size={16} />
        {label}
    </li>
);
