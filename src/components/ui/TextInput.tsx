import { twMerge } from 'tailwind-merge';
import { generateId } from '~/lib/utils/id';
import { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'email' | 'search' | 'tel' | 'password';
  id?: string;
  name?: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  value?: string;
}

export const TextInput = ({
  type = 'text',
  id,
  label,
  icon,
  name,
  placeholder,
  required,
  value,
  disabled,
}: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        id={id}
        placeholder={placeholder}
        className={twMerge(
          'mt-1 w-full text-white bg-slate-700 rounded-md border-gray-700 shadow-sm sm:text-sm disabled:cursor disabled:opacity-75 disabled:cursor-not-allowed',
          icon && 'pe-10'
        )}
        required={required}
        disabled={disabled}
        value={value}
      />
      {icon && (
        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
          {icon}
        </span>
      )}
    </div>
  );
};
