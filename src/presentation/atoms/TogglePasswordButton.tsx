import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface TogglePasswordButtonProps {
    show: boolean;
    onToggle: () => void;
}

const TogglePasswordButton: React.FC<TogglePasswordButtonProps> = ({ show, onToggle }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="
        absolute top-[38%] right-[15px]
        transform -translate-y-1/2
        cursor-pointer
        bg-transparent
        border-none
        font-bold
      "
        >
            {show ? <FaEyeSlash /> : <FaEye />}
        </button>
    );
};

export default TogglePasswordButton;
