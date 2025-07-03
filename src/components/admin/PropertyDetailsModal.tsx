// src/components/PropertyDetailsModal.tsx
import React from 'react';
import { Property } from '../../types/Property';
import { X, MapPin, Bed, Bath, Square, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyDetailsModalProps {
  property: Property | null; // Can be null if no property is selected
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
  if (!property) {
    return null; // Don't render if no property is selected
  }

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) {
      return 'N/A';
    }
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(price);
    return property.status === 'for-rent'
      ? `₹${formattedPrice}/month`
      : `₹${formattedPrice}`;
  };

  const defaultImageUrl = 'https://dummyimage.com/800x600/ccc/fff&text=No+Image';
  const imageUrlsToDisplay = (property.images && property.images.length > 0)
    ? property.images
    : [defaultImageUrl];

  return (
    <AnimatePresence>
      {property && ( // Only render motion.div if property exists
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          onClick={onClose} // Close modal when clicking outside
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              title="Close"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Image Gallery (basic for now) */}
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center overflow-hidden rounded-t-lg">
              {imageUrlsToDisplay.length > 0 ? (
                <img
                  src={imageUrlsToDisplay[0]} // Displaying first image for simplicity
                  alt={property.title || 'Property Image'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image Available</span>
              )}
            </div>
            {/* You could add a carousel here for multiple images */}

            <div className="p-6">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{property.title}</h2>
              <p className="text-xl font-bold text-blue-700 mb-4">{formatPrice(property.price)}</p>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-md text-gray-700">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{property.bedrooms || 'N/A'} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{property.bathrooms || 'N/A'} Baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{property.area?.toLocaleString() || 'N/A'} sqft</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{property.parking || 'N/A'} Parking</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {property.description || 'No description available.'}
              </p>

              {/* Additional details you might have
              {property.amenities && property.amenities.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Amenities</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-6">
                    {property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </> 
              )} */}

              {property.featured && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg flex items-center space-x-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm0 7a1 1 10-2 0h2z" clipRule="evenodd" />
                  </svg>
                  <span>This is a featured property.</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};