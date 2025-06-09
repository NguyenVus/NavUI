'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import SelectOption from '@/presentation/molecules/SelectOption';


const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' }
];

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [isPending, startTransition] = useTransition();

    const handleChange = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');

        startTransition(() => {
            router.replace(newPath);
        });
    };

    return (
        <SelectOption
            options={languageOptions}
            value={currentLocale}
            onChange={handleChange}
            disabled={isPending}
        />
    );
}
