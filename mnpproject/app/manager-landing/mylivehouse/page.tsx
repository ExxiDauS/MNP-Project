"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import BackButton from "@/components/buttons/BackButton";
import livehouseFormEdit from "@/components/livehouseEdit/livehouseEditForm";

const mylivehouse = () => {
  const [livehouse, setLivehouse] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchLivehouse = async () => {
      // Check if user is logged in
      if (!user?.user_id) {
        setError("User not logged in");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Fetch bookings for the user
        const response = await fetch(
          `http://localhost:5000/api/livehouse/get-livehouse/${user.user_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch booking data");
        }

        const data = await response.json();

        setLivehouse(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error fetching livehouse:", err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchLivehouse();
    }
  }, [user]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative flex justify-center w-full mt-6 md:mt-16 lg:mt-24 max-w-6xl mx-auto px-0 sm:px-0 md:px-0 mb-10">
        <div className="relative flex flex-col w-full bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl p-6">
          <div className="text-red-600 text-center">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="relative flex justify-self-center w-2/5 mt-24">
        {/* Larger aura effect background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-md rounded-3xl"></div>

        <div className="relative flex flex-col w-full p-8 m-2 bg-custom-background-elevated outline outline-custom-purple-light outline-offset-2 rounded-3xl">
          <BackButton href="/main-landing" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-100">สมัครสมาชิก</h1>
            <p className="mt-2 text-zinc-400">
              กรอกข้อมูลของคุณเพื่อสร้างบัญชีใหม่
            </p>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default mylivehouse;
