import React from 'react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="w-full py-2 md:py-3 h-full flex flex-col">
      <h2 className="text-lg md:text-xl font-semibold mb-3 text-custom-text-primary">
        รายละเอียด
      </h2>
      <div className="bg-gradient-card rounded-lg p-4 flex-grow overflow-auto">
        <p className="text-gray-400 text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default Description;