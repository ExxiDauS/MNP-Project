import React from "react";
import BackButton from "../../buttons/BackButton";
import { MapPin } from "lucide-react";

interface BookingHeaderProps {
  name: string;
  address: string;
  artistName: string | undefined;
  price: string;
  id: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({
  name,
  address,
  artistName,
  price,
  id,
}) => {
  return (
    <div className="px-6 pt-6">
      {/* Back button */}
      <BackButton className="mb-4" href={`/livehouse-detail/${id}`} />

      <div className="flex flex-col md:flex-row justify-between items-start w-full px-2">
        {/* Left section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-custom-text-primary">
            {name}
          </h1>

          <div className="flex items-start gap-2 text-sm text-gray-600 ">
            <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-white" />
            <span className="text-custom-text-secondary">{address}</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col md:ml-4 pt-2">
          <span className="text-lg font-bold text-custom-text-primary">
            ฿{price} / Hour
          </span>
          <span className="text-lg font-bold text-custom-text-primary">
            Booking By : {artistName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
