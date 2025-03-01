import React from "react";

const Calendar = () => {
  return (
    <div className="flex justify-center items-center my-6">
      <div className="relative p-4 rounded-3xl shadow-lg border border-gray-300 bg-white">
      <div className="-z-10 absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-3xl rounded-3xl"></div>

        <iframe
          src="https://calendar.google.com/calendar/embed?src=07c40aaf3fd7e1d130c872d6110c19fc05a245c00bcea44b45e6b41787bcfb57%40group.calendar.google.com&ctz=Asia%2FBangkok"
          className=" h-[600px] sm:w-[300px] md:w-[600px] rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
};

export default Calendar;
