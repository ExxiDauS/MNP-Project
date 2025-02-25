import React, { ReactNode } from 'react';

interface StepCardProps {
  index: number;
  title: string;
  description: string;
  icon: ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ index, title, description, icon }) => {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none">
      {/* Step number bubble */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 sm:left-0 sm:translate-x-0 w-8 h-8 bg-custom-purple-dark text-white rounded-full flex items-center justify-center font-bold">
        {index}
      </div>

      {/* Card Content */}
      <div className="bg-gradient-card p-6 rounded-lg shadow-sm w-full text-center h-full flex flex-col items-center border border-custom-purple-light">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 whitespace-pre-line text-custom-text-primary text-center sm:text-left">
          {title}
        </h3>
        <p className="text-custom-text-secondary text-sm text-center sm:text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
