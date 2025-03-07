import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Check,
  Clock,
  Mic,
  Guitar,
  Drum,
  Speaker,
  Music,
  Keyboard,
  X,
} from "lucide-react";
import { BookingData } from "@/app/artist-booking-list/page";
import { Facilities } from "@/app/artist-booking-list/page";

interface BookingHistoryCardProps {
  booking: BookingData;
}

const BookingHisButManager: React.FC<BookingHistoryCardProps> = ({
  booking,
}) => {
  const [livehouseName, setLivehouseName] = useState<string>("");
  const [status, setStatus] = useState<string>(booking.bookingInfo.status);
  const [userProfile, setUserProfile] = useState<any>(null); // To store user profile data
  const [loadingUser, setLoadingUser] = useState<boolean>(false); // To manage loading state for user fetch

  useEffect(() => {
    const fetchLivehouseName = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/livehouse/get-livehouse/${booking.bookingInfo.livehouse_id}`
        );
        const data = await response.json();
        setLivehouseName(data.name);
      } catch (error) {
        console.error("Error fetching livehouse name:", error);
      }
    };

    fetchLivehouseName();
  }, [booking.bookingInfo.livehouse_id]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (booking.bookingInfo.user_id) {
        setLoadingUser(true);
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/profile/${booking.bookingInfo.user_id}`
          );
          const data = await response.json();
          setUserProfile(data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoadingUser(false);
        }
      }
    };

    fetchUserProfile();
  }, [booking.bookingInfo.user_id]);

  const updateStatus = async (newStatus: "Accept" | "Decline") => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reserve/change-status/${booking.bookingInfo.booking_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      setStatus(newStatus); // Update status in UI
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const formatDateTime = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const calculateDuration = (): string => {
    const start = new Date(booking.bookingInfo.start_time);
    const end = new Date(booking.bookingInfo.end_time);
    const durationMs = end.getTime() - start.getTime();
    return (durationMs / (1000 * 60 * 60)).toFixed(1);
  };

  const selectedFacilities = Object.entries(booking.facilities)
    .filter(([_, value]) => value === 1)
    .map(([facility]) => facility as keyof Facilities);

  const getStatusBadgeClass = () => {
    switch (status) {
      case "Accept":
        return "bg-green-700 hover:bg-green-800";
      case "Decline":
        return "bg-red-600 hover:bg-red-700";
      case "Pending":
      default:
        return "bg-yellow-600 hover:bg-yellow-700";
    }
  };

  if (!booking.bookingInfo.payment_proof) {
    return null;
  }

  return (
    <Card className="w-full mx-0 my-4 border border-custom-purple-deeper bg-gradient-card shadow-md">
      <div className="flex justify-between items-center bg-custom-purple-deeper p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-white">{livehouseName}</h2>
        <div className="flex gap-2">
          <Badge className={getStatusBadgeClass() + " py-1 px-3"}>
            {status}
          </Badge>
          <Badge className="bg-green-700 hover:bg-green-800 py-1 px-3">
            <Check className="mr-1 h-4 w-4" /> Paid
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="text-white">
            <div className="flex items-center mb-2">
              <Clock className="mr-2 h-5 w-5 text-indigo-300" />
              <span className="font-semibold">Time Slot</span>
            </div>
            <div className="ml-7 space-y-1">
              <div>
                {formatDateTime(booking.bookingInfo.start_time)} -{" "}
                {formatDateTime(booking.bookingInfo.end_time)}
              </div>
              <div className="text-sm text-gray-400">
                {calculateDuration()} hours
              </div>
            </div>
          </div>

          <div className="text-white">
            <div className="flex items-center mb-2">
              <div className="mr-2 h-5 w-5 text-indigo-300 flex items-center justify-center font-bold">
                ฿
              </div>
              <span className="font-semibold">Total Price</span>
            </div>
            <div className="ml-7">{booking.bookingInfo.total_price} THB</div>
          </div>
        </div>

        <div className="text-white">
          <div className="font-semibold mb-3">Facilities</div>
          <div className="flex flex-wrap gap-2">
            {selectedFacilities.includes("mic") && (
              <Badge className="bg-[#1a1e2c] border border-indigo-800 py-1.5 px-3">
                <Mic className="mr-1.5 h-4 w-4" /> Mic
              </Badge>
            )}
            {selectedFacilities.includes("guitar") && (
              <Badge className="bg-[#1a1e2c] border border-indigo-800 py-1.5 px-3">
                <Guitar className="mr-1.5 h-4 w-4" /> Guitar
              </Badge>
            )}
            {selectedFacilities.includes("bass") && (
              <Badge className="bg-[#1a1e2c] border border-indigo-800 py-1.5 px-3">
                <Music className="mr-1.5 h-4 w-4" /> Bass
              </Badge>
            )}
            {selectedFacilities.includes("drum") && (
              <Badge className="bg-[#1a1e2c] border border-indigo-800 py-1.5 px-3">
                <Drum className="mr-1.5 h-4 w-4" /> Drum
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      {status === "Pending" && (
        <div className="flex justify-end gap-4 p-4 bg-gray-900 rounded-b-lg">
          <Button
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2"
            onClick={() => updateStatus("Accept")}
          >
            <Check className="mr-2 h-4 w-4" /> Accept
          </Button>
          <Button
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2"
            onClick={() => updateStatus("Decline")}
          >
            <X className="mr-2 h-4 w-4" /> Decline
          </Button>
        </div>
      )}

      {/* Display user profile if loaded */}
      {loadingUser ? (
        <div className="text-center text-gray-400">Loading user profile...</div>
      ) : userProfile ? (
        <div className="text-white mt-4">
          <h3 className="font-semibold">User Profile:</h3>
          <p>Name: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
        </div>
      ) : (
        <div className="text-center text-red-500">User not found</div>
      )}

    </Card>
  );
};

export default BookingHisButManager;
