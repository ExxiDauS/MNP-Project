import React from 'react';
import TopicCarousel from './TopicCarousel';

const WhyChooseUs = () => {
  return (
    <section className="grid grid-cols-2 bg-gradient-to-t from-black/50 via-black/10 to-[#1a1a1a]">
      <div className="flex flex-col justify-center items-center w-full gap-3 border-r-2 border-white h-[450px]">
        <h1 className="text-white text-6xl font-bold">Why choose us?</h1>
        <p className="text-gray-400 text-lg">We are Great, Simple and Secure Booking Livehouse</p>
      </div>
      <div className="overflow-y-auto h-[500px]">
        <TopicCarousel />
      </div>
    </section>
  );
};

export default WhyChooseUs;