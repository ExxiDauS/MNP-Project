import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import BackButton from "../buttons/BackButton";

interface DetailHeaderProps {
  name: string;
  address: string;
  price: string;
  id: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  name,
  address,
  price,
  id,
}) => {
  return (
    <div className="px-2 md:px-6 pt-4 pb-2 md:pb-4">
      {/* Back button */}
      <BackButton className="mb-3" href="/main-landing" />

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        {/* Left section */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-custom-text-primary">
            {name}
          </h1>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-white" />
            <span className="text-custom-text-secondary">{address}</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <span className="text-lg md:text-2xl font-bold text-custom-text-primary whitespace-nowrap">
            ฿{price} / ชั่วโมง
          </span>
          <a href={`${id}/booking`}>
            <Button className="bg-custom-purple-dark hover:bg-custom-purple text-white px-4 md:px-6 py-2 md:py-3 whitespace-nowrap">
              จองเวที
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;