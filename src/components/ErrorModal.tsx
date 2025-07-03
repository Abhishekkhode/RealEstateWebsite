import React from 'react';

const ErrorModal = ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
