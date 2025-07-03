import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface PropertyFiltersProps {
  filters: {
    type: string;
    status: string;
    priceRange: string;
    bedrooms: string;
  };
  onFilterChange: (filters: any) => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="h-5 w-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold">Filter Properties</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Open Plot</option>
            <option value="townhouse">Commercial Use</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
            {/* <option value="sold">Sold</option> */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <option value="">All Prices</option>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
};