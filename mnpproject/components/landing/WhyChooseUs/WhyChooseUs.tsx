import React from 'react';
import TopicCarousel from './TopicCarousel';

const WhyChooseUs = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 my-16 py-24 px-4 md:px-16 bg-gradient-to-b from-custom-background-primary via-custom-purple-dark/60 to-custom-background-primary">
            <div className="flex flex-col w-full gap-3 h-full items-start justify-center md:pl-20">
                <h1 className="text-custom-text-primary text-3xl md:text-5xl font-bold whitespace-pre-line leading-snug">{"One Platform,\nEndless Possibilities"}</h1>
                <p className="text-gray-300 text-sm md:text-base">Find the Right Venue for Your Sound</p>
            </div>
            <div className="overflow-y-auto h-[320px] md:h-[480px]">
                <TopicCarousel />
            </div>
        </section>
    );
};

export default WhyChooseUs;