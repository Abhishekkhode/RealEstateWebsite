// import React from 'react';
// import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, VerifiedIcon, Youtube, Link } from 'lucide-react';
// import { FaBuilding, FaCertificate, FaPhoneAlt, FaUser } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { SiFacebook, SiLinkedin, SiLinphone, SiMailboxdotorg, SiMailchimp, SiMaildotcom, SiMaildotru, SiMailgun, SiMailtrap, SiMapillary, SiPhonepe, SiTmobile, SiYoutube } from "react-icons/si";



// export const Footer: React.FC = () => {
//   return (
//     // <footer className="bg-gray-900 text-white">
//     //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//     //     {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"> */}
//     //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-8">
//     //       {/* Company Info */}
//     //       <div>
//     //         <div className="flex items-center space-x-2 mb-4">
//     //           <Home className="h-8 w-8 text-blue-400" />
//     //           <a href="#" className="text-white text-2xl font-bold hover:text-blue-400 transition-colors">
//     //           <span className="text-xl font-bold">Surya Property Consultant</span>
//     //           </a>
//     //         </div>
//     //         <p className="text-gray-300 mb-4 leading-relaxed">
//     //           Your trusted partner in finding the perfect property. We combine expertise, 
//     //           technology, and personalized service to deliver exceptional real estate experiences.
//     //         </p>
//     //         <div className="flex space-x-4">
//     //           <motion.a whileHover={{ scale: 1.1 }} href="https://www.facebook.com/profile.php?id=100090389815172" target="_blank" rel="noopener noreferrer">
//     //           <SiFacebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//     //           </motion.a>
//     //           <motion.a whileHover={{ scale: 1.1 }} href="tel:+917989114553" target="_blank" rel="noopener noreferrer">
//     //           <FaPhoneAlt className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//     //           </motion.a>
//     //           <motion.a whileHover={{ scale: 1.1 }} href="mailto:'suryapropertyconsultant.info@gmail.com'" target="_blank" rel="noopener noreferrer">
//     //           <SiMaildotru className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//     //           </motion.a>
//     //           {/* <Youtube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" /> */}
//     //           <motion.a whileHover={{ scale: 1.1 }} href="https://www.youtube.com/@SuryaPropertyConsultant" target="_blank" rel="noopener noreferrer">
//     //           <SiYoutube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//     //         </motion.a>
//     //         </div>
//     //       </div>

//     //       {/* Quick Links */}
//     //       <div>
//     //         <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//     //         <ul className="space-y-2">
//     //           <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Properties</motion.a></li>
//     //           <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Sale</motion.a></li>
//     //           <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Rent</motion.a></li>
//     //           <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Commercial</motion.a></li>
//     //           <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Investment</motion.a></li>
//     //         </ul>
//     //       </div>

//     //       {/* Services */}
//     //       <div>
//     //         <h3 className="text-lg font-semibold mb-4">Services</h3>
//     //         <ul className="space-y-2">
//     //           <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Valuation</a></li>
//     //           <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Market Analysis</a></li>
//     //           <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Management</a></li>
//     //           <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investment Consulting</a></li>
//     //           <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Legal Support</a></li>
//     //         </ul>
//     //       </div>

//     //       {/* Developers Info - NEW SECTION */}
//     //       <div>
//     //         <h3 className="text-lg font-semibold mb-4">Developers Info</h3>
//     //         <div className="space-y-3">
//     //           <div className="flex items-center">
//     //             <span className="text-gray-300 text-sm">
//     //               Developed by <strong>Abhishek</strong>
//     //             </span>
//     //           </div>
//     //           <div className="flex items-center">
//     //             <Mail className="h-4 w-4 mr-2 text-blue-400" />
//     //             <a href="mailto:abhishkekhode@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm">
//     //               abhishkekhode@gmail.com
//     //             </a>
//     //           </div>
//     //           <div className="flex items-center">
//     //             {/* <Link className="h-4 w-4 mr-2 text-blue-400" />
//     //             <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
//     //               yourwebsite.com
//     //             </a> */}
//     //             <SiLinkedin className="h-4 w-4 mr-2 text-blue-400" />
//     //             <a href="https://www.linkedin.com/in/abhishek-khode-1650372a0/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
//     //               Abhi 
//     //             </a>
//     //           </div>
//     //         </div>
//     //       </div>

//     //       {/* Contact Info */}
//     //       <div>
//     //         <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
//     //         <div className="space-y-3">
//     //           <div className="flex items-center">
//     //             <FaBuilding className="h-4 w-4 mr-2 text-blue-400" />
//     //             <span className="text-gray-300 text-sm">Surya Property Consultant</span>
//     //           </div>
//     //           <div className="flex items-center">
//     //             <FaUser className="h-4 w-4 mr-2 text-blue-400" />
//     //             <span className="text-gray-300 text-sm">Anand Baradi</span>
//     //           </div>
//     //           <div className="flex items-center">
//     //             <VerifiedIcon className="h-4 w-4 mr-2 text-blue-400" />
//     //             <span className="text-gray-300 text-sm">TG RERA No. : A02200002962.</span>
//     //           </div>
              
