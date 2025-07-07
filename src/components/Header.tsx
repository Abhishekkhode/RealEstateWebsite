// import React, { useState } from 'react';
// import { Home, Menu, X, Phone, Mail } from 'lucide-react';
// import { motion } from "framer-motion";


// interface HeaderProps {
//   activeSection: string;
//   onNavigate: (section: string) => void;
// }

// export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navItems = [
//     { id: 'home', label: 'Home' },
//     { id: 'properties', label: 'Properties' },
//     { id: 'about', label: 'About' },
//     { id: 'contact', label: 'Contact' }
//   ];

//   return (
//     <header className="bg-white shadow-lg fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
//             <Home className="h-8 w-8 text-blue-700" />
//             <span className="text-xl font-bold text-gray-900">Surya Property Consultant</span>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => onNavigate(item.id)}
//                 className={`text-gray-700 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors ${
//                   activeSection === item.id ? 'text-blue-700 border-b-2 border-blue-700' : ''
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           {/* Contact Info */}
//           {/* <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
//             <div className="flex items-center space-x-1">
//               <Phone className="h-4 w-4" />
//               <span>+91 79891 14553</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Mail className="h-4 w-4" />
//               <span>suryapropertyconsultant.info@gmail.com</span>
//             </div>
//           </div> */}
//           <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
//   <div className="flex items-center space-x-1">
//     <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
//     <Phone className="h-4 w-4" />
//     <a href="tel:+917989114553" className="text-500">
//       <span>+91 79891 14553</span>
//     </a>
//   </motion.div>
//     </div>
//   <div className="flex items-center space-x-1 ml-auto"> {/* Pushes mail ID to right */}
//     <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
//     <Mail className="h-4 w-4" />
//     <a href="mailto:suryapropertyconsultant.info@gmail.com" className="text-500">
//     <span>suryapropertyconsultant.info@gmail.com</span>
//     </a>
//     </motion.div>
//     {/* <span>suryapropertyconsultant.info@gmail.com</span> */}
//   </div>
// </div>



//           {/* Mobile menu button */}
//           <button
//             className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-700"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     onNavigate(item.id);
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
//                     activeSection === item.id
//                       ? 'text-blue-700 bg-blue-50'
//                       : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };




import React, { useState } from 'react';
import { Home, Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin' } // ✅ Added Admin here
  ];

  const handleNavigation = (id: string) => {
    if (id === 'admin') {
      navigate('/admin/login');
    } else {
      onNavigate(id);
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => onNavigate('home')}
          >
            <Home className="h-8 w-8 text-blue-700" />
            <span className="text-xl font-bold text-gray-900">Surya Property Consultant</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 relative">
            {navItems.map((item) => (
              <div key={item.id} className="relative pb-1">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`relative z-10 text-base font-semibold transition-colors px-5 py-2 rounded-md ${
                    activeSection === item.id ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  {item.label}
                </button>

                {activeSection === item.id && item.id !== 'admin' && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-700 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            {/* <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <a href="tel:+917989114553" className="hover:underline">
                +91 79891 14553
              </a>
            </motion.div> */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <a href="mailto:suryapropertyconsultant.info@gmail.com" className="hover:underline">
                suryapropertyconsultant.info@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavigation(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
