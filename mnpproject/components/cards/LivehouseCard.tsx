'use client';

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from '@/contexts/UserContext';

interface LivehouseCardProps {
  id: string,
  card_size?: number,
  bg_image: string,
  location: string,
  name: string
}

const LivehouseCard: React.FC<LivehouseCardProps> = ({ id, bg_image, location, name }) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = (e: React.MouseEvent) => {
    // Prevent default link behavior
    e.preventDefault();
    
    // Check authentication
    if (!user) {
      router.push('/sign-in');
      return;
    }
    
    // If authenticated, allow navigation to proceed
    router.push(`/livehouse-detail/${id}`);
  };

  return (
    <Link href={`/livehouse-detail/${id}`} onClick={handleClick} className="block">
      <div className="p-2">
        <Card
          className="bg-black overflow-hidden relative group transform transition-all duration-300 hover:scale-105 
                     max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full border-black">
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-100" />

          <CardContent className="p-0 relative">
            {/* Responsive Image Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-square">
              <img
                src={bg_image}
                alt="Livehouse"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Location Overlay */}
            <div className="absolute flex top-0 left-0 right-0 p-3 z-20">
              <div className="flex items-center justify-center size-8">
                <MapPin className="text-white size-5" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">{location}</h3>
            </div>

            {/* Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">{name}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default LivehouseCard;