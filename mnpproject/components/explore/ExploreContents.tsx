import React from 'react';
import LocationButton from './LocationButton';
import ContentCard from './ContentCard';
import livehousesData from '@/public/data/livehouses.json';

const ExploreContents = () => {
    const livehouses = livehousesData.livehouses;
    const livehousesRev = livehouses.slice().reverse();
    return (
        <>
            {/* 4 buttons on top */}
            <section className="flex relative h-24 justify-self-center justify-center w-full bg-gradient-to-b from-[black] to-[#1a1a1a]">
                <div className="flex justify-center items-center space-x-[-2rem] mt-6">
                    {/* Bangkok Button */}
                    <div className="z-10">
                        <LocationButton
                            location="กรุงเทพฯ"
                            abbreviation="BKK"
                            logo="./logo/bangkok.png"
                            logo_w={96}
                            logo_h={68}
                            bgcolor="#025937"
                        />
                    </div>

                    {/* Chiang Mai Button */}
                    <div className="z-20">
                        <LocationButton
                            location="เชียงใหม่"
                            abbreviation="CNX"
                            logo="./logo/chiang-mai.png"
                            logo_w={126}
                            logo_h={120}
                            bgcolor="#062a78"
                        />
                    </div>

                    {/* Khon Kaen Button */}
                    <div className="z-30">
                        <LocationButton
                            location="ขอนแก่น"
                            abbreviation="KKC"
                            logo="./logo/khon-kaen.png"
                            logo_w={126}
                            logo_h={80}
                            bgcolor="#dc143c"
                        />
                    </div>

                    {/* Phuket Button */}
                    <div className="z-40">
                        <LocationButton
                            location="ภูเก็ต"
                            abbreviation="HKT"
                            logo="./logo/phuket.png"
                            logo_w={56}
                            logo_h={56}
                            bgcolor="#add8e6"
                        />
                    </div>
                </div>
            </section>

            {/* Popular Livehouse showcase */}
            <section>
                <div className="ml-12 my-3">
                    <h3 className="text-white font-bold text-xl">Livehouse ยอดนิยม</h3>
                </div>


                <div className="relative pb-4">
                    <div
                        className="flex overflow-x-auto overflow-y-hidden 
                    scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600
                    scrollbar-h-1.5 hover:scrollbar-thumb-gray-500
                    pb-4 px-8"
                    >
                        {livehouses.map((livehouse) => (
                            <div key={livehouse.name} className="flex-none">
                                <ContentCard
                                    card_size={320} //px
                                    bg_image={livehouse.image}
                                    location={livehouse.location}
                                    name={livehouse.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Match Livehouse showcase */}
            <section>
                <div className="ml-12 my-3">
                    <h3 className="text-white font-bold text-xl">Livehouse ที่คุณอาจสนใจ</h3>
                </div>


                <div className="relative pb-4">
                    <div
                        className="flex overflow-x-auto overflow-y-hidden 
                    scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600
                    scrollbar-h-1.5 hover:scrollbar-thumb-gray-500
                    pb-4 px-8"
                    >
                        {livehousesRev.map((livehouse) => (
                            <div key={livehouse.name} className="flex-none">
                                <ContentCard
                                    card_size={320} //px
                                    bg_image={livehouse.image}
                                    location={livehouse.location}
                                    name={livehouse.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ExploreContents;