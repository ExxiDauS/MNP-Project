import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send, X } from 'lucide-react';
import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  // Simple emoji list
  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "😎", "🤔", "😢", "😍"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="w-full mt-4">
      {showEmojiPicker && (
        <div className="flex flex-wrap gap-2 p-2 bg-gray-700 rounded-lg mb-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => addEmoji(emoji)}
              className="text-xl hover:bg-gray-600 p-1 rounded"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => setShowEmojiPicker(false)}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2"
      >
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-700"
        >
          😊
        </button>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="พิมพ์บทสนทนาที่นี่..."
          className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
        />
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}

export default ChatInput