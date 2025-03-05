import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

const ChatInput = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="พิมพ์บทสนทนาที่นี่..." className='text-white'/>
      <Button type="submit"><Send/></Button>
    </div>
  );
}

export default ChatInput