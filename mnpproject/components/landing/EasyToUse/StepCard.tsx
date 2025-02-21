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
      <div className="absolute -top-4 left-0 w-8 h-8 bg-custom-purple-dark text-white rounded-full flex items-center justify-center font-bold">
        {index}
      </div>

      {/* Content */}
      <div className="bg-gradient-card p-6 rounded-lg shadow-sm w-full text-center h-full flex flex-col items-center outline outline-custom-purple-light outline-offset-2">
        <div className="mb-4">
          {icon}  {/* Simply render the passed icon */}
        </div>
        <div className="h-14 flex items-center justify-center">
          <h3 className="text-xl font-semibold mb-2 whitespace-pre-line text-custom-text-primary">{title}</h3>
        </div>
        <p className="text-custom-text-secondary text-sm">{description}</p>
      </div>
    </>
  );
};

export default StepCard;