//     //           <div className="flex items-center">
//     //             <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
//     //             <Phone className="h-4 w-4 mr-2 text-blue-400" />
//     //               <a href='tel:+917989114553' className="text-400 hover:text-white transition-colors">
//     //             <span className="text-gray-300 text-sm">+91 79891 14553</span>
//     //               </a>
//     //             </motion.div>
//     //           </div>

              
//     //           <div className="flex items-center">
//     //             <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
//     //             <Mail className="h-4 w-4 mr-2 text-blue-400" />
//     //               <a href="mailto:suryapropertyconsultant.info@gmail.com" className="text-400 hover:text-white transition-colors">
//     //             <span className="text-gray-300 text-sm">suryapropertyconsultant.info@gmail.com</span>
//     //               </a>
//     //             </motion.div>
//     //           </div>
//     //         </div>
            
//     //         {/* <div className="mt-6">
//     //           <h4 className="font-semibold mb-2">Business Hours</h4>
//     //           <p className="text-gray-300 text-sm">
//     //             Mon-Fri: 9:00 AM - 7:00 PM<br />
//     //             Sat: 10:00 AM - 5:00 PM<br />
//     //             Sun: 12:00 PM - 4:00 PM
//     //           </p>
//     //         </div> */}
//     //       </div>
//     //     </div>

//     //     {/* Bottom Bar */}
//     //     <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//     //       <div className="flex flex-col md:flex-row justify-between items-center">
//     //         <p className="text-gray-400 text-sm">
//     //           © 2025 Surya Property Consultant. All rights reserved.
//     //         </p>
//     //         <div className="flex space-x-6 mt-4 md:mt-0">
//     //           <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
//     //           <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
//     //           <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </footer>










//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/*
//           Grid container for footer sections:
//           - grid-cols-1: Stacks all columns on mobile (default)
//           - md:grid-cols-2: Arranges into 2 columns on medium screens (tablets)
//           - lg:grid-cols-[1.5fr_repeat(4,1fr)]: Arranges into 5 columns on large screens (PC),
//             giving the first column more space for better visual balance.
//         */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-8">
//           {/* Company Info */}
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Home className="h-8 w-8 text-blue-400" />
//               <a href="#" className="text-white text-2xl font-bold hover:text-blue-400 transition-colors">
//               <span className="text-xl font-bold">ELITE ESTATES</span>
//               </a>
//             </div>
//             <p className="text-gray-300 mb-4 leading-relaxed">
//               Your trusted partner in finding the perfect property. We combine expertise, 
//               technology, and personalized service to deliver exceptional real estate experiences.
//             </p>
//             <div className="flex space-x-4">
//               <motion.a whileHover={{ scale: 1.1 }} href="https://www.facebook.com/profile" target="_blank" rel="noopener noreferrer">
//               <SiFacebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//               </motion.a>
//               <motion.a whileHover={{ scale: 1.1 }} href="tel:+911234567890" target="_blank" rel="noopener noreferrer">
//               <FaPhoneAlt className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//               </motion.a>
//               <motion.a whileHover={{ scale: 1.1 }} href="mailto:'DEMO@gmail.com'" target="_blank" rel="noopener noreferrer">
//               <SiMaildotru className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//               </motion.a>
//               <motion.a whileHover={{ scale: 1.1 }} href="https://www.youtube.com/DEMO CHANNEL" target="_blank" rel="noopener noreferrer">
//               <SiYoutube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
//             </motion.a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Properties</motion.a></li>
//               <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Sale</motion.a></li>
//               <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Rent</motion.a></li>
//               <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Commercial</motion.a></li>
//               <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Investment</motion.a></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Services</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Valuation</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Market Analysis</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Management</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investment Consulting</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Legal Support</a></li>
//             </ul>
//           </div>

//           {/* Developers Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Developers Info</h3>
//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <span className="text-gray-300 text-sm">
//                   Developed by <strong>Name</strong>
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Mail className="h-4 w-4 mr-2 text-blue-400" />
//                 <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-white transition-colors text-sm">
//                   <strong>Email:</strong> your.email@example.com
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <SiLinkedin className="h-4 w-4 mr-2 text-blue-400" />
//                 <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
//                   <strong>LinkedIn:</strong> yourprofile
//                 </a>
//               </div>
//             </div>
//           </div>
          
