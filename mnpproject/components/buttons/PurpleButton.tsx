import React from 'react'
import { Button } from '../ui/button'

const PurpleButton = ({ label }: { label: string}) => {
    return (
        <Button className="bg-custom-purple-dark hover:bg-custom-purple text-white px-6">
            {label}
        </Button>
    )
}

export default PurpleButton