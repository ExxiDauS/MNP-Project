import React, { useState } from "react";

// Reusable Popup Component
interface PopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Don't render the popup if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const BookingCard: React.FC = () => {
  const [status, setStatus] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(""); // To store the action (Accept/Decline)
  
  // Function to update booking status (action handler)
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    setShowModal(false); // Hide the modal after confirming
  };

  // Function to handle Accept/Decline button clicks
  const handleActionClick = (actionType: string) => {
    setAction(actionType); // Set the action type (Accept or Decline)
    setShowModal(true); // Show the confirmation modal
  };

  return (
    <div>
      {/* Main Content */}
      <div className="flex justify-end gap-4 p-4 bg-gray-900 rounded-b-lg">
        <button
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2"
          onClick={() => handleActionClick("Accept")}
          disabled={status !== "Pending"}
        >
          Accept
        </button>
        <button
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2"
          onClick={() => handleActionClick("Decline")}
          disabled={status !== "Pending"}
        >
          Decline
        </button>
      </div>

      {/* Popup for confirmation */}
      <Popup
        isOpen={showModal} // Determines if the modal is visible
        title={`Are you sure you want to ${action}?`} // Dynamic title
        message={`You are about to ${action.toLowerCase()} this booking.`} // Dynamic message
        onConfirm={() => updateStatus(action)} // Call the updateStatus function on confirm
        onCancel={() => setShowModal(false)} // Close the modal on cancel
      />
    </div>
  );
};

export default BookingCard;
