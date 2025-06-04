// src/presentation/atoms/NavItem.tsx
import React from "react";
import Link from "next/link";

type NavItemProps = {
    label: string;
    href: string;
};

export const NavItem = ({ label, href }: NavItemProps) => (
    <Link href={href}  className="nav-item block py-2 px-4 rounded hover:bg-gray-200">
        {label}
    </Link>
);
