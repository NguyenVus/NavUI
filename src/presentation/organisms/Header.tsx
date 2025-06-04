import { IconButton } from "../atoms/IconButton";
import { Menu, X } from "lucide-react";
import { DarkModeToggle } from "@/presentation/molecules/DarkModeToggle";
import {NavItem} from "@/presentation/atoms/NavItem"; // đường dẫn tùy theo bạn lưu

type HeaderProps = {
    isOpen: boolean;
    onToggleSidebar: () => void;
    isDesktop: boolean;
};

export const Header = ({ isOpen, onToggleSidebar, isDesktop }: HeaderProps) => {
    const sidebarWidth = 256; // 64 * 4 = 256px (w-64)

    return (
        <header
            className={`
        top-0 header h-14  shadow-md flex items-center px-4 z-40
        transition-all duration-300
        ${isDesktop ? "absolute" : "fixed left-0 right-0"}
      `}
            style={
                isDesktop && isOpen
                    ? { left: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }
                    : { left: 0, width: "100%" }
            }
        >
            {/* Nút toggle sidebar bên trái */}
            <IconButton
                icon={isOpen ? <X size={24} /> : <Menu size={24} />}
                ariaLabel={isOpen ? "Close sidebar" : "Open sidebar"}
                onClick={onToggleSidebar}
                className="mr-4"
            />

            <h1 className="text-lg font-bold flex-grow">My App</h1>
            <div className="flex flex-grow items-center space-x-6">
                <nav className="flex space-x-4">
                    <NavItem label="Trang chủ" href="/" />
                    <NavItem label="Sản phẩm" href="/products" />
                    <NavItem label="Cài đặt" href="/settings" />
                    </nav>
            </div>
            {/* Dark mode toggle ở cuối bên phải */}
            <DarkModeToggle />
        </header>
    );
};
