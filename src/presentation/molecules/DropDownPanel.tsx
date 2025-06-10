// components/molecules/DropdownPanel.tsx
import React from "react";
import { MenuItem } from "../atoms/MenuItem";
import {
    LogOut,
    Settings,
    HelpCircle,
    Sparkles,
    LayoutDashboard,
    BookOpen,
    DownloadCloud,
    SlidersHorizontal,
} from "lucide-react";

interface DropdownPanelProps {
    email: string;
    onLogout: () => void;
}

export const DropdownPanel = ({ email, onLogout }: DropdownPanelProps) => (
    <ul className="absolute top-[120%] right-0 bg-white border dark:bg-gray-900  border-gray-300 dark:border-gray-700  rounded-md shadow-lg min-w-[280px] text-sm z-50">
        <li className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-400">{email}</li>
        <hr className="my-1" />

        <MenuItem icon={Sparkles} label="Upgrade Plan" />
        <MenuItem icon={SlidersHorizontal} label="Customize ChatGPT" />
        <MenuItem icon={Settings} label="Settings" />
        <MenuItem icon={BookOpen} label="Keyboard shortcuts" />

        <hr className="my-1" />

        <MenuItem icon={HelpCircle} label="Help & FAQ" />
        <MenuItem icon={LayoutDashboard} label="Release notes" />
        <MenuItem icon={BookOpen} label="Terms & policies" />
        <MenuItem icon={DownloadCloud} label="Get ChatGPT search extension" />

        <hr className="my-1" />

        <MenuItem icon={LogOut} label="Log out" onClick={onLogout} />
    </ul>
);
