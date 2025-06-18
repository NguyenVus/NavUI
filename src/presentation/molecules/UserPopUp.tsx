// components/molecules/UserPopup.tsx
import React from "react";
import { X } from "lucide-react";
import { IconButton } from "@/presentation/atoms/IconButton";
import Image from "next/image";
import ReactDOM from "react-dom";

interface UserPopupProps {
    onClose: () => void;
}

export const UserPopup = ({ onClose }: UserPopupProps) => {
    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[95%] max-w-4xl h-[80%] overflow-y-auto flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="w-full md:w-1/4 border-b md:border-r pr-4 mb-4 md:mb-0 text-sm text-gray-700 dark:text-gray-300">
                    <div className="cursor-pointer rounded-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        User Info
                    </div>
                    <div className="cursor-pointer rounded-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        My Group
                    </div>
                    <div className="cursor-pointer rounded-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        Logout
                    </div>
                </div>


                <div className="w-full md:w-3/4 md:pl-6">
                    <div className="mb-4 w-full text-center md:text-left">
                        <h2 className="text-xl font-semibold">Thông tin người dùng</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Thông tin cá nhân và thống kê
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">

                        <div className="w-full md:w-[45%] p-4 rounded space-y-4 text-sm">
                            <div className="flex justify-center mb-4">
                                <Image
                                    src="/assets/logos/img.png"
                                    alt="Avatar"
                                    width={64}
                                    height={64}
                                    className="rounded-full border border-white"
                                />
                            </div>
                            <div>
                                <strong>User name:</strong> Nguyên Vũ
                            </div>
                            <div>
                                <strong>Email:</strong> vudz1280@gmail.com
                            </div>
                            <div>
                                <strong>Role:</strong> Admin
                            </div>
                            <div>
                                <strong>Language:</strong>{" "}
                                <select className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white">
                                    <option>English</option>
                                    <option>Tiếng Việt</option>
                                </select>
                            </div>
                            <div>
                                <strong>Group:</strong> Dev Team
                            </div>

                            {/*<hr className="my-4 border-white/30" />*/}
                        </div>


                        <div className="w-full md:w-[55%] p-4 border-t md:border-t-0 md:border-l md:pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <div className="space-y-4">
                                <div>
                                    <strong>Ngày đăng nhập gần nhất:</strong> 16/06/2025
                                </div>
                                <div>
                                    <strong>Mô hình đang sử dụng:</strong> Gemini 1.5
                                </div>
                                <div>
                                    <strong>Số lượng token đã sử dụng:</strong> 345,200
                                </div>
                                <div>
                                    <strong>Số lượng chatbot đã tạo:</strong> 5
                                </div>
                                <div>
                                    <strong>Số lượng prompt đã tạo:</strong> 12
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <IconButton
                    icon={<X size={20} />}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                />
            </div>
        </div>,
    document.body
    );

};
