import React from "react";

interface DividerWithTextProps {
    text: string;
}

const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => {
    return (
        <div className="flex items-center  my-[5px] px-[20px]">
            <div className="flex-1 border-b border-gray-300 mr-[12px]" />
            <span className="bg-white dark:bg-gray-900 px-[5px] relative z-10">{text}</span>
            <div className="flex-1 border-b border-gray-300 ml-[12px]" />
        </div>
    );
};

export default DividerWithText;
