import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { format } from "date-fns";

import DateSelect from '../DateSelect';
import TimeSelect from '../TimeSelect';
import FacilitiesCarousel from '../FacilitiesCarousel';
import PaymentDialog from '@/components/payments/PaymentDialog';
import { useRouter } from 'next/navigation';

// Import Facility type from FacilitySelect
import { Facility } from '../FacilitySelect';

// New interface to match the provided JSON structure
interface FacilitiesObject {
  facilities_id: number;
  livehouse_id: number;
  mic: string;
  guitar: string;
  bass: string;
  drum: string;
  keyboard: string;
  pa_monitor: string;
  mic_price: number;
  guitar_price: number;
  bass_price: number;
  drum_price: number;
  keyboard_price: number;
  pa_monitor_price: number;
}

interface BookingFormProps {
  artistId: string | undefined;
  livehouseId: string;
  livehousePrice: number;
  livehouseName: string;
  facilitiesData: FacilitiesObject | null; // Updated to use the new interface
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

// Helper function to convert facilities object to array of facility items
const convertFacilitiesToArray = (facilitiesData: FacilitiesObject): Facility[] => {
  return [
    { id: "mic", name: facilitiesData.mic, details: "ไมโครโฟน", pricePerHour: facilitiesData.mic_price },
    { id: "guitar", name: facilitiesData.guitar, details: "กีตาร์", pricePerHour: facilitiesData.guitar_price },
    { id: "bass", name: facilitiesData.bass, details: "เบส", pricePerHour: facilitiesData.bass_price },
    { id: "drum", name: facilitiesData.drum, details: "กลอง", pricePerHour: facilitiesData.drum_price },
    { id: "keyboard", name: facilitiesData.keyboard, details: "คีย์บอร์ด", pricePerHour: facilitiesData.keyboard_price },
    { id: "pa_monitor", name: facilitiesData.pa_monitor, details: "ลำโพงมอนิเตอร์", pricePerHour: facilitiesData.pa_monitor_price }
  ];
};

const BookingForm: React.FC<BookingFormProps> = ({ artistId, livehouseId, livehousePrice, livehouseName, facilitiesData }) => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFacilities, setSelectedFacilities] = useState<Record<string, string>>({
    guitar: "0",
    bass: "0",
    drum: "0",
    mic: "0",
    keyboard: "0",
    pa_monitor: "0"
  });
  const [paymentQrCode, setPaymentQrCode] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    totalLivehousePrice: 0,
    facilitiesPrice: 0,
    totalPrice: 0
  });

  // Convert facilitiesData to array format for the FacilitiesCarousel
  const facilitiesArray = facilitiesData ? convertFacilitiesToArray(facilitiesData) : [];
  
  const timeSlots = generateTimeSlots();

  // Function to fetch payment QR code
  const fetchPaymentQR = async (bookingId: string) => {
    try {
      // Fetch the QR code as an image
      const response = await fetch(`http://localhost:5000/api/payment/generateQR/${bookingId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch QR code with status: ${response.status}`);
      }

      // Get the image as a blob
      const imageBlob = await response.blob();

      // Create a URL for the blob
      const imageUrl = URL.createObjectURL(imageBlob);

      // Update the state with the image URL
      setPaymentQrCode(imageUrl);
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  const handlePaymentComplete = async (file: File) => {
    // Set loading state to true
    setIsLoading(true);

    // Prepare form data for the API request
    const formData = new FormData();
    formData.append('image', file);
    formData.append('booking_id', bookingId);

    try {
      // Make the API call to upload the payment proof
      const response = await fetch('http://localhost:5000/api/payment/upload', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload payment proof with status: ${response.status}`);
      }

      // Show success toast notification
      toast.success("การชำระเงินได้รับการยืนยัน", {
        description: "การจองของคุณได้รับการยืนยันเรียบร้อยแล้ว.",
        duration: 5000,
        style: {
          background: "#1a8300",
          color: "#FFFFFF", // White text for readability
          borderRadius: "8px",
          fontWeight: "bold",
          padding: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow for better visibility
        },
      });

      // Close payment dialog
      setIsPaymentDialogOpen(false);
      router.push("/artist-booking-list");
    } catch (error) {
      toast.error("การอัปโหลดการชำระเงินล้มเหลว", {
        description: "เกิดข้อผิดพลาดในการอัปโหลดหลักฐานการชำระเงินของคุณ กรุณาลองใหม่อีกครั้ง.",
        duration: 5000,
        style: {
          background: "#ff4d4f",
          color: "#FFFFFF",
          borderRadius: "8px",
          fontWeight: "bold",
          padding: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      });
    } finally {
      // Set loading state to false regardless of success or failure
      setIsLoading(false);
    }
  };

  // Handle facility toggle
  const handleFacilityToggle = (facilityId: string) => {
    // Update the selected state
    setSelectedFacilities(prev => ({
      ...prev,
      [facilityId]: prev[facilityId] === "1" ? "0" : "1"
    }));
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

    // Calculate Facilities Price using the new facilitiesData structure
    const facilitiesPrice = Object.entries(selectedFacilities).reduce((total, [facilityId, isSelected]) => {
      if (isSelected === "1") {
        const priceKey = `${facilityId}_price` as keyof FacilitiesObject;
        // Properly type cast the price value to number
        const facilityPrice = facilitiesData ? Number(facilitiesData[priceKey]) || 0 : 0;
        return total + (facilityPrice * hours);
      }
      return total;
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

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate date is selected
    if (!date) {
      toast.error("จำเป็นต้องเลือกวันที่", {
        description: "กรุณาเลือกวันที่สำหรับการจองของคุณ.",
        duration: 4000,
        style: {
          background: "#ff4d4f",
          color: "#FFFFFF",
          borderRadius: "8px",
          fontWeight: "bold",
          padding: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      });
      return;
    }

    // Validate start and end times are selected
    if (!startTime || !endTime) {
      toast.error("จำเป็นต้องเลือกเวลา", {
        description: "กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุดสำหรับการจองของคุณ.",
        duration: 4000,
        style: {
          background: "#ff4d4f",
          color: "#FFFFFF",
          borderRadius: "8px",
          fontWeight: "bold",
          padding: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      });
      return;
    }

    // Format date and time for API
    const formattedStartDateTime = `${format(date, "yyyy-MM-dd")}T${startTime}:00`;
    const formattedEndDateTime = `${format(date, "yyyy-MM-dd")}T${endTime}:00`;

    // Prepare data for API in the exact format required
    const bookingData = {
      user_id: artistId || '',
      livehouse_id: livehouseId,
      start_time: formattedStartDateTime,
      end_time: formattedEndDateTime,
      total_price: priceBreakdown.totalPrice.toString(),
      guitar: selectedFacilities.guitar,
      bass: selectedFacilities.bass,
      keyboard: selectedFacilities.keyboard,
      drum: selectedFacilities.drum,
      mic: selectedFacilities.mic,
      pa_monitor: selectedFacilities.pa_monitor
    };

    try {
      console.log('Sending booking data:', bookingData);

      // Make the API call
      const response = await fetch('http://localhost:5000/api/reserve/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const booking_id = await response.json();

      // Extract booking ID from response
      if (booking_id) {
        setBookingId(booking_id.result);

        // Fetch QR code for this booking
        await fetchPaymentQR(booking_id.result);

        // Show payment dialog
        setIsPaymentDialogOpen(true);
      } else {
        alert('การสร้างการจองสำเร็จ แต่ข้อมูลการชำระเงินไม่พร้อมใช้งาน');
      }

    } catch (error) {
      // You might want to show an error message to the user here
      alert('การสร้างการจองล้มเหลว กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div className="mx-6 my-6 p-6 bg-gradient-card shadow-md rounded-xl">
      <form onSubmit={handleBookNow} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Date & Time Selection */}
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-custom-text-primary">เลือกวันที่และเวลา</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-custom-text-primary">เลือกสิ่งอำนวยความสะดวก</h3>
            <FacilitiesCarousel
              facilities={facilitiesArray}
              selectedFacilities={Object.keys(selectedFacilities).filter(id => selectedFacilities[id] === "1")}
              onFacilityToggle={handleFacilityToggle}
            />
          </div>
        </div>

        {/* Price Breakdown */}
        {startTime && endTime && (
          <div className="bg-custom-background-elevated rounded-lg p-4 space-y-2 text-custom-text-primary">
            <div className="flex justify-between">
              <span>ค่าเช่าสถานที่:</span>
              <span>฿{priceBreakdown.totalLivehousePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>ค่าสิ่งอำนวยความสะดวก:</span>
              <span>฿{priceBreakdown.facilitiesPrice}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>ราคารวม:</span>
              <span>฿{priceBreakdown.totalPrice}</span>
            </div>
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-custom-purple-dark hover:bg-custom-purple text-white"
        >
          จองนัดหมาย
        </Button>
      </form>

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        livehouseName={livehouseName}
        livehousePrice={priceBreakdown.totalLivehousePrice}
        facilitiesPrice={priceBreakdown.facilitiesPrice}
        qrCodeUrl={paymentQrCode}
        onPaymentComplete={handlePaymentComplete}
        isLoading={isLoading} // Pass the loading state
      />
    </div>
  );
};

export default BookingForm;