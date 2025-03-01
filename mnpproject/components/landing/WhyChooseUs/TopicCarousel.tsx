"use client"

import React, { useState } from 'react'
import TopicDetail from './TopicDetail';

interface WhyTopic {
    topic: string;
    description: string;
}

const TopicCarousel = () => {

    const topics: WhyTopic[] = [
        {
            topic: "Access to Premier Venues",
            description: "Browse through hundreds of verified livehouses across the country. From intimate cafes to mid-sized music venues, find the perfect stage for your performance."
        },
        {
            topic: "Simple Booking Process",
            description: "No more back-and-forth communications. Book your preferred venue instantly with our streamlined 5-step booking system. Save time and focus on your performance."
        },
        {
            topic: "Clear & Upfront Pricing",
            description: "See all costs upfront with no hidden fees. Compare venue prices easily and find options that fit your budget. No surprises, just transparent pricing."
        },
        {
            topic: "Quality Guaranteed",
            description: "Every livehouse on our platform is verified and reviewed. Check detailed information about stage setup, equipment, capacity, and real performer reviews."
        },
        {
            topic: "Safe & Secure",
            description: "Book with confidence using our secure payment system. Your payment is protected until your performance is completed. We ensure your booking is protected."
        },
        {
            topic: "24/7 Support",
            description: "Our dedicated support team is always ready to help. Get assistance with bookings, venue questions, or technical issues anytime. We're here for you."
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="h-full py-6 pt-10 px-4 md:px-8">
            {topics.map((item, index) => (
                <TopicDetail
                    key={index}
                    topic={item.topic}
                    description={item.description}
                    isOpen={activeIndex === index}
                    index={index}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    )
}

export default TopicCarousel;