// components/molecules/DropdownPanel.tsx
import React, { useState } from "react";
import { MenuItem } from "../atoms/MenuItem";
import {
    Users,
    LogOut,
    Settings,
    HelpCircle,
    LayoutDashboard,
    BookOpen,
    DownloadCloud,
    SlidersHorizontal,
} from "lucide-react";
import { UserPopup } from "../molecules/UserPopUp"; // đảm bảo import đúng

interface DropdownPanelProps {
    email: string;
    onLogout: () => void;
}

export const DropdownPanel = ({ email, onLogout }: DropdownPanelProps) => {
    const [showUserPopup, setShowUserPopup] = useState(false);

    return (
        <>
            <ul className="absolute top-[120%] right-0 bg-white border dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-md shadow-lg min-w-[280px] text-sm z-50">
                <li className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-400">
                    {email}
                </li>
                <hr className="my-1" />

                <MenuItem
                    icon={Users}
                    label="User"
                    onClick={() => setShowUserPopup(true)}
                />
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

            {showUserPopup && <UserPopup onClose={() => setShowUserPopup(false)} />}
        </>
    );
};
