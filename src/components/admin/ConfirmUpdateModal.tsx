    // // components/ConfirmUpdateModal.tsx
    // import React from 'react';
    // import { motion, AnimatePresence } from 'framer-motion';
    // import { X } from 'lucide-react';

    // interface ConfirmUpdateModalProps {
    // isOpen: boolean;
    // onClose: () => void;
    // onConfirm: () => void;
    // }

    // const ConfirmUpdateModal: React.FC<ConfirmUpdateModalProps> = ({ isOpen, onClose, onConfirm }) => {
    // return (
    //     <AnimatePresence>
    //     {isOpen && (
    //         <motion.div
    //         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         >
    //         <motion.div
    //             className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
    //             initial={{ y: 50, opacity: 0 }}
    //             animate={{ y: 0, opacity: 1 }}
    //             exit={{ y: 50, opacity: 0 }}
    //             transition={{ type: 'spring', stiffness: 300 }}
    //         >
    //             <div className="flex justify-between items-center mb-4">
    //             <h2 className="text-lg font-semibold text-gray-900">Confirm Update</h2>
    //             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
    //                 <X />
    //             </button>
    //             </div>
    //             <p className="text-gray-700 mb-6">Are you sure you want to update this property?</p>
    //             <div className="flex justify-end space-x-3">
    //             <button
    //                 onClick={onClose}
    //                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
    //             >
    //                 Cancel
    //             </button>
    //             <button
    //                 onClick={onConfirm}
    //                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    //             >
    //                 Yes, Update
    //             </button>
    //             </div>
    //         </motion.div>
    //         </motion.div>
    //     )}
    //     </AnimatePresence>
    // );
    // };

    // export default ConfirmUpdateModal;














// src/components/admin/ConfirmUpdateModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react'; // Import AlertCircle for error state

interface ConfirmUpdateModalProps {
  isOpen: boolean;
  onClose: () => void; // This will now close the *entire* modal, including error state
  onConfirm: () => Promise<void>;
  message: string; // Add this line back
  title: string;
}

const ConfirmUpdateModal: React.FC<ConfirmUpdateModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false); // New state to show error content
  const [currentErrorMessage, setCurrentErrorMessage] = useState(''); // New state for the error message

  // Reset state when the modal opens/closes to ensure a clean slate
  React.useEffect(() => {
    if (isOpen) {
      setShowErrorState(false);
      setCurrentErrorMessage('');
    }
  }, [isOpen]);

  const handleConfirmClick = async () => {
    setIsLoading(true); // Start loading animation
    setShowErrorState(false); // Hide any previous error state
    setCurrentErrorMessage(''); // Clear previous error message

    try {
      await onConfirm(); // Execute the async confirmation logic from the parent
      // If onConfirm succeeds, we rely on the parent (PropertyForm) to
      // trigger the SuccessModal and then call onClose for *this* modal.
      // So, no explicit onClose() here on success.
    } catch (error) {
      console.error("Error during confirmation:", error);
      setCurrentErrorMessage(`Failed to complete the operation: ${error instanceof Error ? error.message : String(error)}`);
      setShowErrorState(true); // Show the error content within this modal
    } finally {
      setIsLoading(false); // Stop loading animation, regardless of success or failure
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative" // Added relative for absolute positioning of error
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Close button for the entire modal */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1">
              <X />
            </button>

            {showErrorState ? (
              // --- Error State Content ---
              <div className="text-center p-4">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Operation Failed!</h2>
                <p className="text-gray-700 mb-6">{currentErrorMessage}</p>
                <button
                  onClick={onClose} // Closes the entire modal
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              // --- Confirmation State Content ---
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Confirm Update</h2>
                  {/* The main close button is now outside this block */}
                </div>
                <p className="text-gray-700 mb-6">Are you sure you want to update this property?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmClick}
                    disabled={isLoading}
                    className={`px-4 py-2 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition`}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Updating...</span>
                      </motion.div>
                    ) : (
                      'Yes, Update'
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmUpdateModal;