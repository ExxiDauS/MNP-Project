"use client";
import React, { useState } from "react";

// Define the shape of a booking
interface Booking {
  time: string;
  customer: string;
  service: string;
}

// Define the type for the bookings data
interface BookingsData {
  [date: string]: Booking[]; // Key is the date in "yyyy-mm-dd" format, and value is an array of bookings
}

// Helper function to get all days in a month including leading/trailing days
const getDaysInMonth = (year: number, month: number): Date[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Get the first day of the week (Sunday = 0)
  const firstDayIndex = firstDayOfMonth.getDay();

  // Get the previous month's days to fill empty spaces at the start
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, prevMonthLastDay - i));
  }

  // Add current month's days
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Fill remaining cells with next month's days if necessary
  let i = 1;
  while (days.length % 7 !== 0) {
    days.push(new Date(year, month + 1, i++));
  }

  return days;
};

interface BookingCalendarProps {
  bookingsData: BookingsData;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookingsData }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Function to change month
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentYear, currentMonth + increment, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  // Get all days in the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Format date to "yyyy-mm-dd"
  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  // Handle date click to select the day
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    // <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-10">

    <div className="relative max-w-4xl mx-auto p-6 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl">
      {/* The aura */}
      <div className="-z-10 absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-3xl rounded-3xl"></div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6 ">
        <button
          className="bg-gray-300 p-2 rounded"
          onClick={() => changeMonth(-1)}
        >
          Prev
        </button>
        <h1 className="text-2xl font-semibold text-secondary">
          {monthNames[currentMonth]} {currentYear}
        </h1>
        <button
          className="bg-gray-300 p-2 rounded"
          onClick={() => changeMonth(1)}
        >
          Next
        </button>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 text-center text-secondary">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}

        {daysInMonth.map((date, index) => {
          const formattedDate = formatDate(date);
          const isCurrentMonth = date.getMonth() === currentMonth;
          const hasBookings = bookingsData[formattedDate]?.length > 0;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`cursor-pointer p-2 rounded-md 
                ${
                  date.toDateString() === new Date().toDateString()
                    ? "bg-blue-300"
                    : ""
                } 
                ${
                  !isCurrentMonth && hasBookings
                    ? "bg-purple-600 opacity-50"
                    : hasBookings
                    ? "bg-purple-600"
                    : isCurrentMonth
                    ? "bg-purple-400"
                    : "bg-purple-400 opacity-50"
                }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {/* Display Bookings for Selected Date */}
      {selectedDate && (
        <div className="mt-6 text-center min-w-max mx-auto bg-gradient-card p-4 rounded-md shadow-md text-secondary">
          <h2 className="text-xl mb-3">
            {`Bookings for ${selectedDate.toLocaleDateString()}`}
          </h2>
          <ul className="w-full">
            {(bookingsData[formatDate(selectedDate)] || []).map(
              (booking, index) => (
                <a href="" key={index}>
                  <li
                    
                    className="mb-2 bg-gradient-to-r from-custom-purple-deeper to-custom-purple px-4 py-2 rounded-md shadow"
                  >
                    <strong>{booking.time}</strong> - {booking.customer} (
                    {booking.service})
                  </li>
                </a>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
