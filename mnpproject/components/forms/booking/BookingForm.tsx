import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import DateSelect from '../DateSelect';
import TimeSelect from '../TimeSelect';
import FacilitiesCarousel from '../FacilitiesCarousel';
import PaymentDialog from '@/components/payments/PaymentDialog';

import payment_qr from '@/public/payment_qr.png'

interface Facility {
  id: string;
  name: string;
  details: string;
  pricePerHour: number;
}

interface BookingFormProps {  
  livehousePrice: number;
  livehouseName: string;
  facilitiesData: Facility[];
}

interface PriceBreakdown {
  totalLivehousePrice: number;
  facilitiesPrice: number;
  totalPrice: number;
}

// Generate time 00:00 to 23:30 separate by 30 mins
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

const BookingForm: React.FC<BookingFormProps> = ({ livehousePrice, livehouseName, facilitiesData }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    totalLivehousePrice: 0,
    facilitiesPrice: 0,
    totalPrice: 0
  });

  const timeSlots = generateTimeSlots();

  // Handle facility toggle
  const handleFacilityToggle = (facilityId: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facilityId)
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    );
  };

  // Calculate Booking Hours
  const calculateBookingHours = () => {
    if (!startTime || !endTime) return 0;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Convert to minutes for easier calculation
    let startMinutes = startHour * 60 + startMinute;
    let endMinutes = endHour * 60 + endMinute;

    // If end time is earlier than start time, assume it's the next day
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60; // Add 24 hours worth of minutes
    }

    // Calculate difference in hours
    return (endMinutes - startMinutes) / 60;
  };

  // Calculate Total price (Booking + Facilities)
  const calculateTotalPrice = (): PriceBreakdown => {
    const hours = calculateBookingHours();
    const totalLivehousePrice = livehousePrice * hours;

    const selectedFacilitiesDetails = facilitiesData.filter(facility =>
      selectedFacilities.includes(facility.id)
    );

    // Calculate Facilities Price here
    const facilitiesPrice = selectedFacilitiesDetails.reduce((total, facility) => {
      return total + (facility.pricePerHour * hours);
    }, 0);

    return {
      totalLivehousePrice,
      facilitiesPrice,
      totalPrice: totalLivehousePrice + facilitiesPrice
    };
  };

  // Update price breakdown when relevant inputs change
  useEffect(() => {
    if (startTime && endTime) {
      const newPrices = calculateTotalPrice();
      setPriceBreakdown(newPrices);
    }
  }, [startTime, endTime, selectedFacilities, livehousePrice]);

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentDialogOpen(true);
    const formattedStartDateTime = date ? `${format(date, "yyyy-MM-dd")}T${startTime}:00` : null;
    const formattedEndDateTime = date ? `${format(date, "yyyy-MM-dd")}T${endTime}:00` : null;

    console.log('Booking Details:', {
      formattedStartDateTime,
      formattedEndDateTime,
      selectedFacilities,
      prices: priceBreakdown
    });
  };

  return (
    <div className="mx-6 my-6 p-6 bg-gradient-card shadow-md rounded-xl">
      <form onSubmit={handleBookNow} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Date & Time Selection */}
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-custom-text-primary">Select Date & Time</h3>
            <DateSelect date={date} onDateChange={setDate} />
            <TimeSelect
              startTime={startTime}
              endTime={endTime}
              onStartTimeChange={setStartTime}
              onEndTimeChange={setEndTime}
              timeSlots={timeSlots}
            />
          </div>

          {/* Right Column - Facilities Selection */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-custom-text-primary">Select Facilities</h3>
            <FacilitiesCarousel
              facilities={facilitiesData}
              selectedFacilities={selectedFacilities}
              onFacilityToggle={handleFacilityToggle}
            />
          </div>
        </div>

        {/* Price Breakdown */}
        {startTime && endTime && (
          <div className="bg-custom-background-elevated rounded-lg p-4 space-y-2 text-custom-text-primary">
            <div className="flex justify-between">
              <span>Livehouse Rental:</span>
              <span>฿{priceBreakdown.totalLivehousePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Facilities:</span>
              <span>฿{priceBreakdown.facilitiesPrice}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Price:</span>
              <span>฿{priceBreakdown.totalPrice}</span>
            </div>
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-custom-purple-dark hover:bg-custom-purple text-white"
        >
          Book Appointment
        </Button>
      </form>

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        livehouseName={livehouseName}
        livehousePrice={priceBreakdown.totalLivehousePrice}
        facilitiesPrice={priceBreakdown.facilitiesPrice}
        qrCodeUrl={payment_qr}
        onPaymentComplete={() => {
          console.log("Payment completed");
          // Add your payment handling logic here
        }}
      />
    </div>
  );
};

export default BookingForm;