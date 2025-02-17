import React from 'react';
import LogoRevealButton from './LogoRevealButton';
import livehousesData from '@/public/data/livehouses.json';
import CardsRow from './CardsRow';

const PopularLivehouses = () => {
    const livehouses = livehousesData.livehouses;
    return (
        <>
            {/* 4 buttons on top */}
            <section className="flex relative h-24 justify-self-center justify-center w-full bg-gradient-to-b from-black to-custom-background-primary">
                <div className="flex justify-center items-center space-x-[-2rem] mt-6">
                    {/* Bangkok Button */}
                    <div className="z-10">
                        <LogoRevealButton
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
                        <LogoRevealButton
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
                        <LogoRevealButton
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
                        <LogoRevealButton
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
            <section className="py-4 mt-6">
                <CardsRow topic="Livehouse ยอดนิยม" data={livehouses} cardSize={320}/>
            </section>
        </>
    );
}

export default PopularLivehouses;