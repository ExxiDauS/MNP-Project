import React from 'react'
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DetailHeaderProps {
    name: string
    address: string
    price: number
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ name, address, price }) => {
  return (
    <div className="flex justify-between items-start w-full h-1/5 px-6 pt-6">
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
                                <Button className="bg-custom-purple-dark hover:bg-custom-purple text-white px-6">
                                    Book Stage
                                </Button>
                            </div>
                        </div>
  )
}

export default DetailHeader