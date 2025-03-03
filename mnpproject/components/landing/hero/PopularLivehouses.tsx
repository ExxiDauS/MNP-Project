import React from 'react';
import CardsCarousel from '../../cards/CardsCarousel';

const PopularLivehouses = async () => {
    const data = await fetch('http://localhost:5000/api/livehouse/get-livehouse')
    const res = await data.json()
    const livehouses = res.livehouses
    return (
        <>
            {/* Topic */}
            <div className="my-6 flex justify-center">
                <h3 className="text-custom-text-primary font-bold text-3xl">Livehouses ยอดนิยม</h3>
            </div>

            {/* Popular Livehouse showcase */}
            <section className="pb-4 mt-6">
                <CardsCarousel data={livehouses} cardSize={220}/>
            </section>
        </>
    );
}

export default PopularLivehouses;