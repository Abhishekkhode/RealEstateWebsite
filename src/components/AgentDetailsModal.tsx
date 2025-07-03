// DETAILS MODEL 1

// import React from 'react';
// interface AgentDetailsModalProps {
//   agent: {
//     name: string;
//     phone: string;
//     email: string;
//     photo?: string;
//   };
//   onClose: () => void;
// }

// const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative">
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
//         aria-label="Close"
//       >
//         ×
//       </button>
//       <div className="flex flex-col items-center">
//         {agent.photo && (
//           <img src={agent.photo} alt={agent.name} className="w-20 h-20 rounded-full mb-4 object-cover" />
//         )}
//         <h2 className="text-xl font-bold mb-2">{agent.name}</h2>
//         <p className="mb-1"><strong>Phone:</strong> {agent.phone}</p>
//         <p className="mb-1"><strong>Email:</strong> {agent.email}</p>
//       </div>
//     </div>
//   </div>
// );

// export default AgentDetailsModal;




// DETAILS MODEL 2
// import React from 'react';

// interface AgentDetailsModalProps {
//   agent: {
//     name: string;
//     phone: string;
//     email: string;
//     photo?: string;
//   };
//   onClose: () => void;
// }

// const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
//     <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 relative transition-transform duration-300 scale-95 animate-popup">
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-full transition-colors text-2xl font-bold"
//         aria-label="Close"
//       >
//         ×
//       </button>
//       <div className="flex flex-col items-center">
//         {agent.photo && (
//           <img src={agent.photo} alt={agent.name} className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg border-4 border-blue-100" />
//         )}
//         <h2 className="text-2xl font-bold mb-2 text-blue-800">{agent.name}</h2>
//         <p className="mb-1 text-gray-700"><strong>Phone:</strong> {agent.phone}</p>
//         <p className="mb-1 text-gray-700"><strong>Email:</strong> {agent.email}</p>
//       </div>
//     </div>
//     <style>
//       {`
//         .animate-fade-in {
//           animation: fadeInBg 0.3s;
//         }
//         @keyframes fadeInBg {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-popup {
//           animation: popupScale 0.3s;
//         }
//         @keyframes popupScale {
//           from { transform: scale(0.8); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }
//       `}
//     </style>
//   </div>
// );

// export default AgentDetailsModal;



// DETAILS MODEL 3
import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaBuilding, FaCertificate } from 'react-icons/fa';
import { FiPhone as Phone, FiMail as Mail, FiClock as Clock } from 'react-icons/fi';
import { BiSolidCertification } from 'react-icons/bi';
import { VerifiedIcon } from 'lucide-react';
import { MdApproval, MdVerified, MdWorkspacePremium } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';
import { BsPatchCheckFill, BsShieldCheck } from 'react-icons/bs';
import { HiBadgeCheck, HiShieldCheck } from 'react-icons/hi';
import { RiMedal2Fill, RiMedal2Line, RiMedalFill, RiVerifiedBadgeFill } from 'react-icons/ri';
import { GrAchievement, GrShare, GrShield, GrValidate } from 'react-icons/gr';
import { GiRibbonMedal } from 'react-icons/gi';

interface AgentDetailsModalProps {
  agent: {
    name: string;
    phone: string;
    email: string;
    photo?: string;
    company?: string;
    representative?: string;
    reranum?: string;
  };
  onClose: () => void;
}

const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-full transition-colors text-2xl font-bold"
        aria-label="Close"
      >
        ×
      </button>
      <div className="flex flex-col items-center mb-6">
        {agent.photo && (
          <img src={agent.photo} alt={agent.name} className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg border-4 border-blue-100" />
        )}
        <h2 className="text-2xl font-bold mb-1 text-blue-800">{agent.name}</h2>
        {agent.company && <p className="text-gray-600">{agent.company}</p>}
        {agent.representative && <p className="text-gray-600">{agent.representative}</p>}
      </div>
      <div className="space-y-6">
        {/* Company Details */}
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            {/* Here are the Badge Icons that can be used 
            VerifiedIcon,
            MdVerified,
            MdWorkspacePremium:::
            FaAward ::
            BsShieldCheck :::
            RiMedalFill ::
            GrValidate:::*/}
            <RiMedalFill className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">TG RERA Certified</h4>
            <motion.a
              whileHover={{ scale: 1.1 }}
            //   href={`mailto:${agent.email}`}
              className="text-gray-600"
            >
              {agent.reranum}
            </motion.a>
          </div>
        </div>


        {/* Phone Details */}
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Phone className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
            <motion.a
            whileHover={{ scale: 2.2 }}
            href={`tel:${agent.phone}`}
            className="text-blue-700 hover:underline text-base"
            >
              {agent.phone}
            </motion.a>
          </div>
        </div>
        {/* Email */}
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Mail className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={`mailto:${agent.email}`}
              className="text-blue-700 hover:underline text-base"
            >
              {agent.email}
            </motion.a>
          </div>
        </div>
        {/* Business Hours */}
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Clock className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 7:00 PM<br />
              Saturday: 10:00 AM - 5:00 PM<br />
              Sunday: 12:00 PM - 4:00 PM
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

export default AgentDetailsModal;