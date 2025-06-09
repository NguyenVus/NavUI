import React from 'react';
import Image from 'next/image';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    iconSrc?: string;
    altText?: string;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           variant = 'primary',
                                           iconSrc,
                                           altText,
                                       }) => {
    const baseStyles = `
    flex items-center justify-center w-full gap-2
    text-white text-lg px-4 py-3 rounded border cursor-pointer
    transition duration-200
  `;

    const variantStyles =
        variant === 'primary'
            ? 'mb-4 bg-[#5a79d6] border-[#888] hover:bg-[#2f5bd6] hover:shadow-md'
            : 'mt-4 mb-1 bg-[#9e9d9d] border-[#888] hover:bg-[#686a70] hover:shadow-md';

    const iconStyle = 'w-[17px] h-[17px] border';

    return (
        <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
            {iconSrc && (
                <Image
                    src={iconSrc}
                    alt={altText || 'icon'}
                    width={17}
                    height={17}
                    className={iconStyle}
                />
            )}
            {label}
        </button>
    );
};

export default Button;
