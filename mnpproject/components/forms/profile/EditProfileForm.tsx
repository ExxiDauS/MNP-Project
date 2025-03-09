'use client'

import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AvatarUpload from '@/components/forms/AvatarUpload';
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    phone: string;
    facebook_link: string;
    facebook_name: string;
    instagram_link: string;
    instagram_name: string;
}

const EditProfileForm = () => {
    const { user, signOut } = useUser();
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        facebook_link: '',
        facebook_name: '',
        instagram_link: '',
        instagram_name: ''
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors when user starts typing
        setFieldErrors(prev => ({ ...prev, [name]: '' }));
        setError('');
    };

    // Handle profile image change
    const handleProfileImageChange = (file: File | null) => {
        setProfileImage(file);

        if (file) {
            setFieldErrors(prev => ({ ...prev, profileImage: '' }));
        }
    };

    // Validate social media fields
    const validateSocialMedia = (): boolean => {
        const newFieldErrors: { [key: string]: string } = {};
        let isValid = true;

        // Facebook validation
        if (formData.facebook_link.trim() && !formData.facebook_name.trim()) {
            newFieldErrors.facebook_name = 'ชื่อที่แสดง Facebook จำเป็นเมื่อระบุลิงก์';
            isValid = false;
        }

        if (formData.facebook_name.trim() && !formData.facebook_link.trim()) {
            newFieldErrors.facebook_link = 'ลิงก์ Facebook จำเป็นเมื่อระบุชื่อที่แสดง';
            isValid = false;
        }

        // Instagram validation
        if (formData.instagram_link.trim() && !formData.instagram_name.trim()) {
            newFieldErrors.instagram_name = 'ชื่อที่แสดง Instagram จำเป็นเมื่อระบุลิงก์';
            isValid = false;
        }

        if (formData.instagram_name.trim() && !formData.instagram_link.trim()) {
            newFieldErrors.instagram_link = 'ลิงก์ Instagram จำเป็นเมื่อระบุชื่อที่แสดง';
            isValid = false;
        }

        setFieldErrors(newFieldErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate social media fields
        if (!validateSocialMedia()) {
            setError('กรุณาแก้ไขข้อผิดพลาดในฟอร์ม.');
            return;
        }

        setIsLoading(true);

        try {
            // Create FormData object for multipart/form-data submission
            const formDataToSend = new FormData();

            // Add all fields that have a value
            let hasData = false;

            Object.entries(formData).forEach(([key, value]) => {
                // Check if the value exists and is not just whitespace
                if (value !== null && value !== undefined && String(value).trim() !== '') {
                    formDataToSend.append(key, String(value));
                    hasData = true;
                }
            });

            if (profileImage) {
                formDataToSend.append('image', profileImage);
                hasData = true;
            }

            if (!hasData) {
                console.warn('ไม่มีข้อมูลที่จะส่ง! ทุกช่องว่างเปล่า.');
                setError('กรุณากรอกข้อมูลอย่างน้อยหนึ่งฟิลด์ก่อนส่ง.');
                setIsLoading(false);
                return;
            }
            // Validate phone number
            if (!/^\d{10}$/.test(formData.phone)) {
                setFieldErrors(prev => ({ ...prev, phone: 'หมายเลขโทรศัพท์ต้องมี 10 หลักเท่านั้น' }));
                setError('กรุณาแก้ไขข้อผิดพลาดในฟอร์ม.');
                setIsLoading(false);
                return;
            }

            for (const pair of formDataToSend.entries()) {
                console.log(`- ${pair[0]}: ${pair[1]}`);
            }

            const response = await fetch(`http://localhost:5000/api/users/edit-profile/${user?.user_id}`, {
                method: 'PATCH',
                // Do not set Content-Type header when using FormData
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'ไม่สามารถอัปเดตโปรไฟล์ได้');
            }

            setSuccess('อัปเดตโปรไฟล์เรียบร้อยแล้ว!');

            // Force sign out after successful profile update with custom message
            setTimeout(() => {
                signOut("กรุณาเข้าสู่ระบบใหม่เพื่อดูการเปลี่ยนแปลงโปรไฟล์");
            }, 1500); // Give the user 1.5 seconds to see the success message

        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err instanceof Error ? err.message : 'Failed to update profile. Please try again.');
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
                <Alert className="mt-4 bg-green-900 border-green-800 text-green-100">
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            {/* Profile Image Upload Component */}
            <AvatarUpload
                label="รูปโปรไฟล์"
                errorMessage={fieldErrors.profileImage}
                helpText="อัปโหลดรูปโปรไฟล์ (ไฟล์ JPG, JPEG, PNG เท่านั้น, ขนาดสูงสุด 5MB)"
                onChange={handleProfileImageChange}
                className="mt-3"
            />

            <div className="space-y-2">
                <Label htmlFor="name" className="text-white">ชื่อ</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ชื่อเต็มของคุณ"
                    className="w-full text-white"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">โทรศัพท์</Label>
                <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="เบอร์โทรศัพท์ 10 หลักของคุณ" 
                    className={`w-full text-white ${fieldErrors.phone ? 'border-red-500' : ''}`}
                />
                {fieldErrors.phone && (
                    <p className="text-xs text-red-500">{fieldErrors.phone}</p>
                )}
            </div>

            <Separator className="my-4" />

            {/* Facebook Fields */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Facebook</h3>
                <div className="space-y-2">
                    <Label htmlFor="facebook_name" className="text-custom-text-secondary">ชื่อที่แสดง</Label>
                    <Input
                        id="facebook_name"
                        name="facebook_name"
                        value={formData.facebook_name}
                        onChange={handleChange}
                        placeholder="ชื่อที่แสดงบน Facebook ของคุณ"
                        className={`w-full text-white ${fieldErrors.facebook_name ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.facebook_name && (
                        <p className="text-xs text-red-500">{fieldErrors.facebook_name}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="facebook_link" className="text-custom-text-secondary">ลิงค์ Facebook</Label>
                    <Input
                        id="facebook_link"
                        name="facebook_link"
                        value={formData.facebook_link}
                        onChange={handleChange}
                        placeholder="https://facebook.com/your-profile"
                        className={`w-full text-white ${fieldErrors.facebook_link ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.facebook_link && (
                        <p className="text-xs text-red-500">{fieldErrors.facebook_link}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        ป้อน URL ที่สมบูรณ์ที่ไปยังโปรไฟล์ Facebook ของคุณ
                    </p>
                </div>
            </div>

            <Separator className="my-4" />

            {/* Instagram Fields */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Instagram</h3>
                <div className="space-y-2">
                    <Label htmlFor="instagram_name" className="text-custom-text-secondary">ชื่อที่แสดง</Label>
                    <Input
                        id="instagram_name"
                        name="instagram_name"
                        value={formData.instagram_name}
                        onChange={handleChange}
                        placeholder="How you want your Instagram profile to be displayed"
                        className={`w-full text-white ${fieldErrors.instagram_name ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.instagram_name && (
                        <p className="text-xs text-red-500">{fieldErrors.instagram_name}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instagram_link" className="text-custom-text-secondary">ลิงค์ Instragram</Label>
                    <Input
                        id="instagram_link"
                        name="instagram_link"
                        value={formData.instagram_link}
                        onChange={handleChange}
                        placeholder="https://instagram.com/your-username"
                        className={`w-full text-white ${fieldErrors.instagram_link ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.instagram_link && (
                        <p className="text-xs text-red-500">{fieldErrors.instagram_link}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        ป้อน URL ที่สมบูรณ์ที่ไปยังโปรไฟล์ Instagram ของคุณ
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" disabled={isLoading} onClick={() => router.push(`/profile/${user?.user_id}`)}>ยกเลิก</Button>
                <Button
                    type="submit"
                    className='bg-custom-purple text-custom-text-primary hover:bg-custom-purple-light hover:text-black'
                    disabled={isLoading}
                >
                    {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                </Button>
            </div>
        </form>
    );
};

export default EditProfileForm;