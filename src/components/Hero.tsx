import React, { useState } from 'react';
import { Search, MapPin, Home as HomeIcon, DollarSign } from 'lucide-react';

interface HeroProps {
  onSearch: (filters: { location: string; type: string; priceRange: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    type: '',
    priceRange: ''
  });

  const handleSearch = () => {
    onSearch(searchFilters);
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury home"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Find Your Dream Home
        </h1>
        <p className="text-xl sm:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto">
          Discover exceptional properties with Surya Property Consultant - where luxury meets lifestyle
        </p>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-gray-900 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
              />
            </div>

            <div className="relative">
              <HomeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={searchFilters.type}
                onChange={(e) => setSearchFilters({ ...searchFilters, type: e.target.value })}
              >
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Open Plot</option>
                <option value="townhouse">Commercial Use</option>
              </select>
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={searchFilters.priceRange}
                onChange={(e) => setSearchFilters({ ...searchFilters, priceRange: e.target.value })}
              >
                <option  value="">Price Range</option>
                {/* <option value="0-300000">Under $300K</option>
                <option value="300000-500000">$300K - $500K</option>
                <option value="500000-800000">$500K - $800K</option>
                <option value="800000-1000000">$800K - $1M</option>
                <option value="1000000+">Over $1M</option> */}
                <option value="0-6000000">Under ₹60 Lakh</option>
                <option value="6000000-10000000">₹60 Lakh - ₹1 Cr</option>
                <option value="10000000+">Above ₹1 Cr</option>

              </select>
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              500+ Premium Properties
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Expert Real Estate Services
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              10+ Years Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};