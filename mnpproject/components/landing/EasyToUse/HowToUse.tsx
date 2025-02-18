import React from 'react'
import { Search, Calendar, FileText, CreditCard, CheckCircle, MoveRight } from 'lucide-react';
import StepCard from './StepCard';

const HowToUse = () => {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-custom-purple-dark" />,
      title: "Select Livehouse",
      description: "Browse and choose from our wide selection of livehouses based on your preferences"
    },
    {
      icon: <Calendar className="w-12 h-12 text-custom-purple-dark" />,
      title: "Select\nDate & Time",
      description: "Pick your preferred performance date and time from available slots"
    },
    {
      icon: <FileText className="w-12 h-12 text-custom-purple-dark" />,
      title: "Input Form",
      description: "Fill in your details and performance requirements"
    },
    {
      icon: <CreditCard className="w-12 h-12 text-custom-purple-dark" />,
      title: "Payment",
      description: "Secure your booking with our easy payment process"
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-custom-purple-dark" />,
      title: "Finish",
      description: "Receive confirmation and get ready for your performance!"
    }
  ];
  return (
    <div className="py-16 ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Easy to Use</h2>
          <p className="text-xl text-gray-400">Book your perfect venue in just 5 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <StepCard
              key={index} 
              index={index + 1} 
              title={step.title} 
              description={step.description} 
              icon={step.icon} />

              {/* Connector line */}
              {index < steps.length - 1 && (
                <MoveRight className="text-custom-purple absolute top-1/3 -right-8 size-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowToUse