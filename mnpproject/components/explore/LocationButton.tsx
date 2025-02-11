import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const LocationButton = () => {
  return (
    <Button 
      variant="secondary" 
      className="w-80 white hover:bg-gray-200 h-16 flex items-center gap-3 rounded-full relative group"
    >
      {/* Logo - appears on hover */}
      <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <img 
          src="bangkok.png" 
          alt="Company Logo" 
          className="w-32 h-32"
        />
      </div>

      {/* Location Icon */}
      <div className="flex items-center justify-center w-8 h-8">
        <MapPin className="w-6 h-6" />
      </div>

      {/* Location Text */}
      <div className="flex flex-col items-start">
        <span className="text-sm font-normal">Bangkok</span>
        <span className="text-xs text-zinc-400">BKK</span>
      </div>
    </Button>
  )
}

export default LocationButton