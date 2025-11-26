
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-stone-text mb-1">
        {label}
      </label>
      <input
        id={id}
        type="number"
        step="any"
        {...props}
        className="w-full px-3 py-2 text-stone-text bg-cream border border-sage-light rounded-md shadow-sm placeholder-taupe focus:outline-none focus:ring-2 focus:ring-sage-dark focus:border-sage-dark transition"
      />
    </div>
  );
};

export default InputField;
