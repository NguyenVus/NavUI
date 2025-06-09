import { useState, useRef, useEffect } from 'react';
import GlobeIcon from '@/presentation/atoms/GlobeIcon';
import LocaleLabel from '@/presentation/atoms/LocaleLabel';
import DropdownList, { Option } from '@/presentation/atoms/Dropdown';

interface SelectOptionProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function SelectOption({
                                         options,
                                         value,
                                         onChange,
                                         disabled = false,
                                     }: SelectOptionProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            ref={ref}
            className={`inline-block relative text-center ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={() => !disabled && setOpen((prev) => !prev)}
        >
            <div className="flex flex-row items-center ml-1 mt-0.75">
                <GlobeIcon />
                <LocaleLabel code={value} />
            </div>
            {open && (
                <DropdownList
                    options={options}
                    selectedValue={value}
                    onSelect={(val) => {
                        onChange(val);
                        setOpen(false);
                    }}
                />
            )}
        </div>
    );
}
