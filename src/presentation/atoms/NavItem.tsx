
import React from "react";
import Link from "next/link";

type NavItemProps = {
    label: string;
    href?: string;
    onClick?: () => void;
    onIconClick?: () => void;
    rightIcon?: React.ReactNode;
    isActive?: boolean;
    isDropdownOpen?: boolean;
};

export const NavItem = ({ label, href, onClick,onIconClick,rightIcon, isActive, isDropdownOpen }: NavItemProps) => {
    const baseClass = "relative flex items-center justify-between px-2 py-2 rounded cursor-pointer group";
    const activeClass = isActive
        ? "bg-gray-200 dark:bg-gray-600 bg- dark:hover:bg-gray-700 font-semibold"
        : "hover:bg-gray-200 dark:hover:bg-gray-700";
    const dropdownClass = isDropdownOpen ? "bg-gray-100 dark:bg-gray-800" : "";
    if (onClick) {
        return (
            <div
                onClick={onClick}
                className={`${baseClass} ${activeClass} ${dropdownClass}`}
            >

                <span className="truncate">{label}</span>

                {rightIcon && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            onIconClick?.();
                        }}
                        className={`ml-2 rounded cursor-pointer ${
                            isDropdownOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                        {rightIcon}
                    </div>
                )}
            </div>
        )
    }
    if (href) {


    return(
        <Link href={href} className=" block py-2 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            {label}
        </Link>
    );
    }
};
