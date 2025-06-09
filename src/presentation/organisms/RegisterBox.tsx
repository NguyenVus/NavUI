import React from 'react';
import Logo from '../molecules/Logo';
import RegisterForm from '../molecules/RegisterForm';

const RegisterBox = () => {
    return (
        <div
            className="
        bg-white
        dark:bg-gray-900
        rounded-xl
        p-8 px-6
        w-[90%] max-w-[400px]
        shadow-md
        text-center
        mx-auto my-10
        transition-all duration-300 ease-in-out
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      "
        >
            <Logo />
            <RegisterForm />
        </div>
    );
};

export default RegisterBox;
