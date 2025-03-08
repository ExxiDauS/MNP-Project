import React from 'react'

interface MessageProps {
    content: string;
    own: boolean;
    username?: string;
}

const Message: React.FC<MessageProps> = ({ content, own, username }) => {
    return (
        <div
            className={`flex ${own ? "justify-end" : "justify-start"} mb-4 w-full`}
        >
            <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${own
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-gray-700 text-white rounded-tl-none"
                    }`}
            >
                {!own && username && (
                    <p className="text-xs text-gray-300 font-semibold mb-1">{username}</p>
                )}
                <p className="text-sm md:text-base">{content}</p>
            </div>
        </div>
    )
}

export default Message