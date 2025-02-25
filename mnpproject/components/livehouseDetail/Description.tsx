import React from 'react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="w-full py-3 px-4 md:px-6">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-custom-text-primary">
        Description
      </h2>
      <div className="bg-gradient-card rounded-lg p-4 md:p-6 min-h-[180px] md:min-h-[272px]">
        <p className="text-gray-400 text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default Description;
