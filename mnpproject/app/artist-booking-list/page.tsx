'use client'

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import BookingHistoryCard from '@/components/cards/BookingHistoryCard';
import { useUser } from '@/contexts/UserContext';

export interface Facilities {
  mic: string;
  guitar: string;
  bass: string;
  drum: string;
  keyboard: string;
  pa_monitor: string;
}

export interface BookingData {
  booking_id: number;
  user_id: number;
  livehouse_id: number;
  startTime: string;
  endTime: string;  
  totalPrice: string;
  payment_proof: string | null;
  status: 'Accept' | 'Decline' | 'Pending';
  facilities: Facilities;
}


const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchBookings = async () => {
      // Check if user is logged in
      if (!user) {
        setError('User not logged in');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Fetch bookings for the user
        const response = await fetch(`http://localhost:5000/api/reserve/get_booking/${user.user_id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch booking data');
        }

        const data: BookingData[] = await response.json();
        
        // Log the full response
        console.log('Full Bookings API Response:', data);

        setBookings(data);
        console.log("this is booking", bookings)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error fetching bookings:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Loading state
  if (isLoading) {
    return (
      <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-6xl mx-auto px-0 sm:px-0 md:px-0 mb-10">
        <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-6 items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-white" />
          <span className="text-white mt-4">Loading bookings...</span>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-6xl mx-auto px-0 sm:px-0 md:px-0 mb-10">
        <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-6">
          <div className="text-red-600 text-center">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-6xl mx-auto px-0 sm:px-0 md:px-0 mb-10">
      {/* Larger aura effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>
      
      {/* Content container */}
      <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">My Bookings</h1>
        
        {/* If no bookings */}
        {bookings.length === 0 ? (
          <div className="text-center text-white">No bookings found</div>
        ) : (
          // Map through the bookings data
          bookings.map((booking) => (
            <BookingHistoryCard 
              key={booking.booking_id} 
              booking={booking}
              qrCodeUrl=""
              livehouseName={""}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default BookingsPage;