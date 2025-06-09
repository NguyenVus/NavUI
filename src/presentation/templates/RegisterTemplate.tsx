import React from 'react';
import RegisterBox from '../organisms/RegisterBox';
import Header from "@/presentation/organisms/Header/Header";
import Footer from "@/presentation/organisms/Footer";

const RegisterTemplate = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <RegisterBox />
            </div>
            <Footer />
        </div>
    );
};

export default RegisterTemplate;