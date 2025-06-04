import { NavItem } from "../atoms/NavItem";
import { X } from "lucide-react";
import { IconButton } from "../atoms/IconButton";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    isDesktop: boolean;
};

export const Sidebar = ({ isOpen, onClose, isDesktop }: SidebarProps) => {
    return (
        <aside
            className={`
            bg-white
    sidebar shadow-md w-64
    ${isDesktop
                ? "fixed top-0 left-0 h-screen"
                : "fixed inset-0 h-full z-50"
            }
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
        >
            <div className="h-14 flex items-center justify-between px-4 shadow-md">
                <h2 className="text-xl font-bold">Menu</h2>
                {!isDesktop && (
                    <IconButton
                        icon={<X size={24} />}
                        ariaLabel="Close sidebar"
                        onClick={onClose}
                    />
                )}
            </div>


            <nav className="flex flex-col gap-4 p-4">
                <NavItem label="Trang chủ" href="/" />
                <NavItem label="Sản phẩm" href="/products" />
                <NavItem label="Cài đặt" href="/settings" />
            </nav>
        </aside>

    );
};
