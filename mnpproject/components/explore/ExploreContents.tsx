import React from 'react';
import LocationButton from './LocationButton';

const ExploreContents = () => {
    return (
        <section>
            <div className="grid grid-cols-4 mt-6 justify-items-center justify-self-center w-3/4">
                <LocationButton></LocationButton>
                <LocationButton></LocationButton>
                <LocationButton></LocationButton>
                <LocationButton></LocationButton>
            </div>
        </section>
    )
}

export default ExploreContents