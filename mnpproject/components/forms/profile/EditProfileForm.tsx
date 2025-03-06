'use client'

import React, { useState, useEffect } from 'react';
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

    // Fetch user data - for debugging
    useEffect(() => {
        console.log('Component mounted, initial form state:', formData);
    }, []);

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Debug what's changing
        console.log(`Field '${name}' changed to: '${value}'`);
        
        // Clear errors when user starts typing
        setFieldErrors(prev => ({ ...prev, [name]: '' }));
        setError('');
    };

    // Handle profile image change
    const handleProfileImageChange = (file: File | null) => {
        setProfileImage(file);
        console.log('Profile image changed:', file ? file.name : 'null');
        
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
            newFieldErrors.facebook_name = 'Facebook display name is required when providing a link';
            isValid = false;
        }
        
        if (formData.facebook_name.trim() && !formData.facebook_link.trim()) {
            newFieldErrors.facebook_link = 'Facebook link is required when providing a display name';
            isValid = false;
        }

        // Instagram validation
        if (formData.instagram_link.trim() && !formData.instagram_name.trim()) {
            newFieldErrors.instagram_name = 'Instagram display name is required when providing a link';
            isValid = false;
        }
        
        if (formData.instagram_name.trim() && !formData.instagram_link.trim()) {
            newFieldErrors.instagram_link = 'Instagram link is required when providing a display name';
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
            setError('Please correct the errors in the form.');
            return;
        }
        
        setIsLoading(true);

        try {
            // Log the current state of form data before submission
            console.log('Form submission - current state:', formData);
            
            // Create FormData object for multipart/form-data submission
            const formDataToSend = new FormData();
            
            // Add all fields that have a value
            let hasData = false;
            
            Object.entries(formData).forEach(([key, value]) => {
                // Check if the value exists and is not just whitespace
                if (value !== null && value !== undefined && String(value).trim() !== '') {
                    formDataToSend.append(key, String(value));
                    console.log(`Added to FormData: ${key} = ${value}`);
                    hasData = true;
                } else {
                    console.log(`Skipped empty field: ${key}`);
                }
            });
            
            if (profileImage) {
                formDataToSend.append('image', profileImage);
                console.log('Added image to FormData:', profileImage.name);
                hasData = true;
            }
            
            if (!hasData) {
                console.warn('No data to submit! All fields are empty.');
                setError('Please fill in at least one field before submitting.');
                setIsLoading(false);
                return;
            }
            
            // Log FormData contents (for debugging)
            console.log('FormData entries:');
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
                throw new Error(errorData.message || 'Failed to update profile');
            }
            
            setSuccess('Profile updated successfully!');
            
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
                label="Profile Picture"
                errorMessage={fieldErrors.profileImage}
                helpText="Upload profile picture (JPG, JPEG, PNG files only, max 5MB)"
                onChange={handleProfileImageChange}
                className="mt-3"
            />

            {/* Name Field */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full text-white"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full text-white"
                />
            </div>

            <Separator className="my-4" />

            {/* Facebook Fields */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Facebook</h3>
                <div className="space-y-2">
                    <Label htmlFor="facebook_name" className="text-custom-text-secondary">Display Name</Label>
                    <Input
                        id="facebook_name"
                        name="facebook_name"
                        value={formData.facebook_name}
                        onChange={handleChange}
                        placeholder="How you want your Facebook profile to be displayed"
                        className={`w-full text-white ${fieldErrors.facebook_name ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.facebook_name && (
                        <p className="text-xs text-red-500">{fieldErrors.facebook_name}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="facebook_link" className="text-custom-text-secondary">Profile Link</Label>
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
                        Enter the complete URL to your Facebook profile
                    </p>
                </div>
            </div>

            <Separator className="my-4" />

            {/* Instagram Fields */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Instagram</h3>
                <div className="space-y-2">
                    <Label htmlFor="instagram_name" className="text-custom-text-secondary">Display Name</Label>
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
                    <Label htmlFor="instagram_link" className="text-custom-text-secondary">Profile Link</Label>
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
                        Enter the complete URL to your Instagram profile
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" disabled={isLoading} onClick={() => router.push("/profile")}>Cancel</Button>
                <Button 
                    type="submit" 
                    className='bg-custom-purple text-custom-text-primary hover:bg-custom-purple-light hover:text-black'
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
};

export default EditProfileForm;