//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <FaBuilding className="h-4 w-4 mr-2 text-blue-400" />
//                 <span className="text-gray-300 text-sm">ELITE ESTATES</span>
//               </div>
//               <div className="flex items-center">
//                 <FaUser className="h-4 w-4 mr-2 text-blue-400" />
//                 <span className="text-gray-300 text-sm">DEMO ADMIN</span>
//               </div>
//               <div className="flex items-center">
//                 <VerifiedIcon className="h-4 w-4 mr-2 text-blue-400" />
//                 <span className="text-gray-300 text-sm">TG RERA No. : TG0123.</span>
//               </div>
              
//               <div className="flex items-center">
//                 <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
//                 <Phone className="h-4 w-4 mr-2 text-blue-400" />
//                   <a href='tel:+911234567890' className="text-400 hover:text-white transition-colors">
//                   <span className="text-gray-300 text-sm">+91 12345 67890</span>
//                   </a>
//                 </motion.div>
//               </div>

              
//               <div className="flex items-center">
//                 <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
//                 <Mail className="h-4 w-4 mr-2 text-blue-400" />
//                   <a href="mailto:DEMO@gmail.com" className="text-400 hover:text-white transition-colors">
//                   <span className="text-gray-300 text-sm">DEMO@gmail.com</span>
//                   </a>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm">
//               © 2025 Surya Property Consultant. All rights reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
//               <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
//               <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };











// Modified for Compactability of Mobiles
import React, { useState, useEffect } from 'react';
import { Home, Phone, Mail, ChevronDown } from 'lucide-react';
import { SiFacebook, SiMaildotru, SiYoutube, SiLinkedin } from "react-icons/si";
import { FaBuilding, FaPhoneAlt, FaUser } from 'react-icons/fa';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion, AnimatePresence, Variants as FramerVariants } from 'framer-motion';

// Define the type for the openSections state object
interface OpenSectionsState {
  quickLinks: boolean;
  services: boolean;
  developersInfo: boolean;
  contactInfo: boolean;
}

// Define a type for the keys of the OpenSectionsState
type SectionKey = keyof OpenSectionsState;

