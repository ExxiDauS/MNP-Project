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
        <img
          src={`../livehouse/${images[0]}`}
          alt=""
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Right side grid */}
      <div className="col-span-6 grid grid-cols-2 gap-2">
        {/* Top row */}
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <img
            src={`../livehouse/${images[1]}`}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <img
            src={`../livehouse/${images[2]}`}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Bottom row */}
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <img
            src={`../livehouse/${images[3]}`}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <img
            src={`../livehouse/${images[4]}`}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;