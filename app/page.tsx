import React from 'react';
import ReusableButton from './CustomButton';

const page: React.FC = () => {
  const handleDelete = (id?: string) => {
    return new Promise<void>((resolve, reject) => {
      console.log('Deleting item with id:', id);
      // Simulate API call
      setTimeout(() => {
        const success = Math.random() > 0.5; // Random success/failure
        if (success) {
          resolve();
        } else {
          reject('Failed to delete');
        }
      }, 1000);
    });
  };

  return (
    <div>
      <h1>Example Usage of Reusable Button</h1>
      <ReusableButton
        label="Delete Item 1"
        onClick={handleDelete}
        successMessage="Item deleted successfully!"
        errorMessage="Error: Could not delete the item."
        className="bg-red-500 text-white hover:bg-red-700"
        id="item-1" // Optional id
      />
      <ReusableButton
        label="Delete Item 2"
        onClick={handleDelete}
        successMessage="Item deleted successfully!"
        errorMessage="Error: Could not delete the item."
        className="bg-red-500 text-white hover:bg-red-700"
        id="item-2" // Optional id
      />
      <ReusableButton
        label="Delete without ID"
        onClick={handleDelete}
        successMessage="Item deleted successfully!"
        errorMessage="Error: Could not delete the item."
        className="bg-red-500 text-white hover:bg-red-700"
      />
    </div>
  );
};

export default page;
