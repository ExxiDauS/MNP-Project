import React from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { MapPin } from "lucide-react";

const LivehouseCard = ({
  card_size,
  bg_image, 
  location, 
  name 
  }: {
  card_size: number,
  bg_image: string, 
  location: string, 
  name: string 
  }) => {
  return (
    <div className="p-2"> {/* Padding container to prevent scale overflow */}
      <Card className="bg-black overflow-hidden relative group transform transition-all duration-300 hover:scale-105"
      style={{
        width: `${card_size}px`
      }}>
        {/* Gradient that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-100" />

        <CardContent className="p-0 relative">
          {/* Image container */}
          <div className="relative aspect-square h-full">
            <img
              src={bg_image}
              alt="Livehouse"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text overlay Above */}

          <div className="absolute flex top-0 left-0 right-0 p-3 z-20">
            <div className="flex items-center justify-center size-8">
              <MapPin className="text-white size-5"/>
            </div>
            <h3 className="text-xl font-bold text-white pt-0.5">{location}</h3>
          </div>

          {/* Text overlay Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white">{name}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LivehouseCard