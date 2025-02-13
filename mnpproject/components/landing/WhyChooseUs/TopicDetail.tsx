"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TopicDetailProps {
    topic: string;
    description: string;
    isOpen: boolean;
    index: number;
    onToggle: (index: number) => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({
    topic,
    description,
    isOpen,
    index,
    onToggle
}) => {

    return (
        <div className="border-b border-gray-100 last:border-0">
            <div
                onClick={() => onToggle(index)}
                className="cursor-pointer py-4"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        {topic}
                    </h2>
                    <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 text-white ${isOpen ? 'rotate-180' : ''
                            }`}
                    />
                </div>
            </div>

            <div
                className={`
          grid transition-all duration-200 ease-in-out
          ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-400 pb-4">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default TopicDetail