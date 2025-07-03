import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { PropertyFilters } from './components/PropertyFilters';
import { About } from './components/About';
// import { Contact } from './components/Contact(OLD)';
import { Contact } from './components/Contact';

import { Footer } from './components/Footer';
import { properties } from './data/properties';
import { Property } from './types/Property';
import PropertyList from './components/PropertyList'

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priceRange: '',
    bedrooms: ''
  });

  // Filter properties based on current filters
  useEffect(() => {
    let filtered = properties;

    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.status) {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    if (filters.priceRange) {
      if (filters.priceRange === '1000000+') {
        filtered = filtered.filter(property => property.price >= 1000000);
      } else {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter(property => property.price >= min && property.price <= max);
      }
    }

    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms);
      filtered = filtered.filter(property => property.bedrooms >= minBedrooms);
    }

    setFilteredProperties(filtered);
  }, [filters]);

  const handleSearch = (searchFilters: { location: string; type: string; priceRange: string }) => {
    setActiveSection('properties');
    setFilters(prev => ({
      ...prev,
      type: searchFilters.type,
      priceRange: searchFilters.priceRange
    }));
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const featuredProperties = properties.filter(property => property.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      
      {activeSection === 'home' && (
        <>
          <Hero onSearch={handleSearch} />
          
          {/* Featured Properties Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Featured Properties
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover our handpicked selection of premium properties
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={setSelectedProperty}
                  />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button
                  onClick={() => setActiveSection('properties')}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Properties
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'properties' && (
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Properties
              </h1>
              <p className="text-xl text-gray-600">
                Find your perfect property from our extensive collection
              </p>
            </div>

            <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />

            <div className="mb-6 text-sm text-gray-600">
              Showing {filteredProperties.length} of {properties.length} properties
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={setSelectedProperty}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties match your current filters.</p>
                <button
                  onClick={() => setFilters({ type: '', status: '', priceRange: '', bedrooms: '' })}
                  className="mt-4 text-blue-700 hover:text-blue-800 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSection === 'about' && <About />}
      {activeSection === 'contact' && <Contact />}

      <Footer />

      {/* Property Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleViewing={() => {
        setSelectedProperty(null);      // Close the modal
        setActiveSection('contact');    // Show the contact section
      }}
      />
    </div>
  );
}

export default App;