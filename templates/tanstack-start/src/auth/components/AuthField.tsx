import type { ReactNode } from 'react';

import { useFieldContext } from '../hooks/useAuthForm';

interface AuthFieldProps {
  label: string;
  type: string;
  placeholder: string;
  leftIcon?: ReactNode;
}

export default function AuthField({ label, type, placeholder, leftIcon }: AuthFieldProps) {
  const field = useFieldContext<string>();
  return (
    <div className="space-y-1">
      <label htmlFor={field.name} className="text-sm font-medium text-stone-700">
        {label}
      </label>
      <div className="relative">
        {leftIcon}
        <input
          id={field.name}
          name={field.name}
          type={type}
          autoComplete={field.name}
          required
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
          placeholder={placeholder}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
