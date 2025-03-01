import React, { ReactNode } from 'react';

interface StepCardProps {
  index: number;
  title: string;
  description: string;
  icon: ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ index, title, description, icon }) => {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none h-full flex flex-col items-center justify-center">
      {/* Step number bubble */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 sm:left-0 sm:translate-x-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold border-2 border-black">
        {index}
      </div>

      {/* Card Content */}
      <div className="bg-gradient-to-tl from-black to-zinc-900 p-5 rounded-xl shadow-md w-full text-center flex flex-col items-center border-4 border-purple-400 flex-grow h-full justify-center">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white text-center flex-grow flex items-center justify-center">
          {title}
        </h3>
        <p className="text-gray-400 text-sm text-center flex-grow flex">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;