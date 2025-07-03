import React from 'react';
import { Award, Users, Home, TrendingUp } from 'lucide-react';
import { BiCertification } from 'react-icons/bi';
import { FaCertificate } from 'react-icons/fa';
import { GrCertificate } from 'react-icons/gr';

export const About: React.FC = () => {
  const stats = [
    { icon: Home, number: '250+', label: 'Properties Sold' },
    { icon: Users, number: '1000+', label: 'Happy Clients' },
    { icon: GrCertificate, number: 'Authorized', label: 'RERA Certified Agent' },
    { icon: TrendingUp, number: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Surya Property Consultant
          </h2> */}
          <h2 className="mt-4 sm:mt-8 lg:mt-12 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Surya Property Consultant
          </h2>


          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property. We combine expertise, 
            technology, and personalized service to deliver exceptional real estate experiences.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-blue-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Excellence in Every Transaction
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded on the principles of integrity, expertise, and client satisfaction, 
              Elite Estates has been serving the real estate community for over two decades. 
              Our team of experienced professionals is dedicated to making your property 
              dreams a reality.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Whether you're buying your first home, investing in commercial property, 
              or looking for luxury estates, we provide comprehensive services tailored 
              to your unique needs.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Market Expertise</h4>
                  <p className="text-gray-600 text-sm">Deep knowledge of local markets and trends</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Personalized Service</h4>
                  <p className="text-gray-600 text-sm">Tailored solutions for every client's needs</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Technology Integration</h4>
                  <p className="text-gray-600 text-sm">Cutting-edge tools for better outcomes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Real estate team"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-blue-700">A+</div>
              <div className="text-sm text-gray-600">BBB </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};