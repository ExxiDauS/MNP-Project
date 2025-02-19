import React from 'react'
import VideoBackground from '../components/landing/hero/VideoBackground'
import PopularLivehouses from '@/components/landing/hero/PopularLivehouses'
import EasyToUse from '@/components/landing/EasyToUse/EasyToUse'
import WhyChooseUs from '@/components/landing/WhyChooseUs/WhyChooseUs'
import Footer from '@/components/landing/Footer/Footer'

const page = () => {
  return (
    <>
      <VideoBackground />
      <PopularLivehouses />
      <WhyChooseUs />
      <EasyToUse />
      <Footer />
    </>
  )
}

export default page