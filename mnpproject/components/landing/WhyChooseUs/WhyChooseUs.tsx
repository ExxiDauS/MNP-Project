import React from 'react';
import TopicCarousel from './TopicCarousel';

const WhyChooseUs = () => {
  return (
    <section className="grid grid-cols-2 bg-gradient-horizontal m-8 rounded-3xl py-4 border-custom-purple-light border-2">
      <div className="flex flex-col justify-center items-center w-full gap-3 h-full">
        <h1 className="text-custom-text-primary text-6xl font-bold">Why choose us?</h1>
        <p className="text-custom-text-secondary text-lg">We are Great, Simple and Secure Booking Livehouse</p>
      </div>
      <div className="overflow-y-auto h-[480px]">
        <TopicCarousel />
      </div>
    </section>
  );
};

export default WhyChooseUs;