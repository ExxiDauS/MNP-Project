"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/contexts/UserContext";
import BackButton from "@/components/buttons/BackButton";
import ChatHeader from "@/components/chatComponent/ChatHeader";
import Message from "@/components/chatComponent/Message";
import ChatInput from "@/components/chatComponent/ChatInput";


interface MessageType {
  content: string;
  own: boolean;
  username?: string;
}

interface UserContextType {
  user?: {
    name?: string;
  };
}


// Main Page component
export default function Page() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typing, setTyping] = useState<string | null>(null);

  // Move the useUser hook call to the top level of your component
  const userContext = useUser() as UserContextType;
  const user = userContext.user;
  const username = user?.name || "Guest";

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socketInstance: Socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5001"
    );

    socketInstance.on("connect", () => {
      console.log("Connected to server");
      socketInstance.emit("client_ready", {
        message: "hello from client",
        userName: username,
      });
    });

    socketInstance.on("connect_error", (error: Error) => {
      console.error("Connection error:", error);
    });

    socketInstance.on("message", (data: { msg: string; user: string }) => {
      setMessages((prev) => [
        ...prev,
        { content: data.msg, own: false, username: data.user },
      ]);
    });

    // Add online users functionality
    socketInstance.on("online_users", (users: string[]) => {
      setOnlineUsers(users);
    });

    // Add typing indicator
    socketInstance.on("typing", (user: string) => {
      setTyping(user);
    });

    socketInstance.on("stop_typing", () => {
      setTyping(null);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [username]);

  const sendMessage = (content: string): void => {
    const newMessage: MessageType = { content, own: true };
    setMessages((prev) => [...prev, newMessage]);

    if (socket) {
      socket.emit("message", {
        msg: content,
        user: username,
      });
      // Stop typing indicator when sending a message
      socket.emit("stop_typing");
    }
  };

  return (
    <section className="relative flex justify-center w-full mt-20 md:mt-16 lg:mt-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
      {/* Larger aura effect background */}
      <div className="absolute inset-0 p-4 sm:p-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

      {/* Content container */}
      <div className="relative flex flex-col w-full gap-2 bg-gray-800 border border-purple-400 border-opacity-50 outline outline-purple-500/20 outline-offset-2 rounded-3xl shadow-lg h-[75vh]">
        {/* Chat header */}
        <div className="ml-5 mt-5">
          <BackButton href="/" />
        </div>
        <ChatHeader />

        {/* Online users display */}
        <div className="flex px-4 py-2 overflow-x-auto space-x-2 border-b border-gray-700">
          {onlineUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-gray-700 px-2 py-1 rounded-full"
            >
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-white whitespace-nowrap">
                {user}
              </span>
            </div>
          ))}
        </div>

        {/* Messages container with scrolling */}
        <div className="flex-grow overflow-y-auto h-full p-4 space-y-2">
          {messages.map((msg, index) => (
            <Message
              key={index}
              content={msg.content}
              own={msg.own}
              username={msg.username}
            />
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>{typing} is typing</span>
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
              </div>
            </div>
          )}

          {/* Empty div for scrolling reference */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-700">
          <ChatInput onSendMessage={sendMessage} />
        </div>
      </div>
    </section>
  );
}
