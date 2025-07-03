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














import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ConfirmUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onConfirm is now correctly typed to be an async function
  onConfirm: () => Promise<void>;
}

const ConfirmUpdateModal: React.FC<ConfirmUpdateModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false); // Local state for the button's loading animation

  const handleConfirmClick = async () => {
    setIsLoading(true); // Start loading animation
    try {
      await onConfirm(); // Execute the async confirmation logic from the parent
      // If onConfirm completes successfully, the modal should close itself
      onClose(); // This closes the modal by updating the parent's state
    } catch (error) {
      console.error("Error during confirmation:", error);
      // Optionally: Handle error display within the modal or via a toast/notification system
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
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Confirm Update</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X />
              </button>
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
                onClick={handleConfirmClick} // Call the new async handler
                disabled={isLoading} // Disable the button while loading
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmUpdateModal;