import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoBackground = () => {
  return (
    <section className="relative">
        {/* Video Background */}
          <div className="inset-0 h-[34rem]">
            <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="tdr-gasoline.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent"></div>
        </div>
    </section>
  )
}

export default VideoBackground