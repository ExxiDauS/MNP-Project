import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationProps {
    address: string
    coordinates: {
        lat: number
        lng: number
    }
}

const Location: React.FC<LocationProps> = ({ address, coordinates }) => {
  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-xl font-semibold mb-4 text-custom-text-primary">Location</h2>
      <div className="bg-gray-200 rounded-lg h-[300px] overflow-hidden">
        {/* Map placeholder */}
        <div className="w-full h-56 bg-gray-300 animate-pulse relative">
          <MapPin className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Address details */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <p className="text-gray-600 text-sm">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;