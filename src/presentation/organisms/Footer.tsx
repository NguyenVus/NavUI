import React from 'react';

const Footer = () => {
    return (
        <footer className=" bg-white dark:bg-black from-gray-900 via-gray-800 to-gray-900 text-gray-300 pb-4">
            <div className="container mx-auto text-center space-y-6">

                <div>
                    <p className="text-sm text-gray-400">Innovating the Future of Web</p>
                </div>

                <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
