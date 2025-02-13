import React from 'react'
import LivehouseCard from './LivehouseCard';

interface Livehouse {
    name: string,
    location: string,
    image: string
}

interface Livehouses extends Array<Livehouse> {}

const CardsRow = ({
    topic, 
    data, 
    cardSize 
    }: { 
    topic: string, 
    data: Livehouses, 
    cardSize: number 
    }) => {
    return (
        <section>
            <div className="ml-12 my-3">
                <h3 className="text-white font-bold text-xl">{topic}</h3>
            </div>


            <div className="relative pb-4">
                <div
                    className="flex overflow-x-auto overflow-y-hidden 
                    scrollbar scrollbar-track-[#333333] scrollbar-thumb-[#c0c0c0]
                  hover:scrollbar-thumb-gray-500 pb-4 px-8"
                    style={{
                        scrollbarWidth: 'thin',
                    }}
                >
                    {data.map((livehouse) => (
                        <div key={livehouse.name} className="flex-none">
                            <LivehouseCard
                                card_size={cardSize} //px
                                bg_image={livehouse.image}
                                location={livehouse.location}
                                name={livehouse.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CardsRow