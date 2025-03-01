import React from 'react'
import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import BackButton from '../buttons/BackButton';

interface DetailHeaderProps {
    name: string
    address: string
    price: string
    id: string
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ name, address, price, id }) => {

    return (
        <div className="px-6 pt-6">
            {/* Back button */}
            <BackButton className="mb-4" href="/main-landing" />

            <div className="flex justify-between items-start w-full">
                {/* Left section */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-custom-text-primary">
                        {name}
                    </h1>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-white" />
                        <span className="text-custom-text-secondary">{address}</span>
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4 pt-3">
                    <span className="text-2xl font-bold text-custom-text-primary">
                        ฿{price} / Hour
                    </span>
                    <a href={`${id}/booking`}>
                        <Button className="bg-custom-purple-dark hover:bg-custom-purple text-white px-6">
                            Booking Stage
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default DetailHeader