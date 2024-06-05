import React from 'react';

const Select = ({ label, options, value, onChange, placeholder }) => {
    return (
        <div className="mt-4">
            {label && <label className="block mb-2">{label}</label>}
            <select
                className="w-full p-2 outline-1 outline-blue-400"
                value={value}
                onChange={onChange}
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
