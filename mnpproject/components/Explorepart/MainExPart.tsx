"use client";
import React, { useEffect, useState } from "react";
import ExploreCardContainer from "./ExploreCardContainer";
import CSearchBar from "../CustomSearchBar/CSearchBar";
import livehousesData from "@/public/data/livehouses.json";

const livehouses = livehousesData.livehouses;

const MainExPart = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // ใช้ useState เพื่อเก็บค่าข้อความที่ผู้ใช้ป้อนลงในแถบค้นหา ส่วน setSearchQuery ใช้สำหรับอัปเดตค่าของ searchQuery
  const [filteredLivehouses, setFilteredLivehouses] = useState(livehouses); // ใช้ useState เพื่อเก็บค่าข้อมูล livehouses ที่ผ่านการกรองจากการค้นหา ค่าเริ่มต้นเป็นข้อมูลทั้งหมดของ livehouses

  // Function to handle search input
  const handleSearch = (query: string) => { // ฟังก์ชันที่ใช้จัดการการค้นหาโดยรับ query (ข้อความที่ผู้ใช้ป้อน)
    setSearchQuery(query); // อัปเดตค่า searchQuery ด้วยค่าที่รับมา
    const filtered = livehouses.filter((livehouse) =>
      livehouse.name.toLowerCase().includes(query.toLowerCase()) // ใช้ filter() เพื่อคัดกรองเฉพาะ livehouses ที่มี name ตรงกับข้อความที่ผู้ใช้ป้อน
    );
    setFilteredLivehouses(filtered); // อัปเดตค่า filteredLivehouses ให้เป็นข้อมูลที่กรองแล้ว
  };

  return (
    <>
      {/* Topic */}

      {/* Search Bar */}
      <div className="my-4 flex justify-center">
        <CSearchBar
          handleSearch={handleSearch}
          placeholder="Search livehouses..."
        />
      </div>

      {/* Popular Livehouse showcase */}
      <section className="pb-4 mt-6">
        <ExploreCardContainer data={filteredLivehouses} cardSize={220} />
      </section>
    </>
  );
};

export default MainExPart;
