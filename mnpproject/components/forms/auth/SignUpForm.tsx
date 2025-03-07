'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AvatarUpload from '@/components/forms/AvatarUpload' // Import the AvatarUpload component

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  facebook_link: string;
  facebook_name: string;
  instagram_link: string;
  instagram_name: string;
  profileImage: File | null;
  verify: File | null;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'artist',
    name: '',
    phone: '',
    facebook_link: '',
    facebook_name: '',
    instagram_link: '',
    instagram_name: '',
    profileImage: null,
    verify: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear main error when user is typing
    setError('');

    // Clear the specific field error when user starts typing
    setFieldErrors(prev => ({ ...prev, [name]: '' }));

    // Check if field is empty and mark as error immediately
    if (value.trim() === '') {
      const fieldLabel = name === 'username' ? 'ชื่อผู้ใช้' :
        name === 'password' ? 'รหัสผ่าน' :
          name === 'confirmPassword' ? 'ยืนยันรหัสผ่าน' :
            name === 'email' ? 'อีเมล' :
              name === 'name' ? 'ชื่อ-นามสกุล' :
                name === 'phone' ? 'เบอร์โทรศัพท์' : '';

      if (fieldLabel) {
        setFieldErrors(prev => ({ ...prev, [name]: `กรุณากรอก${fieldLabel}` }));
      }
    }

    // Real-time validation for specific fields
    if (name === 'email' && value) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(value)) {
        setFieldErrors(prev => ({ ...prev, email: 'รูปแบบอีเมลไม่ถูกต้อง' }));
      } else {
        setFieldErrors(prev => ({ ...prev, email: '' }));
      }
    }

    if (name === 'phone' && value) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        setFieldErrors(prev => ({ ...prev, phone: 'เบอร์โทรต้องเป็นตัวเลข 10 หลักเท่านั้น' }));
      } else {
        setFieldErrors(prev => ({ ...prev, phone: '' }));
      }
    }

    if (name === 'confirmPassword' || name === 'password') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;

      if (password && confirmPassword && password !== confirmPassword) {
        setFieldErrors(prev => ({ ...prev, confirmPassword: 'รหัสผ่านไม่ตรงกัน' }));
      } else {
        setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  // Handle profile image change from AvatarUpload component
  const handleProfileImageChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, profileImage: file }));
    
    if (!file) {
      setFieldErrors(prev => ({ 
        ...prev, 
        profileImage: 'กรุณาอัปโหลดรูปโปรไฟล์' 
      }));
    } else {
      setFieldErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  // Handle verify file upload
  const handleVerifyProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type (optional)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setFieldErrors(prev => ({
          ...prev,
          verify: 'กรุณาอัปโหลดไฟล์ PDF หรือภาพเฉพาะ JPG, JPEG หรือ PNG เท่านั้น'
        }));
        return;
      }

      // Validate file size (optional, max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFieldErrors(prev => ({
          ...prev,
          verify: 'ขนาดไฟล์ต้องไม่เกิน 5MB'
        }));
        return;
      }

      // Clear any previous errors
      setFieldErrors(prev => ({ ...prev, verify: '' }));

      // Set the file in form data
      setFormData(prev => ({ ...prev, verify: file }));
    } else {
      // If file selection was cancelled or cleared, set error
      setFieldErrors(prev => ({
        ...prev,
        verify: 'กรุณาอัปโหลดหลักฐานเพื่อยืนยันตัวตน'
      }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newFieldErrors = { ...fieldErrors };

    // Check required fields
    const requiredFields = [
      { key: 'username', label: 'ชื่อผู้ใช้' },
      { key: 'password', label: 'รหัสผ่าน' },
      { key: 'confirmPassword', label: 'ยืนยันรหัสผ่าน' },
      { key: 'email', label: 'อีเมล' },
      { key: 'name', label: 'ชื่อ-นามสกุล' },
      { key: 'phone', label: 'เบอร์โทรศัพท์' },
      { key: 'profileImage', label: 'รูปโปรไฟล์' },
      { key: 'verify', label: 'หลักฐานเพื่อยืนยันตัวตน' },
    ];

    for (const field of requiredFields) {
      if (field.key === 'profileImage') {
        if (!formData.profileImage) {
          newFieldErrors.profileImage = `กรุณาอัปโหลด${field.label}`;
          isValid = false;
        }
      } else if (!formData[field.key as keyof FormData] || (typeof formData[field.key as keyof FormData] === 'string' && (formData[field.key as keyof FormData] as string).trim() === '')) {
        newFieldErrors[field.key] = `กรุณากรอก${field.label}`;
        isValid = false;
      }
    }

    // If any required field is empty, show an error and return
    if (!isValid) {
      setFieldErrors(newFieldErrors);
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return false;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setFieldErrors(prev => ({ ...prev, email: 'รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบรูปแบบ เช่น example@domain.com' }));
      setError('รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบรูปแบบ เช่น example@domain.com');
      return false;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors(prev => ({ ...prev, confirmPassword: 'รหัสผ่านไม่ตรงกัน กรุณากรอกให้ตรงกันทั้งสองช่อง' }));
      setError('รหัสผ่านไม่ตรงกัน กรุณากรอกให้ตรงกันทั้งสองช่อง');
      return false;
    }

    // Validate phone number (10 digits only)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFieldErrors(prev => ({ ...prev, phone: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลักเท่านั้น เช่น 0812345678' }));
      setError('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลักเท่านั้น เช่น 0812345678');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData object for multipart/form-data submission (for file upload)
      const formDataToSend = new FormData();

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'confirmPassword' && key !== 'profileImage' && key !== 'verify') {
          formDataToSend.append(key, value as string);
        }
      });

      // Append profile image if exists
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      // Append verify proof if exists
      if (formData.verify) {
        formDataToSend.append('verify', formData.verify);
      }

      const response = await fetch('http://localhost:5000/api/users/sign-up', {
        method: 'POST',
        // Do not set Content-Type header when using FormData, browser will set it automatically
        body: formDataToSend,
      });

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
        throw new Error(data || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }

      if (!response.ok) {
        throw new Error(data.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }

      setSuccess('สมัครสมาชิกสำเร็จ กำลังนำคุณไปยังหน้าเข้าสู่ระบบ...');

      // Redirect to sign-in page after success
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive" className='mt-4'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-900 border-green-800 text-green-100">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Profile Image Upload Section using AvatarUpload component */}
      <AvatarUpload
        label="รูปโปรไฟล์ *"
        errorMessage={fieldErrors.profileImage}
        helpText="อัปโหลดรูปโปรไฟล์ (รองรับไฟล์ JPG, JPEG, PNG ขนาดไม่เกิน 5MB)"
        onChange={handleProfileImageChange}
        className="mt-3"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Required Fields */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">ชื่อผู้ใช้ *</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="กรอกชื่อผู้ใช้"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.username ? 'border-red-500 focus:ring-red-500' : ''
              }`}
          />
          {fieldErrors.username && (
            <p className="text-sm text-red-500">{fieldErrors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">อีเมล *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : ''
              }`}
          />
          {fieldErrors.email && (
            <p className="text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">รหัสผ่าน *</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="กรอกรหัสผ่าน"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.password ? 'border-red-500 focus:ring-red-500' : ''
              }`}
          />
          {fieldErrors.password && (
            <p className="text-sm text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white">ยืนยันรหัสผ่าน *</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="กรอกรหัสผ่านอีกครั้ง"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
              }`}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">ชื่อ-นามสกุล *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="กรอกชื่อและนามสกุล"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.name ? 'border-red-500 focus:ring-red-500' : ''
              }`}
          />
          {fieldErrors.name && (
            <p className="text-sm text-red-500">{fieldErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">เบอร์โทรศัพท์ *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0812345678"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.phone ? 'border-red-500 focus:ring-red-500' : ''
              }`}
          />
          {fieldErrors.phone && (
            <p className="text-sm text-red-500">{fieldErrors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-white">บทบาท *</Label>
          <Select onValueChange={handleRoleChange} defaultValue="artist">
            <SelectTrigger className="bg-zinc-700 border-zinc-600 text-zinc-100">
              <SelectValue placeholder="เลือกบทบาท" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
              <SelectItem value="artist">ศิลปิน</SelectItem>
              <SelectItem value="manager">ผู้จัดการ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="verify" className="text-white">หลักฐานเพื่อยืนยันตัวตน *</Label>
          <Input
            id="verify" 
            name="verify"
            type="file"
            accept="application/pdf, image/png, image/jpeg, image/jpg"
            onChange={handleVerifyProofUpload}
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.verify ? 'border-red-500 focus:ring-red-500' : ''
              }`}
          />
          {fieldErrors.verify && (
            <p className="text-sm text-red-500">{fieldErrors.verify}</p>
          )}
        </div>

        {/* Optional Social Media Fields - Full Width */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="facebook_link" className="text-white">ลิงก์ Facebook (ไม่บังคับ)</Label>
          <Input
            id="facebook_link"
            name="facebook_link"
            type="url"
            value={formData.facebook_link}
            onChange={handleChange}
            placeholder="https://www.facebook.com/username"
            className="bg-zinc-700 border-zinc-600 text-zinc-100"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="facebook_name" className="text-white">ชื่อ Facebook (ไม่บังคับ)</Label>
          <Input
            id="facebook_name"
            name="facebook_name"
            type="text"
            value={formData.facebook_name}
            onChange={handleChange}
            placeholder="ชื่อที่แสดงบน Facebook"
            className="bg-zinc-700 border-zinc-600 text-zinc-100"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="instagram_link" className="text-white">ลิงก์ Instagram (ไม่บังคับ)</Label>
          <Input
            id="instagram_link"
            name="instagram_link"
            type="url"
            value={formData.instagram_link}
            onChange={handleChange}
            placeholder="https://www.instagram.com/username"
            className="bg-zinc-700 border-zinc-600 text-zinc-100"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="instagram_name" className="text-white">ชื่อ Instagram (ไม่บังคับ)</Label>
          <Input
            id="instagram_name"
            name="instagram_name"
            type="text"
            value={formData.instagram_name}
            onChange={handleChange}
            placeholder="ชื่อที่แสดงบน Instagram"
            className="bg-zinc-700 border-zinc-600 text-zinc-100"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
          disabled={isLoading}
        >
          {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-zinc-400">
            หากคุณมีบัญชีอยู่แล้ว{' '}
            <button
              type="button"
              onClick={() => router.push('/sign-in')}
              className="text-zinc-100 hover:underline font-medium"
            >
              เข้าสู่ระบบที่นี่
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}