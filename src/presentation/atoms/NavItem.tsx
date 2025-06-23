
import React from "react";
import Link from "next/link";

type NavItemProps = {
    label: string;
    href?: string;
    onClick?: () => void;
};

export const NavItem = ({ label, href, onClick }: NavItemProps) => {
    if (onClick) {
        return (
            <button onClick ={onClick} className="block py-2 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-left">
                {label}
            </button>
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
