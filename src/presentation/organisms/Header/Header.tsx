import React from 'react';
import Logo from '../../molecules/Logo';
import {DarkModeToggle} from "@/presentation/molecules/DarkModeToggle";
import LanguageSwitcher from "@/presentation/molecules/LanguageSwitcher";


const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between py-4 bg-white dark:bg-black shadow-md  top-1 z-50  h-16 relative">

            <div className="flex-1"></div>

            <div className="flex-1 flex justify-center">
                <Logo />
            </div>

            <div className="flex-1 flex justify-end mr-8">
                    <DarkModeToggle/>
                <LanguageSwitcher/>
            </div>


        </header>
    );
};

export default Header;
