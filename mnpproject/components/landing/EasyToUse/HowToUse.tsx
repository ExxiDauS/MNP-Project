import React from 'react'
import { Search, Calendar, FileText, CreditCard, CheckCircle } from 'lucide-react';

const HowToUse = () => {
    const steps = [
        {
          icon: <Search className="w-12 h-12 text-blue-500" />,
          title: "Select Livehouse",
          description: "Browse and choose from our wide selection of livehouses based on your preferences"
        },
        {
          icon: <Calendar className="w-12 h-12 text-blue-500" />,
          title: "Select Date & Time",
          description: "Pick your preferred performance date and time from available slots"
        },
        {
          icon: <FileText className="w-12 h-12 text-blue-500" />,
          title: "Input Form",
          description: "Fill in your details and performance requirements"
        },
        {
          icon: <CreditCard className="w-12 h-12 text-blue-500" />,
          title: "Payment",
          description: "Secure your booking with our easy payment process"
        },
        {
          icon: <CheckCircle className="w-12 h-12 text-blue-500" />,
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
            <div key={index} className="relative flex flex-col items-center">
              {/* Step number bubble */}
              <div className="absolute -top-4 left-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="bg-white p-6 rounded-lg shadow-sm w-full text-center h-full flex flex-col items-center">
                <div className="mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-8 h-0.5 bg-blue-500"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowToUse