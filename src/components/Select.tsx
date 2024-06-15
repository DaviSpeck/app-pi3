import React, { ChangeEvent } from 'react';

interface SelectProps {
    selectedCategory: string;
    options: string[];
    setSelectedCategory: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ selectedCategory, options, setSelectedCategory }) => {

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleClear = () => {
        setSelectedCategory('');
    };

    return (
        <div
            style={{
                position: 'relative',
                marginTop: 16,
                width: '100%',
                maxWidth: 400,
                overflow: 'hidden', // Oculta a barra de rolagem
            }}
        >
            <select
                id="select"
                value={selectedCategory}
                onChange={handleChange}
                style={{
                    padding: '10px 36px 10px 16px',
                    fontSize: 16,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    width: '100%',
                    backgroundColor: '#fff',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    outline: 'none',
                    overflow: 'hidden'
                }}
            >
                <option style={{ fontSize: 12 }} value="" disabled>Selecione uma opção</option>
                {options.map((option, index) => (
                    <option style={{ fontSize: 12 }} key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {selectedCategory && (
                <button
                    onClick={handleClear}
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        fontSize: 24,
                        cursor: 'pointer',
                        color: '#999',
                    }}
                >
                    &times;
                </button>
            )}
        </div>
    );
};
