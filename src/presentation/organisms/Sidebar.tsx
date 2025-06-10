import { NavItem } from "../atoms/NavItem";
import Image from 'next/image'
import { X } from "lucide-react";
import { IconButton } from "../atoms/IconButton";
// import Logo from "@/presentation/molecules/Logo";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    isDesktop: boolean;
};

export const Sidebar = ({ isOpen,onClose, isDesktop }: SidebarProps) => {
    return (
        <aside
            className={`
                bg-gray-50 dark:bg-gray-900 shadow-md w-64
                flex flex-col
                ${isDesktop ? "fixed top-0 left-0 h-screen" : "fixed inset-0 h-full z-100"}
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >

            <div className="h-14 flex items-center justify-between px-4 shrink-0">
                <h2 className="text-xl font-bold">Menu</h2>
                {!isDesktop && (
                    <IconButton
                        icon={<X size={24} />}
                        ariaLabel="Close sidebar"
                        onClick={onClose}
                    />
                )}
            </div>


            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
                <nav className="flex text-sm flex-col space-y-2">
                    <NavItem label="New Chat" href="/" />
                    <NavItem label="Search Chat" href="/products" />
                    <NavItem label="Library" href="/settings" />
                </nav>
                <nav className="flex text-sm flex-col space-y-2">
                    <NavItem label="Sora" href="/" />
                    <NavItem label="GPT" href="/products" />
                </nav>
                <nav className="flex text-sm flex-col space-y-2">
                    <NavItem label="More 1" href="/more1" />
                    <NavItem label="More 2" href="/more2" />
                    <NavItem label="More 3" href="/more3" />
                    <NavItem label="More 4" href="/more4" />
                    <NavItem label="More 5" href="/more5" />
                    <NavItem label="More 6" href="/more6" />
                    <NavItem label="More 7" href="/more7" />
                    <NavItem label="More 1" href="/more1" />
                    <NavItem label="More 2" href="/more2" />
                    <NavItem label="More 3" href="/more3" />
                    <NavItem label="More 4" href="/more4" />
                    <NavItem label="More 5" href="/more5" />
                    <NavItem label="More 6" href="/more6" />
                    <NavItem label="More 7" href="/more7" />
                </nav>
            </div>
            <div className="h-14 flex items-center justify-between px-4 shrink-0">
                <div className="flex-1 items-center px-3">
                    <Image src="/globe.svg" alt="Logo" width={100} height={100}  />
                </div>
                <div className="min-w-0">
                    <div className="flex min-w-0 grow items-center text-sm gap-2">
                        <div className="truncate">Upgrade plan</div>
                    </div>
                    <div className="not-group-data-disabled:text-token-text-tertiary text-gray-500 leading-dense my-0.5 text-xs">More
                        access to the best models
                    </div>
                </div>


            </div>
        </aside>
    );
};
