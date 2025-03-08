import React from 'react';
import { Search, Calendar, FileText, CreditCard, CheckCircle, MoveRight } from 'lucide-react';
import StepCard from './StepCard';

const EasyToUse = () => {
  const steps = [
    { icon: <Search className="w-12 h-12 text-custom-purple-dark" />, title: "เลือก Livehouse", description: "เรียกดูและเลือกจาก livehouse ที่หลากหลายตามความต้องการของคุณ" },
    { icon: <Calendar className="w-12 h-12 text-custom-purple-dark" />, title: "เลือก\nวันและเวลา", description: "เลือกวันที่และเวลาที่คุณต้องการแสดงจากช่วงเวลาที่มีอยู่" },
    { icon: <FileText className="w-12 h-12 text-custom-purple-dark" />, title: "กรอกแบบฟอร์ม", description: "กรอกรายละเอียดและความต้องการในการแสดงของคุณ" },
    { icon: <CreditCard className="w-12 h-12 text-custom-purple-dark" />, title: "ชำระเงิน", description: "ยืนยันการจองของคุณด้วยกระบวนการชำระเงินที่ง่ายดาย" },
    { icon: <CheckCircle className="w-12 h-12 text-custom-purple-dark" />, title: "เสร็จสิ้น", description: "รับการยืนยันและเตรียมพร้อมสำหรับการแสดงของคุณ!" }
  ];

  return (
    <div className="py-24 my-20 pb-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-custom-text-primary">
            {"จากการค้นหาสู่เวที\nเพียง 5 ขั้นตอน"}
            </h2>
            <p className="text-xl text-custom-text-secondary">
            การเดินทางของคุณจากการค้นหาสู่การแสดง นั้นง่ายดาย
            </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center h-full">
              <StepCard index={index + 1} title={step.title} description={step.description} icon={step.icon} />
              
              {/* Show arrow only on medium+ screens */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                  <MoveRight className="text-custom-purple-deeper size-10" />
                </div>
              )}

              {/* Vertical arrow for small screens */}
              {index < steps.length - 1 && (
                <div className="block md:hidden mt-4">
                  <MoveRight className="text-custom-purple-deeper rotate-90 size-10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EasyToUse;
