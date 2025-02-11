import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoBackground = () => {
  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          className="w-full h-3/6 object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="Kod-Thae.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>
    </div>
  )
}

export default VideoBackground