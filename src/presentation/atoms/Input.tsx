import React from 'react';

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'primary' | 'secondary';
}

const Input: React.FC<InputProps> = ({
                                         type,
                                         placeholder,
                                         className,
                                         value,
                                         variant = 'primary',
                                         onChange,
                                     }) => {
    const baseStyles = `
    w-full 
    px-4 py-3 
    border border-[#ccc] 
    rounded 
    text-sm 
    box-border 
    transition duration-300 
    focus:outline-none focus:ring-2 focus:ring-blue-200
  `;

    const variantStyles =
        variant === 'primary' || variant === 'secondary'
            ? 'mb-4' // same margin for both
            : '';

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${baseStyles} ${variantStyles} ${className || ''}`}
        />
    );
};

export default Input;
