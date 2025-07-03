import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, UserIcon, Building } from 'lucide-react';
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

  // Old handleSubmit function


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle form submission here
  //   console.log('Form submitted:', formData);
  //   alert('Thank you for your message! We\'ll get back to you soon.');
  //   setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  // };

  // New handleSubmit function using emailjs

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send(
      'service_zbyz5n7',
      'template_ad2vt8i',
      formData,
      '8W7JvYDxJDmbOuy6I'
    )
    .then(() => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, (error) => {
      alert('Failed to send message. Please try again later.');
      console.error(error);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
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

            {/* Contact Info details */}

            <div className="space-y-6">
              <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FaBuilding className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Name</h4>
                <p className="text-gray-600">Surya Property Consultant.</p> {/* Company Name */}
                <p className="text-gray-600"></p> {/* Representative Name */}
              </div>
              </div>

              {/* Phone Details  */}
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
                  <span className ="inline-flex space-x-2">
                    <motion.a whileHover={{ scale: 1.1 }} href="mailto:'suryapropertyconsultant.info@gmail.com'" className="text-blue-700 hover:underline">
                  <span className="text-gray-600">suryapropertyconsultant.info@gmail.com</span>
                  </motion.a>
                  </span>
                </div>
              </div>

              {/* <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">123 Real Estate Ave<br />Suite 100<br />Beverly Hills, CA 90210</p>
                </div>
              </div> */}

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
            
            {/* Old Form Tag */}
            {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
            {/* New Form Tag */}
              <form
              action="https://formspree.io/f/xyzjegoa" method="POST" className="space-y-6">
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
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 12345 67890"
                  />
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
                  placeholder="Tell us about your real estate needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};