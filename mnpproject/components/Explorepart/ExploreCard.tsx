import React from "react";

const ExploreCard = ({
  card_size,
  bg_image,
  location,
  name,
}: {
  card_size: number;
  bg_image: string;
  location: string;
  name: string;
}) => {
  return (
    <>
      {/* <div className="absolute -inset-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div> */}
      <div className="flex flex-col items-center p-4 border border-[#1b181a] rounded-lg shadow-lg bg bg-[#1b181a]">
        <img
          src={bg_image}
          alt="Event"
          className="w-full h-40 object-cover rounded-lg "
        />
        {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 */}
        <div className="flex justify-between items-center w-full mt-2 ">
          <div className="">
            <h3 className="text-secondary text-lg font-bold mt-2">{name}</h3>
            <p className="text-custom-purple-light text-sm mt-1">{location}</p>
          </div>
          <button className="bg-gradient-to-r from-custom-purple-deeper to-custom-purple text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform mt-3">
            จอง
          </button>
        </div>
      </div>
    </>
  );
};

export default ExploreCard;
