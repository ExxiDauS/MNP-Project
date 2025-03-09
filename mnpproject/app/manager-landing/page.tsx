"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

export default function Page() {
  const { user } = useUser();
  const [livehouseExists, setLivehouseExists] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchLivehouseId = async () => {
      try {
        if (!user?.user_id) {
          setLivehouseExists(false);
          return;
        }
        console.log("Fetched livehouseid:", user.user_id);
        // Step 1: Fetch the livehouse ID
        const response = await fetch(`http://localhost:5000/api/livehouse/get-livehouse-userid/${user.user_id}`);
        const data = await response.json();

        const livehouseResponse = await fetch(`http://localhost:5000/api/livehouse/get-livehouse/${data.livehouse_id}`);
        
        if (livehouseResponse.ok) {
          setLivehouseExists(true);
        } else {
          setLivehouseExists(false);
        }
  
      } catch (error) {
        console.error("Error fetching livehouse:", error);
        setLivehouseExists(false);
      }
    };
  
    fetchLivehouseId();
  }, [user]);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-secondary">
      <h1 className="text-4xl font-bold mb-4">สวัสดี, {user?.username || 'Guest'} </h1>
      {livehouseExists === false ? (
        // If no livehouse exists, show this message and button
        <div className="text-center">
          <p className="text-lg text-red-500 mb-10">ตอนนี้คุณยังไม่มี Livehouse</p>
          <Link
            href="/createLivehouse"
            className="p-6 border rounded-lg hover:bg-gray-50 hover:text-primary"
          >
            + สร้าง Livehouse
          </Link>
        </div>
      ) : (
        // If livehouse exists, show the menu
        <div className="w-full max-w-2xl">
          <center><p className="mb-8 ">ยินดีต้อนรับเข้าสู่หน้าหลักของผู้จัดการ! เลือกเมนูด้านล่างเพื่อดำเนินการต่างๆ</p></center>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/manager-landing/pending"
              className="p-6 border rounded-lg hover:bg-gray-50 hover:text-primary"
            >
              <h2 className="text-2xl font-semibold mb-2">การจอง</h2>
              <p>เช็คและจัดการการจองที่เข้ามา รวมถึงการอนุมัติหรือปฏิเสธการจอง</p>
            </Link>
            <Link
              href="/manager-landing/Calendar"
              className="p-6 border rounded-lg hover:bg-gray-50 hover:text-primary"
            >
              <h2 className="text-2xl font-semibold mb-2">ปฏิทิน</h2>
              <p>ดูข้อมูลการจองในรูปแบบปฏิทิน เพื่อให้คุณสามารถติดตามเหตุการณ์ต่างๆ ได้อย่างสะดวก</p>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
