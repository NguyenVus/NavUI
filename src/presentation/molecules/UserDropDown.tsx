// components/organisms/UserDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { IconButton } from "../atoms/IconButton";
import { DropdownPanel } from "../molecules/DropDownPanel";

export const UserDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        alert("Đăng xuất");

    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <IconButton
                icon={<UserCircle size={24} />}
                ariaLabel="Tài khoản"
                onClick={() => setOpen(prev => !prev)}
            />
            {open && (
                <DropdownPanel email="vudz1280@gmail.com" onLogout={handleLogout} />
            )}
        </div>
    );
};
