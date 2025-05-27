
import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange, disabled = false }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-5 w-5 text-emerald-500 bg-slate-700 border-slate-600 rounded focus:ring-emerald-400 focus:ring-2 transition duration-150 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <label htmlFor={id} className={`ml-3 block text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-200'} cursor-pointer`}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
