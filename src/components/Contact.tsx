import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { motion } from "framer-motion";
import { FaBuilding } from 'react-icons/fa';
import emailjs from 'emailjs-com';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
   const [showPopup, setShowPopup] = useState(false);
   const [loading, setLoading] = useState(false);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (name === "phone") {
    // Remove non-digit characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);

    // Format: 12345 67890
    let formatted = digitsOnly;
    if (digitsOnly.length > 5) {
      formatted = `${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
    }

    setFormData({
      ...formData,
      phone: formatted
    });
    return;
  }

  setFormData({
    ...formData,
    [name]: value
  });
};

  const handleFormReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // Remove space in formatted phone number before sending
  const rawPhone = formData.phone.replace(/\s/g, '');

  const dataToSend = {
    ...formData,
    phone: `+91${rawPhone}` // use the cleaned phone number
  };

  emailjs.send(
    'service_fnkd0w9',      // Replace with your EmailJS Service ID
    'template_ad2vt8i',     // Replace with your EmailJS Template ID
    dataToSend,
    'PIuYEbtjBXNj6l0oD'     // Replace with your EmailJS Public Key
  ).then(() => {
    setShowPopup(true);
    handleFormReset();
  }, (error) => {
    alert('Failed to send message. Please try again later.');
    console.error(error);
  }).finally(() => {
    setLoading(false); // stop loading after done
  });
};


  return (
    <section className="py-16 bg-white">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
            <p>Your message has been sent. We'll get back to you soon.</p>
            <button
              className="mt-6 px-6 py-2 bg-blue-700 text-white rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2> */}
          <h2 className="mt-4 sm:mt-8 lg:mt-12 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to find your dream property? Contact our expert team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaBuilding className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Name</h4>
                  <p className="text-gray-600">Surya Property Consultant.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-blue-700" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <div className="flex flex-col space-y-1">
                    <span className="inline-flex space-x-2">
                      <motion.a whileHover={{ scale: 1.1 }} href="tel:+917989114553" className="text-blue-700 hover:underline">
                        <span className="text-gray-600">+91 79891 14553</span>
                      </motion.a>
                      <span>,</span>
                      <motion.a whileHover={{ scale: 1.1 }} href="tel:+916300213746" className="text-blue-700 hover:underline">
                        <span className="text-gray-600">+91 63002 13746</span>
                      </motion.a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <span className="inline-flex space-x-2">
                    <motion.a whileHover={{ scale: 1.1 }} href="mailto:suryapropertyconsultant.info@gmail.com" className="text-blue-700 hover:underline">
                      <span className="text-gray-600">suryapropertyconsultant.info@gmail.com</span>
                    </motion.a>
                  </span>
                </div>
              </div>
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
            {/* Map placeholder */}
            <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p>Interactive Map</p>
                <p className="text-sm">123 Real Estate Ave, Beverly Hills, CA</p>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              onReset={handleFormReset}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-700 font-semibold text-base pointer-events-none">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  placeholder="12345 67890"
                />
              </div> */}
              <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-base text-gray-700 font-semibold">+91</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  inputMode="numeric"
                  maxLength={11}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  placeholder="12345 67890"
                />
              </div>
            </div>


                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="buying">I'm interested in buying</option>
                    <option value="selling">I want to sell my property</option>
                    <option value="renting">I'm looking to rent</option>
                    <option value="investment">Investment opportunities</option>
                    <option value="other">Other inquiry</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your real estate needs...😊"
                />
              </div>
              {/* <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button> */}


              <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors`}
            >
              {loading ? (
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Sending...</span>
                </motion.div>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>


            </form>
          </div>
        </div>
      </div>
    </section>
  );
};