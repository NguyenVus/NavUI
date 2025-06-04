"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { IconButton } from "../atoms/IconButton";

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    // Khởi tạo trạng thái từ localStorage hoặc class trên body
    useEffect(() => {
        const saved = localStorage.getItem("dark-mode");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (saved === "true" || (!saved && prefersDark)) {
            document.body.classList.add("dark-mode");
            setIsDark(true);
        } else {
            document.body.classList.remove("dark-mode");
            setIsDark(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDark) {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "false");
            setIsDark(false);
        } else {
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "true");
            setIsDark(true);
        }
    };

    return (
        <IconButton
            onClick={toggleDarkMode}
            ariaLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
            icon={isDark ? <Moon size={20} /> : <Sun size={20} />}
        />
    );
};
