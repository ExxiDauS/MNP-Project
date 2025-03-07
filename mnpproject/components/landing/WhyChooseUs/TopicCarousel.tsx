"use client"

import React, { useState } from 'react'
import TopicDetail from './TopicDetail';

interface WhyTopic {
    topic: string;
    description: string;
}

const TopicCarousel = () => {

    const topics: WhyTopic[] = [
        {
            topic: "เข้าถึงสถานที่ชั้นนำ",
            description: "เรียกดูสถานที่แสดงสดที่ได้รับการยืนยันหลายร้อยแห่งทั่วประเทศ ตั้งแต่คาเฟ่เล็กๆ ไปจนถึงสถานที่แสดงดนตรีขนาดกลาง ค้นหาสถานที่ที่เหมาะสำหรับการแสดงของคุณ"
        },
        {
            topic: "กระบวนการจองที่ง่าย",
            description: "ไม่ต้องสื่อสารไปมาอีกต่อไป จองสถานที่ที่คุณต้องการได้ทันทีด้วยระบบการจอง 5 ขั้นตอนที่มีประสิทธิภาพ ประหยัดเวลาและมุ่งเน้นไปที่การแสดงของคุณ"
        },
        {
            topic: "ราคาชัดเจนและโปร่งใส",
            description: "ดูค่าใช้จ่ายทั้งหมดล่วงหน้าโดยไม่มีค่าธรรมเนียมแอบแฝง ค้นหาตัวเลือกที่เหมาะกับงบประมาณของคุณ ไม่มีเซอร์ไพรส์ มีแต่ราคาที่โปร่งใส"
        },
        {
            topic: "คุณภาพที่รับประกัน",
            description: "ทุกสถานที่แสดงสดบนแพลตฟอร์มของเราได้รับการยืนยันและตรวจสอบ สามารถดูข้อมูลรายละเอียดเกี่ยวกับเวที อุปกรณ์"
        },
        {
            topic: "ปลอดภัยและมั่นใจ",
            description: "จองด้วยความมั่นใจด้วยระบบการชำระเงินที่ปลอดภัยของเรา การชำระเงินของคุณจะได้รับการปกป้องจนกว่าการแสดงของคุณจะเสร็จสิ้น เรารับประกันการจองของคุณ"
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="h-full py-6 pt-10 px-4 md:px-8">
            {topics.map((item, index) => (
                <TopicDetail
                    key={index}
                    topic={item.topic}
                    description={item.description}
                    isOpen={activeIndex === index}
                    index={index}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    )
}

export default TopicCarousel;