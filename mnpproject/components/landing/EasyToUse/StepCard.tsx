import React, { ReactNode } from 'react';

// Define the main props interface for StepCard
interface StepCardProps {
  index: number;
  title: string;
  description: string;
  icon: ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({
  index,
  title,
  description,
  icon
}) => {
  return (
    <>
      {/* Step number bubble */}
      <div className="absolute -top-4 left-0 w-8 h-8 bg-custom-purple text-white rounded-full flex items-center justify-center font-bold">
        {index}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm w-full text-center h-full flex flex-col items-center">
        <div className="mb-4">
          {icon}  {/* Simply render the passed icon */}
        </div>
        <div className="h-14 flex items-center justify-center">
          <h3 className="text-xl font-semibold mb-2 whitespace-pre-line">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </>
  );
};

export default StepCard;