const Footer: React.FC = () => {
  // State to track if we are in mobile view
  const [isMobile, setIsMobile] = useState(false);

  // State to manage the open/closed status of sections
  const [openSections, setOpenSections] = useState<OpenSectionsState>({
    quickLinks: false,
    services: false,
    developersInfo: false,
    contactInfo: false, // Initial state doesn't assume mobile for contactInfo
  });

  // Effect to determine mobile status on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      const mobileStatus = window.innerWidth < 768;
      setIsMobile(mobileStatus);

      // Ensure 'contactInfo' is open when in mobile view (and doesn't close on resize)
      setOpenSections(prevState => ({
        ...prevState,
        contactInfo: mobileStatus ? true : prevState.contactInfo, // Force open if mobile, otherwise keep current state
      }));
    };

    if (typeof window !== 'undefined') {
      checkIsMobile(); // Check initially
      window.addEventListener('resize', checkIsMobile);
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []); // Run once on component mount

  // Function to toggle sections
  const toggleSection = (sectionName: SectionKey): void => {
    // Only allow toggling on mobile screens AND if it's not the 'contactInfo' section
    if (isMobile && sectionName !== 'contactInfo') {
      setOpenSections(prevState => ({
        ...prevState,
        [sectionName]: !prevState[sectionName],
      }));
    }
  };

  // SectionHeader component with conditional arrow rendering
  const SectionHeader: React.FC<{ title: string; sectionKey: SectionKey }> = ({ title, sectionKey }) => {
    // Determine if the arrow should be hidden for this section on mobile
    const shouldHideArrow = sectionKey === 'contactInfo' && isMobile;

    return (
      <div
        className={`flex justify-between items-center mb-4 ${shouldHideArrow ? 'cursor-default' : 'cursor-pointer md:cursor-default'}`}
        // Only attach onClick handler if the arrow is not hidden (i.e., section is toggleable)
        onClick={shouldHideArrow ? undefined : () => toggleSection(sectionKey)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {/* Conditionally render the ChevronDown arrow */}
        {!shouldHideArrow && (
          <ChevronDown
            className={`h-5 w-5 md:hidden transform transition-transform duration-300 ${
              openSections[sectionKey] ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </div>
    );
  };

  // CollapsibleContent component with conditional rendering for 'contactInfo'
  const CollapsibleContent: React.FC<{ sectionKey: SectionKey; children: React.ReactNode }> = ({ sectionKey, children }) => {
    const isOpen = openSections[sectionKey];

    // Determine if this section should always be open on mobile (e.g., 'contactInfo')
    const shouldAlwaysBeOpenOnMobile = sectionKey === 'contactInfo';

    // If it's the designated section (contactInfo) AND we are on mobile,
    // render content directly without animation or collapsing behavior.
    if (shouldAlwaysBeOpenOnMobile && isMobile) {
      return (
        <div className="md:max-h-full md:block"> {/* Apply desktop block styles for consistent layout */}
          {children}
        </div>
      );
    }

    // For all other sections (or on desktop), use the AnimatePresence for collapse/expand animation
    const variants: FramerVariants = {
      visible: {
        opacity: 1,
        maxHeight: "500px", // Use maxHeight for smooth collapse/expand
        y: 0,
        transition: {
          ease: "easeOut",
          duration: 0.2,
          when: "beforeChildren",
          staggerChildren: 0.05,
        },
      },
      hidden: {
        opacity: 0,
        maxHeight: "0px",
        y: -20,
        transition: {
          ease: "easeIn",
          duration: 0.15,
          when: "afterChildren",
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
        transitionEnd: {
          display: "none", // Hide element completely after animation
        }
      },
    };

    return (
      <AnimatePresence initial={false}>
        {(isOpen || !isMobile) && ( // Render if section is open OR if it's desktop view
          <motion.div
            key={sectionKey} // Important for AnimatePresence to track changes
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants} // Use the typed variants
            className={`overflow-hidden ${!isMobile ? 'md:max-h-full md:block' : ''}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-8">
          {/* Company Info Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-blue-400" />
              <a href="#" className="text-white text-2xl font-bold hover:text-blue-400 transition-colors">
                <span className="text-xl font-bold">Surya Property Consultant</span>
              </a>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner in finding the perfect property. We combine expertise,
              technology, and personalized service to deliver exceptional real estate experiences.
            </p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.1 }} href="https://www.facebook.com/profile.php?id=100090389815172" target="_blank" rel="noopener noreferrer">
                <SiFacebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="tel:+917989114553" target="_blank" rel="noopener noreferrer">
                <FaPhoneAlt className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="mailto:'suryapropertyconsultant.info@gmail.com'" target="_blank" rel="noopener noreferrer">
                <SiMaildotru className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="https://www.youtube.com/@SuryaPropertyConsultant" target="_blank" rel="noopener noreferrer">
                <SiYoutube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <SectionHeader title="Quick Links" sectionKey="quickLinks" />
            <CollapsibleContent sectionKey="quickLinks">
              <ul className="space-y-2">
                <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Properties</motion.a></li>
                <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Sale</motion.a></li>
                <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Rent</motion.a></li>
                <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Commercial</motion.a></li>
                <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Investment</motion.a></li>
              </ul>
            </CollapsibleContent>
          </div>

          {/* Services Section */}
          <div>
            <SectionHeader title="Services" sectionKey="services" />
            <CollapsibleContent sectionKey="services">
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Valuation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Market Analysis</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Management</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investment Consulting</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Legal Support</a></li>
              </ul>
            </CollapsibleContent>
          </div>

          {/* Developers Info Section */}
          <div>
            <SectionHeader title="Developers Info" sectionKey="developersInfo" />
            <CollapsibleContent sectionKey="developersInfo">
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-300 text-sm">
                    Developed by <strong>Abhi</strong>
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-400" />
                  <a href="mailto:abhishkekhode@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                     abhishkekhode@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <SiLinkedin className="h-4 w-4 mr-2 text-blue-400" />
                  <a href="https://www.linkedin.com/in/abhishek-khode-1650372a0/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Abhi
                  </a>
                </div>
              </div>
            </CollapsibleContent>
          </div>

          {/* Contact Info Section */}
          <div>
            <SectionHeader title="Contact Info" sectionKey="contactInfo" />
            <CollapsibleContent sectionKey="contactInfo">
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaBuilding className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-gray-300 text-sm">Surya Property Consultant</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-gray-300 text-sm">Anand Baradi</span>
                </div>
                <div className="flex items-center">
                  <VerifiedIcon className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-gray-300 text-sm">TG RERA No. : A02200002962.</span>
                  {/* <span className="text-gray-300 text-sm">TG RERA No. : TG0123.</span> */}
                </div>

                <div className="flex items-center">
                  <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
                    <Phone className="h-4 w-4 mr-2 text-blue-400" />
                    <a href='tel:+917989114553' className="text-gray-300 hover:text-white transition-colors">
                      <span className="text-gray-300 text-sm">+91 79891 14553</span>
                    </a>
                  </motion.div>
                </div>

                <div className="flex items-center">
                  <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
                    <Mail className="h-4 w-4 mr-2 text-blue-400" />
                    <a href="mailto:suryapropertyconsultant.info@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                      <span className="text-gray-300 text-sm">suryapropertyconsultant.info@gmail.com</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Surya Property Consultant. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;