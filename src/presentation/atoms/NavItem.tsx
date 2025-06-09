
import React from "react";
import Link from "next/link";

type NavItemProps = {
    label: string;
    href: string;
};

export const NavItem = ({ label, href }: NavItemProps) => (
    <Link href={href}  className=" block py-2 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        {label}
    </Link>
);
