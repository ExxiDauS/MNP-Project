import React from 'react'
import VideoBackground from '../components/landing/hero/VideoBackground'
import PopularLivehouses from '@/components/landing/hero/PopularLivehouses'
import EasyToUse from '@/components/landing/EasyToUse/EasyToUse'
import WhyChooseUs from '@/components/landing/WhyChooseUs/WhyChooseUs'
import Footer from '@/components/landing/Footer/Footer'
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

const Page = async () => {
  // Get the server session
  const session = await getServerSession(authOptions);

  // If user is authenticated and has ROLE_2, redirect to landing2
  if (session?.user?.role === 'manager') {
    redirect('/manager-landing');
  }
  
  return (
    <>
      {/* Common content that appears for all users */}
      <VideoBackground />
      <PopularLivehouses />
      <WhyChooseUs />
      <EasyToUse />
      <Footer />
    </>
  )
}

export default Page