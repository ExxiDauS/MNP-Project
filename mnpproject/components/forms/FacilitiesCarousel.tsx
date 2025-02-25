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
          <h3 className="text-sm font-medium text-custom-text-primary">Select Facilities</h3>
          <div className="space-y-2">
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