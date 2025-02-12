import React from 'react';
import LocationButton from './LocationButton';
import ContentCard from './ContentCard';
import livehousesData from '@/public/data/livehouses.json';

const ExploreContents = () => {
    const livehouses = livehousesData.livehouses;
    return (
        <>
            <section>
                <div className="grid grid-cols-4 mt-6 justify-items-center justify-self-center w-full">
                    <LocationButton location="กรุงเทพฯ" abbreviation="BKK" logo="./logo/bangkok.png" logo_w={96} logo_h={68} bgcolor="#025937" />
                    <LocationButton location="เชียงใหม่" abbreviation="CNX" logo="./logo/chiang-mai.png" logo_w={126} logo_h={120} bgcolor="#062a78" />
                    <LocationButton location="ขอนแก่น" abbreviation="KKC" logo="./logo/khon-kaen.png" logo_w={126} logo_h={80} bgcolor="#dc143c" />
                    <LocationButton location="ภูเก็ต" abbreviation="HKT" logo="./logo/phuket.png" logo_w={56} logo_h={56} bgcolor="#add8e6" />
                </div>
            </section>
            <div className="ml-12 mt-5">
                <h3 className="text-white font-bold text-xl">Best Livehouse</h3>
            </div>
            <div className="relative px-8 pb-4">
                <div 
                    className="flex gap-4 overflow-x-auto overflow-y-hidden 
                    scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600
                    scrollbar-h-1.5 hover:scrollbar-thumb-gray-500
                    pb-4"
                >
                    {livehouses.map((livehouse) => (
                        <div key={livehouse.name} className="flex-none">
                            <ContentCard 
                                bg_image={livehouse.image}
                                location={livehouse.location}
                                name={livehouse.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ExploreContents;