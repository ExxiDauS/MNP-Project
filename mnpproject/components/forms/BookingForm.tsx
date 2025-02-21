import React, { useState } from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Facilities data with details
const facilitiesData = [
  {
    id: 'microphone',
    name: 'Microphone',
    details: 'Shure SM58',
    pricePerHour: 300
  },
  {
    id: 'guitar',
    name: 'Guitar',
    details: 'Fender Vintera II Strat',
    pricePerHour: 500
  },
  {
    id: 'bass',
    name: 'Bass',
    details: 'Fender Precision Bass',
    pricePerHour: 450
  },
  {
    id: 'drum',
    name: 'Drum',
    details: 'Pearl Export Series',
    pricePerHour: 600
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    details: 'Yamaha MODX6',
    pricePerHour: 400
  },
  {
    id: 'paMonitor',
    name: 'PA Monitor',
    details: 'QSC K12.2',
    pricePerHour: 350
  }
];

// Generate time slots in 30-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return slots;
};

export default function BookingForm({ livehousePrice }: { livehousePrice: number }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const timeSlots = generateTimeSlots();

  const handleFacilityToggle = (facilityId: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facilityId)
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    );
  }

  const calculateBookingHours = () => {
    if (!startTime || !endTime) return 0;
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const start = startHour + startMinute / 60;
    const end = endHour + endMinute / 60;
    
    return Math.max(0, end - start);
  }

  const calculateTotalPrice = () => {
    const hours = calculateBookingHours();
    
    // Calculate livehouse base price
    const totalLivehousePrice = livehousePrice * hours;

    // Calculate facilities price
    const selectedFacilitiesDetails = facilitiesData.filter(facility => 
      selectedFacilities.includes(facility.id)
    );
    
    const facilitiesPrice = selectedFacilitiesDetails.reduce((total, facility) => {
      return total + (facility.pricePerHour * hours);
    }, 0);

    // Total price is sum of livehouse and facilities prices
    return {
      totalLivehousePrice,
      facilitiesPrice,
      totalPrice: totalLivehousePrice + facilitiesPrice
    };
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prices = calculateTotalPrice();
    
    // Add your booking submission logic here
    console.log('Booking Details:', {
      date: date ? format(date, 'PPP') : null,
      startTime,
      endTime,
      selectedFacilities,
      prices: {
        totalLivehousePrice: prices.totalLivehousePrice,
        facilitiesPrice: prices.facilitiesPrice,
        totalPrice: prices.totalPrice
      }
    });
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Selection */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="text-sm font-medium block mb-2">Start Time</label>
            <Select onValueChange={setStartTime} value={startTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium block mb-2">End Time</label>
            <Select onValueChange={setEndTime} value={endTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Facilities Selection */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Select Facilities</h3>
          <div className="space-y-2">
            {facilitiesData.map((facility) => (
              <div key={facility.id} className="flex items-center space-x-2">
                <Checkbox
                  id={facility.id}
                  checked={selectedFacilities.includes(facility.id)}
                  onCheckedChange={() => handleFacilityToggle(facility.id)}
                />
                <label
                  htmlFor={facility.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow flex justify-between"
                >
                  <span>{facility.name} - {facility.details}</span>
                  <span>฿{facility.pricePerHour} / Hour</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        {startTime && endTime && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Livehouse Rental:</span>
              <span>฿{calculateTotalPrice().totalLivehousePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Facilities:</span>
              <span>฿{calculateTotalPrice().facilitiesPrice}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Price:</span>
              <span>฿{calculateTotalPrice().totalPrice}</span>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full">
          Book Appointment
        </Button>
      </form>
    </div>
  )
}