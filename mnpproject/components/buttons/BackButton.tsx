import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;  // Optional path to navigate to 
  className?: string;  // Optional additional classes
}

const BackButton: React.FC<BackButtonProps> = ({ href, className = '' }) => {
  const router = useRouter();


  return (
    <a href={href}>
      <button
        className={`flex items-center text-custom-text-primary hover:text-custom-purple transition-colors ${className}`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
    </a>
  );
};

export default BackButton;