import React from 'react';
import LoginBox from '../organisms/LoginBox';
import Header from "@/presentation/organisms/Header/Header";
import Footer from "@/presentation/organisms/Footer";

const AuthTemplate = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <LoginBox />
            </div>
            <Footer />
        </div>
    );
};

export default AuthTemplate;
