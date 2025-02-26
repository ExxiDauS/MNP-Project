'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackButton from '@/components/buttons/BackButton';

interface SignUpFormData {
  username: string;
  password: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  facebook_link: string;
  facebook_name: string;
  instagram_link: string;
  instagram_name: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    password: '',
    email: '',
    role: 'artist', // Default role as artist
    name: '',
    phone: '',
    facebook_link: '',
    facebook_name: '',
    instagram_link: '',
    instagram_name: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showValidationError, setShowValidationError] = useState(false);

  // Error message component
  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="tooltip absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
      <div className="flex items-center bg-white border rounded shadow-sm p-2 z-20">
        <span className="text-orange-500 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </span>
        <span className="text-sm text-gray-800">{message}</span>
      </div>
      <div className="tooltip-arrow"></div>
    </div>
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignUpFormData, string>> = {};
    
    // Required fields validation (except social media)
    if (!formData.username.trim()) newErrors.username = 'Please fill out this field.';
    if (!formData.password.trim()) newErrors.password = 'Please fill out this field.';
    if (!formData.email.trim()) newErrors.email = 'Please fill out this field.';
    if (!formData.name.trim()) newErrors.name = 'Please fill out this field.';
    if (!formData.phone.trim()) newErrors.phone = 'Please fill out this field.';
    
    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = `Please include an '@' in the email address. '${formData.email}' is missing an '@'.`;
    }
    
    // Phone number validation - must contain only numbers and be exactly 10 digits
    if (formData.phone) {
      if (!/^\d+$/.test(formData.phone)) {
        newErrors.phone = 'Phone must contain only numbers.';
      } else if (formData.phone.length !== 10) {
        newErrors.phone = 'Phone must contain exactly 10 digits.';
      }
    }
    
    // Social media URL validations (only if provided)
    if (formData.facebook_link && !/^https?:\/\//.test(formData.facebook_link)) {
      newErrors.facebook_link = 'Must be a valid URL starting with http:// or https://';
    }
    
    if (formData.instagram_link && !/^https?:\/\//.test(formData.instagram_link)) {
      newErrors.instagram_link = 'Must be a valid URL starting with http:// or https://';
    }
    
    setErrors(newErrors);
    setShowValidationError(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof SignUpFormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof SignUpFormData];
        setShowValidationError(Object.keys(newErrors).length > 0);
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop submission if validation fails
    }
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('Form data being submitted:', formData);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response received:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      // Redirect to login page on successful signup
      router.push('/login?signup=success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-custom-background-primary">
      <section className='relative flex justify-self-center w-1/2 mt-8'>
        <div className='absolute -inset-10 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl'></div>
        
        <div className='relative flex flex-col w-full m-2 bg-custom-background-surface outline outline-purple-400/30 outline-offset-2 rounded-3xl p-8 backdrop-blur-sm'>
        <BackButton href='/' className='left-0'/>
          <div className="w-full max-w-lg mx-auto space-y-8">
            <div>
              <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
                Create your account
              </h2>
            </div>

            {showValidationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
                <strong className="font-bold">Validation Error!</strong>
                <span className="block sm:inline"> Please check the form for errors.</span>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-6 rounded-md">
                {/* Account Information */}
                <div className="p-5 bg-gray-900/60 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <h3 className="text-lg font-medium text-white mb-3 border-b border-purple-500/30 pb-2">
                    Account Information
                  </h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-4">
                    <div className="relative">
                      <label htmlFor="username" className="block text-sm font-medium text-white">
                        Username <span className="text-pink-500 text-lg font-bold">*</span>
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      />
                      {errors.username && (
                        <div className="mt-1 text-sm text-red-400">{errors.username}</div>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="password" className="block text-sm font-medium text-white">
                        Password <span className="text-pink-500 text-lg font-bold">*</span>
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      />
                      {errors.password && (
                        <div className="mt-1 text-sm text-red-400">{errors.password}</div>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Email <span className="text-pink-500 text-lg font-bold">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Please enter a valid email address (e.g., example@domain.com)"
                        className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      />
                      {errors.email && (
                        <div className="mt-1 text-sm text-red-400">{errors.email}</div>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="role" className="block text-sm font-medium text-white">
                        Role <span className="text-pink-500 text-lg font-bold">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${errors.role ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      >
                        <option value="artist">Artist</option>
                        <option value="manager">Manager</option>
                      </select>
                      {errors.role && (
                        <div className="mt-1 text-sm text-red-400">{errors.role}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="p-5 bg-gray-900/60 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <h3 className="text-lg font-medium text-white mb-3 border-b border-purple-500/30 pb-2">
                    Personal Information
                  </h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-4">
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-white">
                        Full Name <span className="text-pink-500 text-lg font-bold">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      />
                      {errors.name && (
                        <div className="mt-1 text-sm text-red-400">{errors.name}</div>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="phone" className="block text-sm font-medium text-white">
                        Phone Number <span className="text-pink-500 text-lg font-bold">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10 digits only (e.g., 1234567890)"
                        className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      />
                      {errors.phone && (
                        <div className="mt-1 text-sm text-red-400">{errors.phone}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Media Information */}
                <div className="p-5 bg-gray-900/60 rounded-xl backdrop-blur-sm border border-purple-500/20">
                  <h3 className="text-lg font-medium text-white mb-3 border-b border-purple-500/30 pb-2">
                    Social Media Information
                  </h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-4">
                    <div className="relative">
                      <label htmlFor="facebook_name" className="block text-sm font-medium text-white">
                        Facebook Name
                      </label>
                      <input
                        id="facebook_name"
                        name="facebook_name"
                        type="text"
                        value={formData.facebook_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-purple-500/30 bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white"
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="facebook_link" className="block text-sm font-medium text-white">
                        Facebook Profile Link
                      </label>
                      <input
                        id="facebook_link"
                        name="facebook_link"
                        type="url"
                        value={formData.facebook_link}
                        onChange={handleChange}
                        placeholder="https://facebook.com/profile"
                        className={`mt-1 block w-full rounded-md border ${errors.facebook_link ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      />
                      {errors.facebook_link && (
                        <div className="mt-1 text-sm text-red-400">{errors.facebook_link}</div>
                      )}
                    </div>

                    <div className="relative">
                      <label htmlFor="instagram_name" className="block text-sm font-medium text-white">
                        Instagram Username
                      </label>
                      <input
                        id="instagram_name"
                        name="instagram_name"
                        type="text"
                        value={formData.instagram_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-purple-500/30 bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white"
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="instagram_link" className="block text-sm font-medium text-white">
                        Instagram Profile Link
                      </label>
                      <input
                        id="instagram_link"
                        name="instagram_link"
                        type="url"
                        value={formData.instagram_link}
                        onChange={handleChange}
                        placeholder="https://instagram.com/username"
                        className={`mt-1 block w-full rounded-md border ${errors.instagram_link ? 'border-red-500' : 'border-purple-500/30'} bg-gray-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white`}
                      />
                      {errors.instagram_link && (
                        <div className="mt-1 text-sm text-red-400">{errors.instagram_link}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-4 text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 transition-all duration-200 shadow-lg shadow-purple-500/20"
                >
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-300">
                  Already have an account?{' '}
                  <Link href="/signin" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}