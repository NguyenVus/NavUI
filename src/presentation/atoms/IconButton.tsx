import React from "react";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ReactNode;
    ariaLabel?: string;
};

export const IconButton = ({ icon, ariaLabel, ...props }: IconButtonProps) => (
    <button
        aria-label={ariaLabel}
        {...props}
        className={`p-2 rounded transition-colors duration-200
          hover:bg-gray-200
          active:bg-gray-300
          focus:outline-none
          nav-item
          ${props.className ?? ""}
        `}
    >
        {icon}
    </button>
);
