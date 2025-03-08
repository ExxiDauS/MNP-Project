'use client'

import React, { useState, useEffect } from 'react';
import BookingHistoryCard from '@/components/cards/BookingHisButManager';
import { useUser } from '@/contexts/UserContext';
import BackButton from '@/components/buttons/BackButton';

export interface Facilities {
  mic: number;
  guitar: number;
  bass: number;
  drum: number;
  keyboard: number;
  pa_monitor: number;
}

interface BookingInfo {
  booking_id: number;
  user_id: number;
  livehouse_id: number;
  start_time: string;
  end_time: string;
  total_price: string;
  status: 'Accept' | 'Decline' | 'Pending';
  payment_proof: string | null;
  mic: string;
  guitar: string;
  bass: string;
  drum: string;
  keyboard: string;
  pa_monitor: string;
}

export interface BookingData {
  bookingInfo: BookingInfo;
  livehousePrice: number;
  facilities: Facilities;
}


const pending: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchBookings = async () => {
      // Check if user is logged in
      if (!user?.user_id) {
        setError('User not logged in');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Fetch bookings for the user
        const response = await fetch(`http://localhost:5000/api/reserve/get_booking_by_livehouse/${user.user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking data');
        }

        const data: BookingData[] = await response.json();

        // Log the full response
        console.log('Full Bookings API Response:', data);

        setBookings(data);
        console.log("this is booking", bookings);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error fetching bookings:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
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
      <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 md:p-6 m-6 mt-14 md:mt-10 ">
        <BackButton href='/manager-landing' className='mt-2'/>
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">การจองที่เข้ามา</h1>

        {/* If no bookings */}
        {bookings.length === 0 ? (
          <div className="text-center text-white">No bookings found</div>
        ) : (
          // Map through the bookings data
          bookings.map((booking) => (
            <BookingHistoryCard
              key={booking.bookingInfo.booking_id}
              booking={booking}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default pending;