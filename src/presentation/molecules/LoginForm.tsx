'use client'
import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label  from '../atoms/Label';
import TogglePasswordButton from "@/presentation/atoms/TogglePasswordButton";
import {useTranslations} from 'next-intl';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const t = useTranslations('LoginPage');

    const handleLogin = () => {
        alert(`Logging in with Email: ${email}`);
    };

    const handleMicrosoftLogin = () => {
        alert('Logging in with Microsoft');
    };
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };


    return (
        <div>
            <Input type="email" placeholder={t('email')} variant ='primary' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div
                style={{
                    position: 'relative',
            }}>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('password')}
                    value={password}
                    variant ='secondary'
                    onChange={e => setPassword(e.target.value)}
                />
                <TogglePasswordButton show={showPassword} onToggle={toggleShowPassword}  />
            </div>
            <Label text={t('forgot_password')} href="/homepage" />
            <Button label={t('login')} onClick={handleLogin} variant='primary' />
            <Button label={t('login_with_microsoft')} onClick={handleMicrosoftLogin} variant="secondary" iconSrc={'/assets/logos/micrs.png'}/>
            <Label text={t('dont_have_account')} href="/register" />
        </div>
    );
};

export default LoginForm;