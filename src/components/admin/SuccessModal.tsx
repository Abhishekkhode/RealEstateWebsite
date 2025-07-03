// This is an example, make sure your actual SuccessModal.tsx looks like this or similar.
import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Assuming you use framer-motion

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string; // Optional custom message
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message = "Operation successful!" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        //   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]" // Increased z-index
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
          onClick={onClose} // Allows clicking outside to close
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-lg p-8 shadow-xl max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing modal
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex flex-col items-center justify-center text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
              >
                Okay
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;