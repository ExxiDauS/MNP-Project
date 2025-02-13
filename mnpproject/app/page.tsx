import React from 'react'
import VideoBackground from '../components/hero/VideoBackground'
import PopularLivehouses from '@/components/explore/PopularLivehouses'
import HowToUse from '@/components/landing/EasyToUse/HowToUse'
import WhyChooseUs from '@/components/landing/WhyChooseUs/WhyChooseUs'

const page = () => {
  return (
    <>
      <VideoBackground />
      <PopularLivehouses />
      <WhyChooseUs />
      <HowToUse />
    </>
  )
}

export default page