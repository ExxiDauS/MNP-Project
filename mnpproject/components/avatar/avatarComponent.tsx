import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarComponentProps {
  profileImage: string | null;
  username: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({ profileImage, username }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className="w-8 h-8 rounded-full border-2 border-purple-500/50 shadow-md">
      {profileImage && profileImage.length > 0 ? (
        <AvatarImage
          src={`data:image/jpeg;base64,${Buffer.from(profileImage).toString("base64")}`}
          alt={username}
          className="rounded-full"
        />
      ) : (
        <AvatarFallback className="bg-gradient-to-br from-purple-800 to-purple-600 text-sm">
          {getInitials(username)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarComponent;
