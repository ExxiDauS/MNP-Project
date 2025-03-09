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
  const [showModal, setShowModal] = useState(false);
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

  const [facList, setFacility] = useState<{
    livehouse_id: string;
    mic: string;
    guitar: string;
    bass: string;
    drum: string;
    keyboard: string;
    pa_monitor: string;
    mic_price: number;
    guitar_price: number;
    bass_price: number;
    drum_price: number;
    keyboard_price: number;
    pa_monitor_price: number;
  }>({
    livehouse_id: "",
    mic: "",
    guitar: "",
    bass: "",
    drum: "",
    keyboard: "",
    pa_monitor: "",
    mic_price: 0,
    guitar_price: 0,
    bass_price: 0,
    drum_price: 0,
    keyboard_price: 0,
    pa_monitor_price: 0,
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

  // Handle price input changes for facilities
  const handleFacilityPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    facility: string
  ) => {
    const { value } = e.target;
    setFacility((prev) => ({
      ...prev,
      [`${facility}_price`]: parseFloat(value) || 0, // Store price as number
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

  const handleFacilityModelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    facility: string
  ) => {
    const { value } = e.target;
    setFacility((prev) => ({
      ...prev,
      [facility]: value, // เก็บค่าชื่อรุ่นของอุปกรณ์
    }));
  };

  const formDataToJson = (formData: FormData) => {
    const jsonObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      // If the value is a File, keep it as is; otherwise, convert it to a string
      jsonObject[key] = value instanceof File ? value : value.toString();
    });
    return jsonObject;
  };

  // Handle form submit
  // Handle form submit and POST to /api/livehouse/create-livehouse
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form Data: ", JSON.stringify(formData));
    // Code ข้างล่างคาดว่ารันได้ แต่ยังไม่ได้ทำส่วนของรูปเพราะไม่มี api
    // Prepare form data to send in the request (without images)
    const dataToSend = new FormData();
    dataToSend.append("user_id", user?.user_id || "");
    dataToSend.append("name", formData.name);
    dataToSend.append("location", formData.location);
    dataToSend.append("province", formData.province);
    dataToSend.append("description", formData.description);
    dataToSend.append("price_per_hour", formData.price_per_hour);
    // Append images if they exist
    formData.images.forEach((file, index) => {
      if (file) {
        dataToSend.append(`sample_image0${index + 1}`, file);
      }
    });

    const facDataToSend = new FormData();

    facDataToSend.append("mic", facList.mic.toString());
    facDataToSend.append("guitar", facList.guitar.toString());
    facDataToSend.append("bass", facList.bass.toString());
    facDataToSend.append("drum", facList.drum.toString());
    facDataToSend.append("keyboard", facList.keyboard.toString());
    facDataToSend.append("pa_monitor", facList.pa_monitor.toString());
    facDataToSend.append("mic_price", facList.mic_price.toString());
    facDataToSend.append("guitar_price", facList.guitar_price.toString());
    facDataToSend.append("bass_price", facList.bass_price.toString());
    facDataToSend.append("drum_price", facList.drum_price.toString());
    facDataToSend.append("keyboard_price", facList.keyboard_price.toString());
    facDataToSend.append(
      "pa_monitor_price",
      facList.pa_monitor_price.toString()
    );

    try {
      const response = await fetch(
        "http://localhost:5000/api/livehouse/create-livehouse",
        {
          method: "POST",
          body: dataToSend, // No JSON.stringify() needed
        }
      );

      const responseData = await response.json(); // Try getting server response
      facDataToSend.append("livehouse_id", responseData.livehouse.livehouse_id);

      // console.log("Server response:", responseData.livehouse.livehouse_id);

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const jsonData = formDataToJson(facDataToSend);

      const jsonString = JSON.stringify(
        Object.fromEntries(
          Object.entries(jsonData).filter(
            ([_, value]) => !(value instanceof File)
          )
        )
      );

      const responseFac = await fetch(
        "http://localhost:5000/api/facilities/create-facility", // Correct endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        }
      );

      if (!responseFac.ok) {
        throw new Error(`Failed to submit facilities`);
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
            อัปโหลดรูปภาพ
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

        <div className="space-y-4">
          <Label className="text-white">สิ่งอำนวยความสะดวก</Label>
          <div className="space-y-2">
            {[
              { label: "ไมโครโฟน", name: "mic" },
              { label: "กีต้าร์", name: "guitar" },
              { label: "เบส", name: "bass" },
              { label: "กลอง", name: "drum" },
              { label: "คีย์บอร์ด", name: "keyboard" },
              { label: "PA Monitor", name: "pa_monitor" },
            ].map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-3 gap-4 items-center"
              >
                {/* Checkbox */}
                <div className="flex items-center space-x-2">
                  
                  <Label htmlFor={item.name} className="text-white">
                    {item.label}
                  </Label>
                </div>

                {/* Model Name Input */}
                <Input
                  type="text"
                  id={`${item.name}_model`}
                  name={`${item.name}_model`}

                  onChange={(e) => handleFacilityModelChange(e, item.name)}
                  placeholder={`ชื่อรุ่นของ ${item.label}`}
                  className="w-full text-white"
                />

                {/* Price Input */}
                <Input
                  type="number"
                  id={`${item.name}_price`}
                  name={`${item.name}_price`}

                  onChange={(e) => handleFacilityPriceChange(e, item.name)}
                  placeholder={`ราคาของ ${item.label} ต่อ1ชั่วโมง`}
                  className="w-full text-white"
                />
              </div>
            ))}
          </div>
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
