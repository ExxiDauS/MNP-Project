import React from 'react';
import { Image } from 'lucide-react';
interface ImageGalleryProps {
  images: string[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="w-full grid grid-cols-12 gap-2 mt-4 px-6">
      {/* Main large image */}
      <div className="col-span-6 relative bg-gray-200 rounded-lg aspect-[4/3] h-full">
        <Image className="w-12 h-12 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Right side grid */}
      <div className="col-span-6 grid grid-cols-2 gap-2">
        {/* Top row */}
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <Image className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <Image className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Bottom row */}
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <Image className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <Image className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;