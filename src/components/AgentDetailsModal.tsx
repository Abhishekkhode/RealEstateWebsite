import React from 'react';
import { motion, AnimatePresence, Variants as FramerVariants, Transition } from 'framer-motion';
import { FiPhone as Phone, FiMail as Mail, FiClock as Clock } from 'react-icons/fi';
import { RiMedalFill } from 'react-icons/ri';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AgentDetailsModalProps {
  agent: {
    id: string;
    agentName: string;
    agentPhone: string;
    agentEmail: string;
    agentPhoto?: string;
    company?: string;
    representative?: string;
    Tgreranumber: string;
  };
  onClose: () => void;
  onNextAgent?: () => void;
  onPrevAgent?: () => void;
  // This 'direction' prop should be passed from the parent component
  // when navigating (e.g., 1 for next, -1 for previous).
  // If not provided by parent, it defaults to 0 (no specific direction).
  direction?: number; 
}

const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, onClose, onNextAgent, onPrevAgent, direction = 0 }) => {

  // Define animation variants for sliding content
  const slideContentVariants: FramerVariants = {
    // Enters from right if direction is positive (next), from left if negative (prev)
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    // Stays in center
    center: {
      x: '0%',
      opacity: 1,
    },
    // Exits to left if direction is positive (next), to right if negative (prev)
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // Define the transition for the sliding content
  const slideContentTransition: Transition = {
    x: { type: "spring", stiffness: 300, damping: 30 }, // Spring for X movement
    opacity: { duration: 0.2, ease: "easeOut" },       // Tween for opacity
  };

  return (
    // Outermost div: Full-screen overlay.
    // `overflow-y-auto` ensures the entire modal can scroll if content makes it taller than viewport.
    // `flex justify-center` centers horizontally. `p-4 sm:p-6 md:p-8` provides responsive padding.
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4 sm:p-6 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.3 }}
        // The main modal card.
        // `my-auto` provides vertical centering when content fits, and aligns for scrolling when it overflows.
        // `flex flex-col` is CRUCIAL for children to stack vertically and allow proper `flex-grow`.
        // `overflow-hidden` here is generally fine for card corners, as the outer div handles scroll.
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden flex flex-col my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-full transition-colors text-2xl font-bold z-20"
          aria-label="Close"
        >
          ×
        </button>

        {/* Navigation Arrows */}
        {onPrevAgent && (
          <button
            onClick={onPrevAgent}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white border shadow p-2 rounded-full hover:bg-gray-100 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous Agent"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        {onNextAgent && (
          <button
            onClick={onNextAgent}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white border shadow p-2 rounded-full hover:bg-gray-100 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next Agent"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Content Wrapper for AnimatePresence */}
        {/* `flex-grow` allows this div to take available vertical space. */}
        {/* `overflow-hidden` ensures the sliding content stays within its bounds during animation. */}
        {/* Removed `minHeight` to allow natural content height. */}
        <div className="flex-grow mt-8 mb-4 overflow-hidden">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={agent.id} // Crucial for Framer Motion to detect content change and trigger animation
              variants={slideContentVariants} // Apply sliding variants
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction} // Pass the direction prop to variants
              transition={slideContentTransition} // Apply combined transition
              // This div holds the actual agent details.
              // `absolute inset-0` was removed to allow natural flow and height.
              // `flex flex-col` is essential here to stack agent info and details vertically.
              className="flex flex-col"
            >
              {/* Agent Info (Photo, Name, Company) */}
              <div className="flex flex-col items-center mb-6 text-center"> {/* Added text-center for consistency */}
                {agent.agentPhoto && (
                  <img
                    src={agent.agentPhoto}
                    alt={agent.agentName}
                    className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg border-4 border-blue-100"
                  />
                )}
                <h2 className="text-2xl font-bold mb-1 text-blue-800">{agent.agentName}</h2>
                {agent.company && <p className="text-gray-600">{agent.company}</p>}
                {agent.representative && <p className="text-gray-600">{agent.representative}</p>}
              </div>

              {/* Agent Details (RERA, Phone, Email, Hours) */}
              {/* Removed `flex-grow` here, as the content should take its natural height. */}
              {/* No `overflow` or `scrollbar` classes, so no internal scrollbar. */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <RiMedalFill className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">TG RERA Certified</h4>
                    <motion.span whileHover={{ scale: 1.1 }} className="text-gray-600 text-sm md:text-base inline-block">
                      {agent.Tgreranumber}
                    </motion.span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={`tel:${agent.agentPhone}`}
                      className="text-blue-700 hover:underline text-base md:text-lg block"
                    >
                      {agent.agentPhone}
                    </motion.a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={`mailto:${agent.agentEmail}`}
                      className="text-blue-700 hover:underline text-base md:text-lg block"
                    >
                      {agent.agentEmail}
                    </motion.a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      Monday - Friday: 9:00 AM - 7:00 PM<br />
                      Saturday: 10:00 AM - 5:00 PM<br />
                      Sunday: 12:00 PM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AgentDetailsModal;




// // WORKING FINAL MODAL
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiPhone as Phone, FiMail as Mail, FiClock as Clock } from 'react-icons/fi';
// import { RiMedalFill } from 'react-icons/ri';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface AgentDetailsModalProps {
//   agent: {
//     id: string;
//     agentName: string;
//     agentPhone: string;
//     agentEmail: string;
//     agentPhoto?: string;
//     company?: string;
//     representative?: string;
//     Tgreranumber: string;
//   };
//   onClose: () => void;
//   onNextAgent?: () => void;
//   onPrevAgent?: () => void;
// }

// const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, onClose, onNextAgent, onPrevAgent }) => {
//   // Define animation variants for the agent details
//   const contentVariants = {
//     initial: { x: '100%', opacity: 0 }, // Starts off to the right, hidden
//     animate: { x: '0%', opacity: 1 },    // Slides to center, fades in
//     exit: { x: '-100%', opacity: 0 },    // Slides to the left, fades out
//     transition: { type: "tween", duration: 0.3 }
//   };

//   // Variants for sliding in from the left when navigating back
//   const contentVariantsPrev = {
//     initial: { x: '-100%', opacity: 0 }, // Starts off to the left, hidden
//     animate: { x: '0%', opacity: 1 },    // Slides to center, fades in
//     exit: { x: '100%', opacity: 0 },     // Slides to the right, fades out
//     transition: { type: "tween", duration: 0.3 }
//   };

//   const [direction, setDirection] = React.useState(0); // 0: no change, 1: next, -1: prev
//   const currentAgentIdRef = React.useRef(agent.id);

//   React.useEffect(() => {
//     // Determine direction when agent.id changes
//     if (agent.id !== currentAgentIdRef.current) {
//       // This is a simplified logic. For a robust solution, you might need
//       // to compare current agent's index with previous agent's index.
//       // For sequential next/prev, this often works:
//       // If the new ID is "greater" than the old ID (assuming IDs are sequential or sortable)
//       // or if you have access to the agent list in this component, you could compare indices.
//       // For now, let's assume if agent.id changes, it's a "next" by default unless explicitly clicked "prev"
//       // This is tricky without knowing the exact sequence or having the full agent list here.

//       // A more robust way to handle direction:
//       // PropertyModal should pass the direction (or the new index vs old index) to AgentDetailsModal.
//       // For the scope of this example, let's make a simple assumption or rely on the button click handling.

//       // As a fallback, if we just update the key, framer-motion will treat it as a new component
//       // and apply the default 'initial' and 'exit' transitions.
//       // To truly control direction, the parent (PropertyModal) should pass a 'direction' prop.
//       // For this immediate fix, we'll remove the `isForward` check and always use one variant
//       // or rely on `key` and default behavior.

//       // Let's refine the direction setting in PropertyModal to pass it down properly.
//       // For now, if we cannot get explicit direction, we'll default to a generic fade/slide.
//     }
//     currentAgentIdRef.current = agent.id;
//   }, [agent.id]);

//   // Remove the isForward logic from here, as it's hard to accurately infer direction
//   // without more context or props from the parent. We will use a single variant
//   // and let AnimatePresence handle the enter/exit.

//   // Let's define a single set of variants that works for both directions,
//   // or simplify the variants to a fade-in/fade-out if direction is not reliably passed.
//   const mainContentVariants = {
//     initial: { opacity: 0, scale: 0.95 },
//     animate: { opacity: 1, scale: 1 },
//     exit: { opacity: 0, scale: 0.95 },
//     transition: { duration: 0.25, ease: "easeOut" }
//   };


//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.85 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.85 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
//       >
//         {/* Left Arrow */}
//         {onPrevAgent && (
//           <button
//             onClick={onPrevAgent}
//             className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border shadow p-2 rounded-full hover:bg-gray-100 z-10"
//             aria-label="Previous Agent"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//         )}

//         {/* Right Arrow */}
//         {onNextAgent && (
//           <button
//             onClick={onNextAgent}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border shadow p-2 rounded-full hover:bg-gray-100 z-10"
//             aria-label="Next Agent"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         )}

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-full transition-colors text-2xl font-bold"
//           aria-label="Close"
//         >
//           ×
//         </button>

//         {/* Content wrapper with a defined min-height to prevent collapse */}
//         {/* We need a div to hold the AnimatePresence and give it a structure */}
//         <div className="relative" style={{ minHeight: '400px' }}> {/* Adjust minHeight as needed */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={agent.id} // Crucial for framer-motion to detect changes
//               variants={mainContentVariants} // Using a single set of variants for simplicity
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               // No 'absolute inset-0' here. Let it flow normally within the parent div.
//               // We'll let the outer p-8 handle the spacing.
//             >
//               {/* Agent Info */}
//               <div className="flex flex-col items-center mb-6">
//                 {agent.agentPhoto && (
//                   <img
//                     src={agent.agentPhoto}
//                     alt={agent.agentName}
//                     className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg border-4 border-blue-100"
//                   />
//                 )}
//                 <h2 className="text-2xl font-bold mb-1 text-blue-800">{agent.agentName}</h2>
//                 {agent.company && <p className="text-gray-600">{agent.company}</p>}
//                 {agent.representative && <p className="text-gray-600">{agent.representative}</p>}
//               </div>

//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-3 rounded-lg mr-4">
//                     <RiMedalFill className="h-6 w-6 text-blue-700" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-1">TG RERA Certified</h4>
//                     <motion.span whileHover={{ scale: 1.1 }} className="text-gray-600">
//                       {agent.Tgreranumber}
//                     </motion.span>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-3 rounded-lg mr-4">
//                     <Phone className="h-6 w-6 text-blue-700" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
//                     <motion.a
//                       whileHover={{ scale: 1.05 }}
//                       href={`tel:${agent.agentPhone}`}
//                       className="text-blue-700 hover:underline text-base"
//                     >
//                       {agent.agentPhone}
//                     </motion.a>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-3 rounded-lg mr-4">
//                     <Mail className="h-6 w-6 text-blue-700" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
//                     <motion.a
//                       whileHover={{ scale: 1.05 }}
//                       href={`mailto:${agent.agentEmail}`}
//                       className="text-blue-700 hover:underline text-base"
//                     >
//                       {agent.agentEmail}
//                     </motion.a>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-3 rounded-lg mr-4">
//                     <Clock className="h-6 w-6 text-blue-700" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
//                     <p className="text-gray-600">
//                       Monday - Friday: 9:00 AM - 7:00 PM<br />
//                       Saturday: 10:00 AM - 5:00 PM<br />
//                       Sunday: 12:00 PM - 4:00 PM
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AgentDetailsModal;



// // DETAILS MODEL 3
// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaAward, FaBuilding, FaCertificate } from 'react-icons/fa';
// import { FiPhone as Phone, FiMail as Mail, FiClock as Clock } from 'react-icons/fi';
// import { BiSolidCertification } from 'react-icons/bi';
// import { VerifiedIcon } from 'lucide-react';
// import { MdApproval, MdVerified, MdWorkspacePremium } from 'react-icons/md';
// import { FaCircleCheck } from 'react-icons/fa6';
// import { BsPatchCheckFill, BsShieldCheck } from 'react-icons/bs';
// import { HiBadgeCheck, HiShieldCheck } from 'react-icons/hi';
// import { RiMedal2Fill, RiMedal2Line, RiMedalFill, RiVerifiedBadgeFill } from 'react-icons/ri';
// import { GrAchievement, GrShare, GrShield, GrValidate } from 'react-icons/gr';
// import { GiRibbonMedal } from 'react-icons/gi';

// interface AgentDetailsModalProps {
//   agent: {
//     name: string;
//     phone: string;
//     email: string;
//     photo?: string;
//     company?: string;
//     representative?: string;
//     reranum?: string;
//     agentId?: string;
//   };
//   onClose: () => void;
// }

// const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <motion.div
//       initial={{ opacity: 0, scale: 0.85 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.85 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
//     >
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-full transition-colors text-2xl font-bold"
//         aria-label="Close"
//       >
//         ×
//       </button>
//       <div className="flex flex-col items-center mb-6">
//         {agent.photo && (
//           <img src={agent.photo} alt={agent.name} className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg border-4 border-blue-100" />
//         )}
//         <h2 className="text-2xl font-bold mb-1 text-blue-800">{agent.name}</h2>
//         {agent.company && <p className="text-gray-600">{agent.company}</p>}
//         {agent.representative && <p className="text-gray-600">{agent.representative}</p>}
//       </div>
//       <div className="space-y-6">
//         {/* Company Details */}
//         <div className="flex items-start">
//           <div className="bg-blue-100 p-3 rounded-lg mr-4">
//             {/* Here are the Badge Icons that can be used 
//             VerifiedIcon,
//             MdVerified,
//             MdWorkspacePremium:::
//             FaAward ::
//             BsShieldCheck :::
//             RiMedalFill ::
//             GrValidate:::*/}
//             <RiMedalFill className="h-6 w-6 text-blue-700" />
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-1">TG RERA Certified</h4>
//             <motion.a
//               whileHover={{ scale: 1.1 }}
//             //   href={`mailto:${agent.email}`}
//               className="text-gray-600"
//             >
//               {agent.reranum}
//             </motion.a>
//           </div>
//         </div>


//         {/* Phone Details */}
//         <div className="flex items-start">
//           <div className="bg-blue-100 p-3 rounded-lg mr-4">
//             <Phone className="h-6 w-6 text-blue-700" />
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
//             <motion.a
//             whileHover={{ scale: 2.2 }}
//             href={`tel:${agent.phone}`}
//             className="text-blue-700 hover:underline text-base"
//             >
//               {agent.phone}
//             </motion.a>
//           </div>
//         </div>
//         {/* Email */}
//         <div className="flex items-start">
//           <div className="bg-blue-100 p-3 rounded-lg mr-4">
//             <Mail className="h-6 w-6 text-blue-700" />
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
//             <motion.a
//               whileHover={{ scale: 1.1 }}
//               href={`mailto:${agent.email}`}
//               className="text-blue-700 hover:underline text-base"
//             >
//               {agent.email}
//             </motion.a>
//           </div>
//         </div>
//         {/* Business Hours */}
//         <div className="flex items-start">
//           <div className="bg-blue-100 p-3 rounded-lg mr-4">
//             <Clock className="h-6 w-6 text-blue-700" />
//           </div>
//           <div>
//             <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
//             <p className="text-gray-600">
//               Monday - Friday: 9:00 AM - 7:00 PM<br />
//               Saturday: 10:00 AM - 5:00 PM<br />
//               Sunday: 12:00 PM - 4:00 PM
//             </p>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   </div>
// );

// export default AgentDetailsModal;