import React from "react";
import Link from "next/link";

interface LabelProps {
    text: string;
    href?: string;
    onClick?: () => void;
}

const Label: React.FC<LabelProps> = ({text, href, onClick}) => {
    const baseClasses = `
    flex justify-end items-center
    mt-[10px] mr-[5px] mb-[15px]
    text-[0.9em] no-underline
    text-inherit
    cursor-pointer
  `;

    if (href) {
        return (
            <Link href={href} className={baseClasses} onClick={onClick}>
                {text}
            </Link>
        );
    }

    return (
        <span className={baseClasses} onClick={onClick}>
      {text}
    </span>
    );
};

export default Label;
