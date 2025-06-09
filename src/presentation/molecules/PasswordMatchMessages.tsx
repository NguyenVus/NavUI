
import React from 'react';

interface PasswordMatchMessageProps {
    password: string;
    retypePassword: string;
}

const PasswordMatchMessage: React.FC<PasswordMatchMessageProps> = ({ password, retypePassword }) => {
    if (!password || !retypePassword) return null;

    const isMatch = password === retypePassword;

    return (
        <div style={{ color: isMatch ? 'green' : 'red', fontSize: '14px', marginTop: '5px' , marginBottom: '15px' }} >
            {isMatch ? 'Passwords match' : 'Passwords do not match'}
        </div>
    );
};

export default PasswordMatchMessage;
