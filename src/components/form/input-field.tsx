import { ComponentType } from 'react';

interface InputFieldProps {
    title: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    inputType: string;
    inputName: string;
    inputId: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const InputField = ({
    title,
    description,
    icon: IconComponent,
    inputType,
    inputName,
    inputId,
    placeholder,
    value,
    onChange,
    error
}: InputFieldProps) => {
    return (
        <div className="">
            <h3 className="text-lg leading-6 font-semibold text-gray-900">
                {title}
            </h3>
            <p className="mt-1 text-sm font-medium mb-4 text-gray-500">
                {description}
            </p>
            <div className="mt-4 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <IconComponent className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                    type={inputType}
                    name={inputName}
                    id={inputId}
                    className={`py-4 block w-full pl-10 sm:text-sm rounded-md text-gray-900 ${
                        error 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-vanguardPurple focus:border-vanguardPurple'
                    }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};
