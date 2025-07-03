import React from 'react';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, VerifiedIcon, Youtube } from 'lucide-react';
import { FaBuilding, FaCertificate, FaPhoneAlt, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiFacebook, SiLinphone, SiMailboxdotorg, SiMailchimp, SiMaildotcom, SiMaildotru, SiMailgun, SiMailtrap, SiMapillary, SiPhonepe, SiTmobile, SiYoutube } from "react-icons/si";



export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
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
              {/* <Youtube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" /> */}
              <motion.a whileHover={{ scale: 1.1 }} href="https://www.youtube.com/@SuryaPropertyConsultant" target="_blank" rel="noopener noreferrer">
              <SiYoutube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Properties</motion.a></li>
              <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Sale</motion.a></li>
              <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">For Rent</motion.a></li>
              <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Commercial</motion.a></li>
              <li><motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white transition-colors">Investment</motion.a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Valuation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Market Analysis</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investment Consulting</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Legal Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
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
              </div>
              
              <div className="flex items-center">
                <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                  <a href='tel:+917989114553' className="text-400 hover:text-white transition-colors">
                <span className="text-gray-300 text-sm">+91 79891 14553</span>
                  </a>
                </motion.div>
              </div>

              
              <div className="flex items-center">
                <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-1">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                  <a href="mailto:suryapropertyconsultant.info@gmail.com" className="text-400 hover:text-white transition-colors">
                <span className="text-gray-300 text-sm">suryapropertyconsultant.info@gmail.com</span>
                  </a>
                </motion.div>
              </div>
            </div>
            
            {/* <div className="mt-6">
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <p className="text-gray-300 text-sm">
                Mon-Fri: 9:00 AM - 7:00 PM<br />
                Sat: 10:00 AM - 5:00 PM<br />
                Sun: 12:00 PM - 4:00 PM
              </p>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
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