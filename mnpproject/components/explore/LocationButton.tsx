import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const LocationButton = ({ 
  location, 
  abbreviation, 
  logo, 
  logo_w, 
  logo_h, 
  bgcolor 
}: { 
  location: string, 
  abbreviation: string, 
  logo: string, 
  logo_w: number, 
  logo_h: number, 
  bgcolor: string 
}) => {
  return (
    <Button
      className="w-72 white h-16 flex items-center bg-gradient-to-l from-[#333333] to-[#646464] drop-shadow-lg gap-3 rounded-full group"
    >
      {/* Logo appear when hover */}
      <div 
        style={{ backgroundColor: bgcolor }}
        className="absolute opacity-0 group-hover:opacity-100 group w-72 h-16 flex items-center gap-3 rounded-full justify-center transition-opacity duration-300"
      >
        <div className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300`}
            style={{ 
              width: `${logo_w}px`,
              height: `${logo_h}px`
            }}
          />
        </div>
      </div>

      {/* Location Icon */}
      <div className="flex items-center justify-center size-8">
        <MapPin className="text-white" />
      </div>

      {/* Location Text */}
      <div className="flex flex-col items-start">
        <span className="text-sm font-normal">{location}</span>
        <span className="text-xs text-zinc-400">{abbreviation}</span>
      </div>
    </Button>
  )
}

export default LocationButton