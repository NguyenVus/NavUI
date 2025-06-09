export interface Option {
    label: string;
    value: string;
}

interface DropdownListProps {
    options: Option[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

export default function DropdownList({
                                         options,
                                         selectedValue,
                                         onSelect,
                                     }: DropdownListProps) {
    return (
        <ul
            className="absolute top-[120%] right-0 bg-white border-2 border-gray-300 rounded-md shadow-lg min-w-[140px] z-[1000] p-0 m-0 list-none"
        >
            {options.map(({ label, value }) => (
                <li
                    key={value}
                    onClick={() => onSelect(value)}
                    className={`
            px-4 py-2 border border-white rounded-md text-gray-800 cursor-pointer transition-colors 
            ${value === selectedValue ? 'bg-gray-300 font-bold' : 'bg-white font-normal'}
            hover:bg-gray-400
          `}
                >
                    {label}
                </li>
            ))}
        </ul>
    );
}
