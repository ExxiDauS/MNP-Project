"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LiveHouseImgUpload from "@/components/forms/LiveHouseImgUpload";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreateLHForm = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState<{
    user_id: string;
    name: string;
    location: string;
    province: string;
    description: string;
    price_per_hour: string;
    images: (File | null)[];
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

  // Validation state
  const [errors, setErrors] = useState<{
    name?: string;
    location?: string;
    province?: string;
    price_per_hour?: string;
    mic?: string;
    guitar?: string;
    bass?: string;
    drum?: string;
    keyboard?: string;
    pa_monitor?: string;
    general?: string;
  }>({});

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure the user_id is set when the user data is available
  useEffect(() => {
    if (user?.user_id && !formData.user_id) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: user.user_id,
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
    
    // Clear validation error when field is being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle price input changes for facilities
  const handleFacilityPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    facility: string
  ) => {
    const { value } = e.target;
    setFacility((prev) => ({
      ...prev,
      [`${facility}_price`]: parseFloat(value) || 0,
    }));
    
    // Clear validation error when field is being edited
    if (errors[facility as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [facility]: undefined
      }));
    }
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
      [facility]: value,
    }));
    
    // Clear validation error when field is being edited
    if (errors[facility as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [facility]: undefined
      }));
    }
  };

  const formDataToJson = (formData: FormData) => {
    const jsonObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value instanceof File ? value : value.toString();
    });
    return jsonObject;
  };

  // Validate form
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ Livehouse";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "กรุณากรอกที่ตั้ง";
    }
    
    if (!formData.province.trim()) {
      newErrors.province = "กรุณากรอกจังหวัด";
    }
    
    if (!formData.price_per_hour.trim()) {
      newErrors.price_per_hour = "กรุณากรอกราคาต่อชั่วโมง";
    } else if (parseFloat(formData.price_per_hour) <= 0) {
      newErrors.price_per_hour = "ราคาต่อชั่วโมงต้องมากกว่า 0";
    }
    
    // Facilities validation (if name is provided, price is required and vice versa)
    const facilityPairs = [
      { name: "mic", price: facList.mic_price, model: facList.mic },
      { name: "guitar", price: facList.guitar_price, model: facList.guitar },
      { name: "bass", price: facList.bass_price, model: facList.bass },
      { name: "drum", price: facList.drum_price, model: facList.drum },
      { name: "keyboard", price: facList.keyboard_price, model: facList.keyboard },
      { name: "pa_monitor", price: facList.pa_monitor_price, model: facList.pa_monitor }
    ];
    
    facilityPairs.forEach(facility => {
      if ((facility.model && !facility.price) || (!facility.model && facility.price)) {
        newErrors[facility.name as keyof typeof errors] = `กรุณากรอกทั้งชื่อรุ่นและราคาของ${getFacilityLabel(facility.name)}`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Helper function to get facility label
  const getFacilityLabel = (name: string): string => {
    const labels: Record<string, string> = {
      mic: "ไมโครโฟน",
      guitar: "กีต้าร์",
      bass: "เบส",
      drum: "กลอง",
      keyboard: "คีย์บอร์ด",
      pa_monitor: "PA Monitor"
    };
    return labels[name] || name;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Prepare form data to send in the request
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
    facDataToSend.append("pa_monitor_price", facList.pa_monitor_price.toString());

    try {
      const response = await fetch(
        "http://localhost:5000/api/livehouse/create-livehouse",
        {
          method: "POST",
          body: dataToSend,
        }
      );

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit form");
      }
      
      facDataToSend.append("livehouse_id", responseData.livehouse.livehouse_id);

      const jsonData = formDataToJson(facDataToSend);

      const jsonString = JSON.stringify(
        Object.fromEntries(
          Object.entries(jsonData).filter(
            ([_, value]) => !(value instanceof File)
          )
        )
      );

      const responseFac = await fetch(
        "http://localhost:5000/api/facilities/create-facility",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        }
      );

      if (!responseFac.ok) {
        const facError = await responseFac.json();
        throw new Error(facError.message || "Failed to submit facilities");
      }

      console.log("Form submitted successfully");
      router.push("/manager-landing");
    } catch (error) {
      console.error("Error during form submission", error);
      setErrors({
        general: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Alert */}
        {errors.general && (
          <Alert variant="destructive" className="bg-red-100 border border-red-300">
            <AlertDescription className="text-red-800">
              {errors.general}
            </AlertDescription>
          </Alert>
        )}

        {/* Image Upload Section */}
        <div className="space-y-4">
          <Label htmlFor="images" className="text-white">
            อัปโหลดรูปภาพ
          </Label>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <div key={index} className="space-y-2">
                  <LiveHouseImgUpload
                    label={`รูปภาพ ${index + 1}`}
                    helpText="อัปโหลดรูป JPG, JPEG, PNG (สูงสุด 5MB)"
                    onChange={(file) => handleImageChange(file, index)}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Livehouse Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              ชื่อ Livehouse <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ชื่อของ Livehouse"
              className={`w-full text-white ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-white">
              ที่ตั้ง <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="ที่ตั้งของ Livehouse"
              className={`w-full text-white ${errors.location ? "border-red-500" : ""}`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="province" className="text-white">
              จังหวัด <span className="text-red-500">*</span>
            </Label>
            <Input
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="จังหวัดของสถานที่ Livehouse"
              className={`w-full text-white ${errors.province ? "border-red-500" : ""}`}
            />
            {errors.province && (
              <p className="text-red-500 text-sm mt-1">{errors.province}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_per_hour" className="text-white">
              ราคาต่อชั่วโมง <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price_per_hour"
              name="price_per_hour"
              type="number"
              value={formData.price_per_hour}
              onChange={handleChange}
              placeholder="ราคาของการจอง (ต่อ 1 ชั่วโมง)"
              className={`w-full text-white ${errors.price_per_hour ? "border-red-500" : ""}`}
            />
            {errors.price_per_hour && (
              <p className="text-red-500 text-sm mt-1">{errors.price_per_hour}</p>
            )}
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
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-white">สิ่งอำนวยความสะดวก (ถ้ากรอกชื่อรุ่น ต้องกรอกราคาด้วย)</Label>
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
                {/* Label */}
                <div className="flex items-center space-x-2">
                  <Label htmlFor={item.name} className="text-white">
                    {item.label}
                  </Label>
                </div>

                {/* Model Name Input */}
                <div>
                  <Input
                    type="text"
                    id={`${item.name}_model`}
                    name={`${item.name}_model`}
                    onChange={(e) => handleFacilityModelChange(e, item.name)}
                    placeholder={`ชื่อรุ่นของ ${item.label}`}
                    className={`w-full text-white ${errors[item.name as keyof typeof errors] ? "border-red-500" : ""}`}
                  />
                </div>

                {/* Price Input */}
                <div>
                  <Input
                    type="number"
                    id={`${item.name}_price`}
                    name={`${item.name}_price`}
                    onChange={(e) => handleFacilityPriceChange(e, item.name)}
                    placeholder={`ราคาของ ${item.label} ต่อ1ชั่วโมง`}
                    className={`w-full text-white ${errors[item.name as keyof typeof errors] ? "border-red-500" : ""}`}
                  />
                </div>
                {/* Error message for this specific facility */}
                {errors[item.name as keyof typeof errors] && (
                  <p className="text-red-500 text-sm col-span-3 text-right">
                    {errors[item.name as keyof typeof errors]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="submit"
            className="bg-custom-purple text-custom-text-primary hover:bg-custom-purple-light hover:text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateLHForm;