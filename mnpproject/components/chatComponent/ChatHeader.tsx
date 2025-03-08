import React from 'react'

const ChatHeader = () => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Chat Room</h2>
                    <p className="text-xs text-gray-400">Active now</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader