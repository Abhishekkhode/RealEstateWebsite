// // src/components/PropertyDetailsModal.tsx
// import React from 'react';
// import { Property } from '../../types/Property';
// import { X, MapPin, Bed, Bath, Square, Car } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface PropertyDetailsModalProps {
//   property: Property | null; // Can be null if no property is selected
//   onClose: () => void;
// }

// export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
//   if (!property) {
//     return null; // Don't render if no property is selected
//   }

//   const formatPrice = (price: number | null | undefined) => {
//     if (price === null || price === undefined) {
//       return 'N/A';
//     }
//     const formattedPrice = new Intl.NumberFormat('en-IN', {
//       maximumFractionDigits: 0,
//     }).format(price);
//     return property.status === 'for-rent'
//       ? `₹${formattedPrice}/month`
//       : `₹${formattedPrice}`;
//   };

//   const defaultImageUrl = 'https://dummyimage.com/800x600/ccc/fff&text=No+Image';
//   const imageUrlsToDisplay = (property.images && property.images.length > 0)
//     ? property.images
//     : [defaultImageUrl];

//   return (
//     <AnimatePresence>
//       {property && ( // Only render motion.div if property exists
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
//           onClick={onClose} // Close modal when clicking outside
//         >
//           <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 50, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 200, damping: 20 }}
//             className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
//           >
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
//               title="Close"
//             >
//               <X className="h-6 w-6 text-gray-600" />
//             </button>

//             {/* Image Gallery (basic for now) */}
//             <div className="w-full h-72 bg-gray-200 flex items-center justify-center overflow-hidden rounded-t-lg">
//               {imageUrlsToDisplay.length > 0 ? (
//                 <img
//                   src={imageUrlsToDisplay[0]} // Displaying first image for simplicity
//                   alt={property.title || 'Property Image'}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-500">No Image Available</span>
//               )}
//             </div>
//             {/* You could add a carousel here for multiple images */}

//             <div className="p-6">
//               <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{property.title}</h2>
//               <p className="text-xl font-bold text-blue-700 mb-4">{formatPrice(property.price)}</p>

//               <div className="flex items-center text-gray-600 mb-4">
//                 <MapPin className="h-5 w-5 mr-2" />
//                 <span className="text-lg">{property.location}</span>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-md text-gray-700">
//                 <div className="flex items-center">
//                   <Bed className="h-5 w-5 mr-1 text-gray-500" />
//                   <span>{property.bedrooms || 'N/A'} Beds</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Bath className="h-5 w-5 mr-1 text-gray-500" />
//                   <span>{property.bathrooms || 'N/A'} Baths</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Square className="h-5 w-5 mr-1 text-gray-500" />
//                   <span>{property.area?.toLocaleString() || 'N/A'} sqft</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Car className="h-5 w-5 mr-1 text-gray-500" />
//                   <span>{property.parking || 'N/A'} Parking</span>
//                 </div>
//               </div>

//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
//               <p className="text-gray-700 leading-relaxed mb-6">
//                 {property.description || 'No description available.'}
//               </p>

//               {/* Additional details you might have
//               {property.amenities && property.amenities.length > 0 && (
//                 <>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Amenities</h3>
//                   <ul className="list-disc list-inside text-gray-700 mb-6">
//                     {property.amenities.map((amenity, index) => (
//                       <li key={index}>{amenity}</li>
//                     ))}
//                   </ul>
//                 </> 
//               )} */}

//               {property.featured && (
//                 <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg flex items-center space-x-2">
//                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm0 7a1 1 10-2 0h2z" clipRule="evenodd" />
//                   </svg>
//                   <span>This is a featured property.</span>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };





// With animated buttons to switch between images


// src/components/PropertyDetailsModal.tsx
import React, { useState, useEffect } from 'react';
import { Property } from '../../types/Property'; // Ensure this path is correct
import { X, ChevronLeft, ChevronRight, MapPin, Bed, Bath, LayoutGrid, Car, Calendar, DollarSign, Tag, Square, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when a new property is opened
  useEffect(() => {
    if (property) {
      setCurrentImageIndex(0);
    }
  }, [property]);

  if (!property) {
    return null; // Or render a loading/empty state if appropriate
  }

  const images = property.images || [];

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Indian Rupee
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close"
          title="Close"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>

        {/* Image Gallery */}
        <div className="relative h-96 bg-gray-200 rounded-t-xl overflow-hidden flex items-center justify-center">
          {images.length > 0 ? (
            <>
              {/* AnimatePresence for image transitions */}
              <AnimatePresence initial={false} mode='wait'>
                <motion.img
                  key={images[currentImageIndex]} // IMPORTANT: Key changes with image URL for transition
                  src={images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} // Adjust duration for fade effect
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous image"
                    title="Previous Image"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Next image"
                    title="Next Image"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-gray-500 text-lg">No images available</div>
          )}
        </div>

        {/* Property Details */}
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{property.title}</h1>
          <p className="text-3xl font-bold text-blue-700 mb-6">{formatPrice(property.price)} {property.status === 'for-rent' ? '/month' : ''}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-gray-700">
            <p className="flex items-center text-lg"><MapPin className="h-5 w-5 mr-3 text-gray-600" /> <strong>Location:</strong> {property.location}</p>
            <p className="flex items-center text-lg"><Bed className="h-5 w-5 mr-3 text-gray-600" /> <strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p className="flex items-center text-lg"><Bath className="h-5 w-5 mr-3 text-gray-600" /> <strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p className="flex items-center text-lg"><LayoutGrid className="h-5 w-5 mr-3 text-gray-600" /> <strong>Area:</strong> {property.area} sq ft</p>
            <p className="flex items-center text-lg"><Car className="h-5 w-5 mr-3 text-gray-600" /> <strong>Parking:</strong> {property.parking} spots</p>
            <p className="flex items-center text-lg"><Calendar className="h-5 w-5 mr-3 text-gray-600" /> <strong>Year Built:</strong> {property.yearBuilt}</p>
            <p className="flex items-center text-lg"><Tag className="h-5 w-5 mr-3 text-gray-600" /> <strong>Type:</strong> {property.type.charAt(0).toUpperCase() + property.type.slice(1)}</p>
            <p className="flex items-center text-lg"><Square className="h-5 w-5 mr-3 text-gray-600" /> <strong>Status:</strong> <span className={`ml-1 px-3 py-1 rounded-full text-sm font-medium ${
                property.status === 'for-sale' ? 'bg-green-100 text-green-800' :
                property.status === 'for-rent' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
            }`}>{property.status.replace('-', ' ').toUpperCase()}</span></p>
             <p className="flex items-center text-lg"><Info className="h-5 w-5 mr-3 text-gray-600" /> <strong>Possession:</strong> {property.possession}</p>
             <p className="flex items-center text-lg"><DollarSign className="h-5 w-5 mr-3 text-gray-600" /> <strong>Featured:</strong> {property.featured ? 'Yes' : 'No'}</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-8">{property.description}</p>

          {property.features && property.features.length > 0 && property.features[0].trim() !== '' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Key Features</h2>
              <ul className="list-disc list-inside text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}

           {/* {property.agent && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Agent</h2>
              <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-inner">
                {property.agent.agentPhoto && (
                  <img
                    src={property.agent.agentPhoto}
                    alt={property.agent.agentName}
                    className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-blue-200"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold text-blue-800">{property.agent.agentName}</p>
                  <p className="text-gray-700"><a href={`tel:${property.agent.agentPhone}`} className="hover:underline">{property.agent.agentPhone}</a></p>
                  <p className="text-gray-700"><a href={`mailto:${property.agent.agentEmail}`} className="hover:underline">{property.agent.agentEmail}</a></p>
                </div>
              </div>
            </>
          )} */}
        </div>
      </motion.div>
    </div>
  );
};