import React from 'react';

interface ImageGalleryProps {
  image1: string | null,
  image2: string | null,
  image3: string | null,
  image4: string | null,
  image5: string | null
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ image1, image2, image3, image4, image5 }) => {
  return (
    <div className="w-full grid grid-cols-12 gap-2 mt-4 px-6">
      {/* Main large image */}
      <div className="col-span-6 relative bg-gray-200 rounded-lg aspect-[4/3] h-full">
        <img
          src={image1 || undefined}
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
            src={image2 || undefined}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <img
            src={image3 || undefined}
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
            src={image4 || undefined}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="relative bg-gray-200 rounded-lg aspect-[4/3]">
          <img
            src={image5 || undefined}
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