import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface Facility {
  id: string;
  name: string;
  details: string;
  pricePerHour: number;
}

interface FacilitySelectProps {
  facility: Facility;
  checked: boolean;
  onCheckedChange: (facilityId: string) => void;
}

const FacilitySelect: React.FC<FacilitySelectProps> = ({ facility, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className={cn(
          "border-custom-text-primary transition-colors duration-200",
          "data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
        )}
        id={facility.id}
        checked={checked}
        onCheckedChange={() => onCheckedChange(facility.id)}
      />
      <label
        htmlFor={facility.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow flex justify-between text-custom-text-primary"
      >
        <span>{facility.name} - {facility.details}</span>
        <span>฿{facility.pricePerHour} / Hour</span>
      </label>
    </div>
  )
}

export default FacilitySelect