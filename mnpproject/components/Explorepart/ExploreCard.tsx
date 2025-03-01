import React from "react";

const ExploreCard = ({
  card_size,
  id,
  bg_image,
  location,
  name,
}: {
  id: string;
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
          <a href={`/livehouse-detail/${id}`} className="block">
            <button className="bg-gradient-to-r from-custom-purple-deeper to-custom-purple text-white text-xs font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-purple mt-3 ">
              รายละเอียด
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default ExploreCard;
