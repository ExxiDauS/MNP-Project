import React from 'react'
import FacilitySelect from './FacilitySelect';
import { Facility } from './FacilitySelect';

interface FacilitiesCarouselProps {
    facilities: Facility[];
    selectedFacilities: string[];
    onFacilityToggle: (facilityId: string) => void;
  }

const FacilitiesCarousel: React.FC<FacilitiesCarouselProps> = ({ facilities, selectedFacilities, onFacilityToggle }) => {
  return (
    <div className="space-y-2">
          <div className="space-y-2 mt-7">
            {facilities.map((facility) => (
              <FacilitySelect
                key={facility.id}
                facility={facility}
                checked={selectedFacilities.includes(facility.id)}
                onCheckedChange={onFacilityToggle}
              />
            ))}
          </div>
        </div>
  )
}

export default FacilitiesCarousel