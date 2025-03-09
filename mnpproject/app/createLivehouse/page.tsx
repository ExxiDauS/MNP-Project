import React from 'react'
import CreateLHForm from '@/components/createForm/CreateLHForm'
import BackButton from '@/components/buttons/BackButton'

const page = () => {
  return (
    <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
      {/* Larger aura effect background */}
      <div className="absolute inset-0 p-4 sm:p-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-4xl"></div>

      {/* Content container */}
      <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-4 sm:p-6 md:p-4">
        <BackButton href='/' />
        <div className='mt-4'>
          <CreateLHForm />
        </div>
      </div>
    </section>
  )
}

export default page