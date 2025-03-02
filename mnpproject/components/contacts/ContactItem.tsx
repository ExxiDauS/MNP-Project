import React from 'react'

interface ContactItemProps {
    icon: React.ElementType;
    label: string;
    value: string;
    url: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, label, value, url }) => {
    const handleClick = () => {
        if (url !== '-') {
            window.open(url, '_blank');
        }
    }

    return (
        <div 
        onClick={handleClick}
        className="flex items-center p-3 hover:bg-gray-300/20 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-custom-purple-dark mr-4 flex-shrink-0">
                <Icon className="w-5 h-5 text-custom-text-primary" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-xs md:text-sm text-custom-text-secondary">{label}</span>
                <span className="text-sm md:text-base text-custom-text-primary truncate">{value}</span>
            </div>
        </div>
    )
}

export default ContactItem