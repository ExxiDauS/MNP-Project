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
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 px-2 md:px-4 pt-2">
      {/* Main large image */}
      <div className="md:col-span-6 relative bg-gray-800 rounded-lg overflow-hidden aspect-[4/3]">
        {image1 ? (
          <img
            src={image1}
            alt="Main venue image"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      {/* Right side grid */}
      <div className="hidden md:grid md:col-span-6 grid-cols-2 gap-2 md:gap-3">
        {/* Top row */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-[4/3]">
          {image2 ? (
            <img
              src={image2}
              alt="Venue image 2"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
        <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-[4/3]">
          {image3 ? (
            <img
              src={image3}
              alt="Venue image 3"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-[4/3]">
          {image4 ? (
            <img
              src={image4}
              alt="Venue image 4"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
        <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-[4/3]">
          {image5 ? (
            <img
              src={image5}
              alt="Venue image 5"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile view thumbnails (only shown on small screens) */}
      <div className="grid grid-cols-4 gap-2 md:hidden mt-2">
        {[image2, image3, image4, image5].map((img, index) => (
          <div key={index} className="relative bg-gray-800 rounded-lg overflow-hidden aspect-square">
            {img ? (
              <img
                src={img}
                alt={`Thumbnail ${index + 2}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;