import React from 'react';
import BookingHistoryCard, { BookingData } from '@/components/cards/BookingHistoryCard';

const Page: React.FC = () => {
  // Mock data - this would be fetched from your API
  const bookings: BookingData[] = [
    {
      stageName: "Studio A",
      startTime: "2025-03-02T14:00:00",
      endTime: "2025-03-02T16:00:00",
      totalPrice: "1200",
      payment_proof: "payment_receipt.jpg",
      status: "Accept",
      facilities: {
        mic: "1",
        guitar: "1",
        bass: "0",
        drum: "1",
        keyboard: "0",
        pa_monitor: "1"
      }
    },
    {
      stageName: "Studio B",
      startTime: "2025-03-05T10:00:00",
      endTime: "2025-03-05T13:00:00",
      totalPrice: "1800",
      payment_proof: null,
      status: "Pending",
      facilities: {
        mic: "1",
        guitar: "0",
        bass: "1",
        drum: "0",
        keyboard: "1",
        pa_monitor: "1"
      }
    },
    {
      stageName: "Studio C",
      startTime: "2025-03-10T18:00:00",
      endTime: "2025-03-10T21:00:00",
      totalPrice: "1500",
      payment_proof: null,
      status: "Decline",
      facilities: {
        mic: "1",
        guitar: "1",
        bass: "1",
        drum: "1",
        keyboard: "1",
        pa_monitor: "1"
      }
    }
  ];

  return (
    <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-6xl mx-auto px-0 sm:px-0 md:px-0 mb-10">
        {/* Larger aura effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>
        {/* Content container */}
        <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-purple-800">My Bookings</h1>
            
            {/* Map through the bookings data */}
            {bookings.map((booking, index) => (
              <BookingHistoryCard 
                key={index} 
                booking={booking} 
              />
            ))}
        </div>
    </section>
  );
};

export default Page;