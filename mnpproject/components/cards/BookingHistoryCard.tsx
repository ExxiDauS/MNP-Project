'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Mic, Guitar, Drum, Speaker, Music, Keyboard } from 'lucide-react';
import { BookingData } from '@/app/artist-booking-list/page';
import { Facilities } from '@/app/artist-booking-list/page';

interface BookingHistoryCardProps {
  booking: BookingData;
}

const BookingHistoryCard: React.FC<BookingHistoryCardProps> = ({ booking }) => {
  const [livehouseName, setLivehouseName] = useState<string>('');

  useEffect(() => {
    const fetchLivehouseName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/livehouse/get-livehouse/${booking.bookingInfo.livehouse_id}`);
        const data = await response.json();
        setLivehouseName(data.name);
      } catch (error) {
        console.error('Error fetching livehouse name:', error);
      }
    };

    fetchLivehouseName();
  }, [booking.bookingInfo.livehouse_id]);

  // Format date and time
  // Function to format a single date string
  const formatDateTime = (dateString: string | undefined, isEndTime: boolean = false, startTimeString?: string): string => {
    if (!dateString) return '';

    // Ensure the date string is in a format that can be parsed by new Date()
    const formattedDateString = dateString.replace('T', ' ').replace('.000Z', '');
    const date = new Date(formattedDateString);
    // Adjust time to GMT+7 (+7 hours)
    date.setHours(date.getHours() + 7);

    // If this is an end time and we have a start time, check if it's an overnight booking
    if (isEndTime && startTimeString) {
      const startFormattedDateString = startTimeString.replace('T', ' ').replace('.000Z', '');
      const startDate = new Date(startFormattedDateString);
      // Adjust start time to GMT+7
      startDate.setHours(startDate.getHours() + 7);

      // If end hour is less than start hour, it's likely an overnight booking
      if (date.getHours() < startDate.getHours() &&
        date.getDate() === startDate.getDate() &&
        date.getMonth() === startDate.getMonth() &&
        date.getFullYear() === startDate.getFullYear()) {
        // Add one day to the end date
        date.setDate(date.getDate() + 1);
      }
    }

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Calculate duration in hours
  const calculateDuration = (): string => {
    const start = new Date(booking.bookingInfo.start_time);
    const end = new Date(booking.bookingInfo.end_time);

    // Handle the case where end time is on the next day (end < start)
    let durationMs = end.getTime() - start.getTime();

    // If duration is negative, it means the booking spans midnight
    if (durationMs < 0) {
      // Add 24 hours (in milliseconds) to account for the next day
      durationMs += 24 * 60 * 60 * 1000;
    }

    const durationHours = durationMs / (1000 * 60 * 60);
    return durationHours.toFixed(1);
  };

  // Get selected facilities
  const selectedFacilities = Object.entries(booking.facilities)
    .filter(([_, value]) => value === 1)
    .map(([facility]) => facility as keyof Facilities);

  // Get status badge color
  const getStatusBadgeClass = () => {
    switch (booking.bookingInfo.status) {
      case 'Accept':
        return 'bg-green-700 hover:bg-green-800';
      case 'Decline':
        return 'bg-red-600 hover:bg-red-700';
      case 'Pending':
      default:
        return 'bg-yellow-600 hover:bg-yellow-700';
    }
  };

  // Only render the card if the booking is paid
  if (!booking.bookingInfo.payment_proof) {
    return null;
  }

  return (
    <Card className="w-full mx-0 my-4 border border-custom-purple-deeper bg-gradient-card shadow-md">
      {/* Header with studio name and status */}
      <div className="flex justify-between items-center bg-custom-purple-deeper p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-white">{livehouseName}</h2>
        <div className="flex gap-2">
          <Badge className={getStatusBadgeClass() + " py-1 px-3"}>
            {booking.bookingInfo.status}
          </Badge>
          <Badge className="bg-green-700 hover:bg-green-800 py-1 px-3">
            <Check className="mr-1 h-4 w-4" /> Paid
          </Badge>
        </div>
      </div>

      {/* Card content with two columns */}
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Time and Price */}
        <div className="space-y-6">
          {/* Time slot */}
          <div className="text-white">
            <div className="flex items-center mb-2">
              <Clock className="mr-2 h-5 w-5 text-indigo-300" />
              <span className="font-semibold">Time Slot</span>
            </div>
            <div className="ml-7 space-y-1">
              <div>Start : {formatDateTime(booking.bookingInfo.start_time)}</div>
              <div>End : {formatDateTime(booking.bookingInfo.end_time, true, booking.bookingInfo.start_time)}</div>
              <div className="text-sm text-gray-400">{calculateDuration()} hours</div>
            </div>
          </div>

          {/* Total price */}
          <div className="text-white">
            <div className="flex items-center mb-2">
              <div className="mr-2 h-5 w-5 text-indigo-300 flex items-center justify-center font-bold">฿</div>
              <span className="font-semibold">Total Price</span>
            </div>
            <div className="ml-7">
              {booking.bookingInfo.total_price} THB
            </div>
          </div>
        </div>

        {/* Right column - Facilities */}
        <div className="text-white">
          <div className="font-semibold mb-3">Facilities</div>
          <div className="flex flex-wrap gap-2">
            {selectedFacilities.includes('mic') && (
              <Badge className="bg-[#1a1e2c] hover:bg-[#252a3c] border border-indigo-800 py-1.5 px-3">
                <Mic className="mr-1.5 h-4 w-4" /> Mic
              </Badge>
            )}
            {selectedFacilities.includes('guitar') && (
              <Badge className="bg-[#1a1e2c] hover:bg-[#252a3c] border border-indigo-800 py-1.5 px-3">
                <Guitar className="mr-1.5 h-4 w-4" /> Guitar
              </Badge>
            )}
            {selectedFacilities.includes('bass') && (
              <Badge className="bg-[#1a1e2c] hover:bg-[#252a3c] border border-indigo-800 py-1.5 px-3">
                <Music className="mr-1.5 h-4 w-4" /> Bass
              </Badge>
            )}
            {selectedFacilities.includes('drum') && (
              <Badge className="bg-[#1a1e2c] hover:bg-[#252a3c] border border-indigo-800 py-1.5 px-3">
                <Drum className="mr-1.5 h-4 w-4" /> Drum
              </Badge>
            )}
            {selectedFacilities.includes('keyboard') && (
              <Badge className="bg-[#1a1e2c] hover:bg-[#252a3c] border border-indigo-800 py-1.5 px-3">
                <Keyboard className="mr-1.5 h-4 w-4" /> Keyboard
              </Badge>
            )}
            {selectedFacilities.includes('pa_monitor') && (
              <Badge className="bg-[#1a1e2c] hover:bg-[#252a3c] border border-indigo-800 py-1.5 px-3">
                <Speaker className="mr-1.5 h-4 w-4" /> Pa monitor
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingHistoryCard;