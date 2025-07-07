// // src/components/ContactSupportModal.tsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Send, CheckCircle2 } from 'lucide-react';

// interface ContactSupportModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ContactSupportModal: React.FC<ContactSupportModalProps> = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate submission logic (e.g., API call)
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setSubmitted(true);
//     setLoading(false);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative"
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: 'spring', stiffness: 300 }}
//           >
//             <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//               <X size={20} />
//             </button>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Support</h2>
//             {!submitted ? (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
//                   <textarea
//                     id="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     rows={4}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//                     placeholder="Explain your issue..."
//                     required
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors`}
//                 >
//                   {loading ? (
//                     <motion.div
//                       className="flex items-center space-x-2"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                     >
//                       <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                       </svg>
//                       <span>Sending...</span>
//                     </motion.div>
//                   ) : (
//                     <>
//                       <Send className="h-5 w-5" />
//                       <span>Send Message</span>
//                     </>
//                   )}
//                 </button>
//               </form>
//             ) : (
//               <div className="text-center">
//                 <motion.div
//                   className="flex flex-col items-center justify-center mb-4"
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ type: 'spring', stiffness: 300 }}
//                 >
//                   <CheckCircle2 className="text-green-600 w-10 h-10 mb-2" />
//                   <p className="text-green-600 font-medium">
//                     Your message has been submitted. Our support team will contact you shortly.
//                   </p>
//                 </motion.div>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ContactSupportModal;



// src/components/ContactSupportModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader } from 'lucide-react'; // Import Loader for loading spinner

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSupportModal: React.FC<ContactSupportModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle'); // 'idle', 'success', 'error'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus('idle'); // Reset status on new submission attempt

    try {
      // NOTE: Ensure your backend Spring Boot application is running on port 8080
      // If your backend is on a different port or domain, adjust the URL accordingly.
      const response = await fetch('http://localhost:8080/api/support/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          message: message,
          type: "admin_support", // CORRECTED: This is now properly inside the JSON payload
        }),
      });

      // Check if the response was successful (HTTP status 2xx)
      if (!response.ok) {
          // If not OK, try to parse JSON for backend error message
          const errorData = await response.json();
          throw new Error(errorData.info || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse the successful response

      if (data.status === 'sent') {
        setSubmissionStatus('success'); // Set success status
        setEmail(''); // Clear form fields on success
        setMessage('');
      } else {
        // This handles cases where backend returns 200 OK but 'status' is not 'sent'
        setSubmissionStatus('error'); // Set error status
        console.error('Backend reported error:', data.info);
        // You can display data.info to the user if it's user-friendly
        // For now, using a generic message or data.info if it's suitable
        alert(`Failed to send message: ${data.info || 'Unknown error from server.'}`);
      }
    } catch (err: any) {
      setSubmissionStatus('error'); // Set error status for network issues or unexpected errors
      console.error('Fetch error:', err);
      alert(`Something went wrong. Please try again later. Error: ${err.message || 'Network error.'}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper to reset and close the modal
  const handleCloseAndReset = () => {
    onClose();
    setSubmissionStatus('idle'); // Reset submission status
    setEmail(''); // Clear form fields
    setMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <button
              onClick={handleCloseAndReset} // Use the new reset handler
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Support</h2>

            <AnimatePresence mode="wait"> {/* Use AnimatePresence for conditional rendering */}
            {submissionStatus === 'success' ? (
                <motion.div
                    key="success-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-10"
                >
                    <CheckCircle2 className="text-green-600 w-16 h-16 mx-auto mb-4" />
                    <p className="text-green-700 text-lg font-medium">
                        Your message has been sent successfully! Our support team will contact you shortly.
                    </p>
                    <button
                        onClick={handleCloseAndReset}
                        className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </motion.div>
            ) : (
              <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Explain your issue..."
                    required
                  ></textarea>
                </div>
                {submissionStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center">
                        Failed to send message. Please check your inputs and try again.
                    </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors`}
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 text-white mr-2" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactSupportModal;