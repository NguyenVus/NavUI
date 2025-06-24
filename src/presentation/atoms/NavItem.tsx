
import React from "react";
import Link from "next/link";

type NavItemProps = {
    label: string;
    href?: string;
    onClick?: () => void;
    onIconClick?: () => void;
    rightIcon?: React.ReactNode;
};

export const NavItem = ({ label, href, onClick,onIconClick,rightIcon }: NavItemProps) => {
    if (onClick) {
        return (
            <div
                onClick={onClick}
                className="relative flex items-center justify-between px-2 py-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 group"
            >

                <span className="truncate">{label}</span>

                {rightIcon && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            onIconClick?.();
                        }}
                        className="opacity-0 group-hover:opacity-100 ml-2  rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
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
