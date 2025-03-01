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
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'artist', // Default role changed to artist
    name: '',
    phone: '',
    facebook_link: '',
    facebook_name: '',
    instagram_link: '',
    instagram_name: '',
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
      { key: 'phone', label: 'เบอร์โทรศัพท์' }
    ];

    for (const field of requiredFields) {
      if (!formData[field.key as keyof FormData] || formData[field.key as keyof FormData].trim() === '') {
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
      // Create a data object without the confirmPassword field
      const { confirmPassword, ...dataToSend } = formData;

      const response = await fetch('http://localhost:5000/api/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

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
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-900 border-green-800 text-green-100">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Required Fields */}
        <div className="space-y-2">
          <Label htmlFor="username">ชื่อผู้ใช้ *</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="กรอกชื่อผู้ใช้"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.username ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            required
          />
          {fieldErrors.username && (
            <p className="text-sm text-red-500">{fieldErrors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">อีเมล *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            required
          />
          {fieldErrors.email && (
            <p className="text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">รหัสผ่าน *</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="กรอกรหัสผ่าน"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.password ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            required
          />
          {fieldErrors.password && (
            <p className="text-sm text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน *</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="กรอกรหัสผ่านอีกครั้ง"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            required
          />
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="กรอกชื่อและนามสกุล"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.name ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            required
          />
          {fieldErrors.name && (
            <p className="text-sm text-red-500">{fieldErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0812345678"
            className={`bg-zinc-700 border-zinc-600 text-zinc-100 ${fieldErrors.phone ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            required
          />
          {fieldErrors.phone && (
            <p className="text-sm text-red-500">{fieldErrors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">บทบาท *</Label>
          <Select onValueChange={handleRoleChange} defaultValue="artist">
            <SelectTrigger className="bg-zinc-700 border-zinc-600 text-zinc-100">
              <SelectValue placeholder="เลือกบทบาท" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
              {/* return 'artist' or 'manager' */}
              <SelectItem value="artist">ศิลปิน</SelectItem>
              <SelectItem value="manager">ผู้จัดการ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Optional Social Media Fields - Full Width */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="facebook_link">ลิงก์ Facebook (ไม่บังคับ)</Label>
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
          <Label htmlFor="facebook_name">ชื่อ Facebook (ไม่บังคับ)</Label>
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
          <Label htmlFor="instagram_link">ลิงก์ Instagram (ไม่บังคับ)</Label>
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
          <Label htmlFor="instagram_name">ชื่อ Instagram (ไม่บังคับ)</Label>
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