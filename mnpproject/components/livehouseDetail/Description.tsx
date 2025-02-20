import React from 'react';
interface DescriptionProps {
    description: string
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="w-full py-3">
      <h2 className="text-xl font-semibold mb-4 text-custom-text-primary">Description</h2>
      <div className="bg-gradient-card rounded-lg p-6 h-[272px]">
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default Description;