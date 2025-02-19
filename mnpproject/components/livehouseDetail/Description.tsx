import React from 'react';
interface DescriptionProps {
    description: string
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="w-full max-w-3xl px-6 py-6">
      <h2 className="text-xl font-semibold mb-4 text-custom-text-primary">Description</h2>
      <div className="bg-gray-300 rounded-lg p-6 h-[300px]">
        <p className="text-custom-text-subtle">{description}</p>
      </div>
    </div>
  );
};

export default Description;