'use client'
import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label  from '../atoms/Label';
import TogglePasswordButton from "../atoms/TogglePasswordButton";
import PasswordMatchMessage from "@/presentation/molecules/PasswordMatchMessages";
import {useTranslations} from 'next-intl';
import DividerWithText from "@/presentation/atoms/DividerWithText";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [retypePassword, setRetypePassword] = useState('');
    const [showRetypePassword, setShowRetypePassword] = useState(false);

    const t = useTranslations('RegisterPage');
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };
    const toggleShowRetypePassword = () => {
        setShowRetypePassword(prev => !prev);
    };

    const handleRegister = () => {
        alert('Registering');
    }

    function handleMicrosoftLogin() {

    }

    return (
        <div>
            <Input type="email" placeholder={t('email')} variant = 'primary'  value={email} onChange={(e) => setEmail(e.target.value)} />
            <div
                style={{
                    position: 'relative',
                }}>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('password')}
                    value={password}
                    variant = 'primary'
                    onChange={e => setPassword(e.target.value)}
                />
                <TogglePasswordButton show={showPassword} onToggle={toggleShowPassword}  />
            </div>
            <div
                style={{
                    position: 'relative',
                }}>
                <Input
                    type={showRetypePassword ? 'text' : 'password'}
                    placeholder={t('retype_password')}
                    value={retypePassword}
                    variant = 'secondary'
                    onChange={e => setRetypePassword(e.target.value)}
                />
                <TogglePasswordButton show={showRetypePassword} onToggle={toggleShowRetypePassword}  />
            </div>
            <PasswordMatchMessage password={password} retypePassword={retypePassword} />


            <Button label={t("singup")}  onClick={handleRegister}/>
            <div className="flex justify-end ">
                <Label text={t("have_account")} />
                <Label text={t("login")} href="/" />
            </div>
            <DividerWithText text="or"/>
            <Button label={t('signup_with_microsoft')} onClick={handleMicrosoftLogin} variant="secondary" iconSrc={'/assets/logos/micrs.png'}/>
        </div>
    );
};

export default RegisterForm;