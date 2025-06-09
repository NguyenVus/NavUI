import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href="/homepage" className="flex items-center justify-center">
            <Image
                src="/assets/logos/logo.png"
                alt="Logo"
                width={180}
                height={180}
                className="w-[150px] h-[100px] mx-auto mb-2.5 rounded relative"
                priority
            />
        </Link>
    );
};

export default Logo;
