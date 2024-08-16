import React from 'react';

type ReusableButtonProps = {
    label: string;
    onClick: (id?: string) => Promise<void>;
    successMessage?: string;
    errorMessage?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    id?: string; // Optional id
};

const ReusableButton: React.FC<ReusableButtonProps> = ({
    label,
    onClick,
    successMessage,
    errorMessage,
    className = '',
    type = 'button',
    id,
}) => {

    const handleClick = async () => {
        try {
            await onClick(id); // Pass the id if available
            if (successMessage) {
                alert(successMessage);
            }
        } catch (error) {
            if (errorMessage) {
                alert(errorMessage);
            }
        }
    };

    return (
        <button onClick={handleClick} className={`px-4 py-2 font-semibold rounded ${className}`} type={type}>
            {label}
        </button>
    );
};

export default ReusableButton;
