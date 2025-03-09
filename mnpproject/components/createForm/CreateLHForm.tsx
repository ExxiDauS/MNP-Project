"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LiveHouseImgUpload from "@/components/forms/LiveHouseImgUpload"; // Import your custom AvatarUpload component
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation"; // Import useRouter

const CreateLHForm = () => {
  const router = useRouter(); // Initialize the router

  const { user } = useUser();
  const [formData, setFormData] = useState<{
    user_id: string;
    name: string;
    location: string;
    province: string;
    description: string;
    price_per_hour: string;
    images: (File | null)[]; // This ensures that images can hold File objects or null
  }>({
    user_id: "",
    name: "",
    location: "",
    province: "",
    description: "",
    price_per_hour: "",
    images: [],
  });

  // Ensure the user_id is set when the user data is available
  useEffect(() => {
    if (user?.user_id && !formData.user_id) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: user.user_id, // Set the user_id only if it's not already set
      }));
    }
  }, [user, formData.user_id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload change
  const handleImageChange = (file: File | null, index: number) => {
    const updatedImages = [...formData.images];
    if (file) {
      updatedImages[index] = file;
    } else {
      updatedImages[index] = null;
    }
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  // Handle form submit
  // Handle form submit and POST to /api/livehouse/create-livehouse
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form Data: ", JSON.stringify(formData));
    console.log("Form Data: ", formData)

    // Code ข้างล่างคาดว่ารันได้ แต่ยังไม่ได้ทำส่วนของรูปเพราะไม่มี api
    // Prepare form data to send in the request (without images)
    const dataToSend = {
      user_id: user?.user_id,
      name: formData.name,
      location: formData.location,
      province: formData.province,
      description: formData.description,
      price_per_hour: Number(formData.price_per_hour),
    };

    console.log("Data being sent:", dataToSend);

    try {
      const response = await fetch(
        "http://localhost:5000/api/livehouse/create-livehouse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Sending as JSON
          },
          body: JSON.stringify(dataToSend), // Send form data as JSON
        }
      );

      const responseData = await response.json(); // Try getting server response
      console.log("Server response:", responseData);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle success (you can redirect, show a success message, etc.)
      console.log("Form submitted successfully");
      router.push("/manager-landing");
    } catch (error) {
      // Handle error
      console.error("Error during form submission", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <Label htmlFor="images" className="text-white">
            อัปโหลดรูปภาพ (สูงสุด 5 รูป)
          </Label>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Image upload slots */}
            {Array(5)
              .fill("")
              .map((_, index) => (
                <div key={index} className="space-y-2">
                  <LiveHouseImgUpload
                    label={`รูปภาพ ${index + 1}`}
                    helpText="อัปโหลดรูป JPG, JPEG, PNG (สูงสุด 5MB)"
                    onChange={(file) => handleImageChange(file, index)} // Capture the file for each image slot
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Livehouse Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              ชื่อ Livehouse
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ชื่อของ Livehouse"
              className="w-full text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-white">
              ที่ตั้ง
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="ที่ตั้งของ Livehouse"
              className="w-full text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province" className="text-white">
              จังหวัด
            </Label>
            <Input
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="จังหวัดของสถานที่ Livehouse"
              className="w-full text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_per_hour" className="text-white">
              ราคาต่อชั่วโมง
            </Label>
            <Input
              id="price_per_hour"
              name="price_per_hour"
              type="number"
              value={formData.price_per_hour}
              onChange={handleChange}
              placeholder="ราคาของการจอง (ต่อ 1 ชั่วโมง)"
              className="w-full text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">
            รายละเอียด
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="รายละเอียดของ Livehouse"
            className="w-full text-white"
            rows={4} // ปรับขนาดให้เหมาะสม
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="submit"
            className="bg-custom-purple text-custom-text-primary hover:bg-custom-purple-light hover:text-black"
          >
            บันทึกข้อมูล
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateLHForm;
