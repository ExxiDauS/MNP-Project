import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, User } from 'lucide-react';

interface AvatarUploadProps {
  label?: string;
  errorMessage?: string;
  helpText?: string;
  onChange?: (file: File | null) => void;
  className?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  label = "Profile Picture",
  errorMessage,
  helpText = "Upload profile picture (JPG, JPEG, PNG files only, max 5MB)",
  onChange,
  className = "",
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        if (onChange) onChange(null);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        if (onChange) onChange(null);
        return;
      }

      // Set the file
      if (onChange) onChange(file);

      // Create and set image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove profile image
  const removeImage = () => {
    if (onChange) onChange(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 flex flex-col items-center ${className}`}>
      {label && <Label htmlFor="profileImage" className="text-white">{label}</Label>}

      <div className="relative">
        <Avatar
          className={`w-24 h-24 cursor-pointer border-2 ${errorMessage ? 'border-red-500' : 'border-zinc-600'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <AvatarImage src={imagePreview || ''} alt="Profile Preview" />
          <AvatarFallback className="bg-zinc-700">
            <User className="w-10 h-10 text-zinc-400" />
          </AvatarFallback>
        </Avatar>

        {imagePreview && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {!imagePreview && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-zinc-800 border-zinc-700"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        id="profileImage"
        name="profileImage"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageUpload}
        className="hidden"
      />

      {errorMessage && (
        <p className="text-sm text-red-500 text-center">{errorMessage}</p>
      )}

      {helpText && (
        <p className="text-xs text-zinc-400 text-center max-w-sm">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default AvatarUpload;