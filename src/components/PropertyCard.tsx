// src/components/PropertyCard.tsx
import React from 'react';
import { MapPin, Bed, Bath, Square, Car, Heart, Edit } from 'lucide-react';
import { Property } from '../types/Property';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  // Make these props optional, as they only apply in admin view
  onEditProperty?: (property: Property) => void; // Now optional
  isAdminView?: boolean; // New prop to indicate admin view
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails, onEditProperty, isAdminView }) => {
  const [showPopup, setShowPopup] = React.useState(false);

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

  const defaultImageUrl = 'https://dummyimage.com/400x250/ccc/fff&text=No+Image';
  const imageUrlToDisplay = (property.images && property.images.length > 0)
    ? property.images[0]
    : defaultImageUrl;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={imageUrlToDisplay}
          alt={property.title || 'Property Image'}
          className="w-full h-48 object-cover"
        />
        {/* Status Badge: Top Left */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
            property.status === 'for-sale' ? 'bg-green-100 text-green-800' :
            property.status === 'for-rent' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {property.status === 'for-sale' ? 'For Sale' :
              property.status === 'for-rent' ? 'For Rent' : 'Sold'}
          </span>
          {/* Heart Icon: Top Right */}
          <button
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            onClick={() => setShowPopup(true)}
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          {/* Featured Badge: Top Center */}
          {property.featured && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>
            </div>
          )}
        {/* POP UP ON CLICKED ON HEART */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]">
              <h2 className="text-lg font-bold mb-2">Add to Favorites</h2>
              <p className="mb-4">Do you want to add this property to your favorites?</p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                  onClick={() => setShowPopup(false)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
          <span className="text-2xl font-bold text-blue-700">{formatPrice(property.price)}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area?.toLocaleString() || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Car className="h-4 w-4 mr-1" />
            <span>{property.parking || 'N/A'}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Action Buttons: View Details and conditionally rendered Edit Property */}
        <div className="flex space-x-2"> {/* Use flexbox to align buttons */}
          <motion.button
          whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(property)}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
          >
            View Details
          </motion.button>
          {/* Conditionally render the Edit button ONLY if isAdminView is true AND onEditProperty is provided */}
          {/* {isAdminView && onEditProperty && (
            <button
              onClick={() => onEditProperty(property)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center transition-colors"
              title="Edit Property"
            >
              <Edit className="h-5 w-5" />
            </button>
          )} */}
          {isAdminView && onEditProperty && (
            <motion.button // Apply motion to Edit Property button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEditProperty(property)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              title="Edit Property"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Property</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};


// After ediditng


// import React from 'react';
// import { MapPin, Bed, Bath, Square, Car, Heart } from 'lucide-react';
// import { Property } from '../types/Property';
// // Removed: import { div } from 'framer-motion/client'; // This was an incorrect import

// interface PropertyCardProps {
//   property: Property;
//   onViewDetails: (property: Property) => void;
// }

// export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
//   const [showPopup, setShowPopup] = React.useState(false);

//   // const formatPrice = (price: number | null | undefined) => { // 🚀 UPDATED: Allow price to be null/undefined
//   //   if (price === null || price === undefined) {
//   //     return 'N/A'; // Return a default value if price is null or undefined
//   //   }
//   //   if (property.status === 'for-rent') {
//   //     return `₹${price.toLocaleString()}/month`;
//   //   }
//   //   return `₹${price.toLocaleString()}`;
//   // };
//   const formatPrice = (price: number | null | undefined) => {
//   if (price === null || price === undefined) {
//     return 'N/A';
//   }

//   const formattedPrice = new Intl.NumberFormat('en-IN', {
//     maximumFractionDigits: 0,
//   }).format(price);

//   return property.status === 'for-rent'
//     ? `₹${formattedPrice}/month`
//     : `₹${formattedPrice}`;
// };


//   // Define a default image URL if no images are available
//   // 🚀 UPDATED: Using dummyimage.com as a more reliable placeholder service
//   const defaultImageUrl = 'https://dummyimage.com/400x250/ccc/fff&text=No+Image';

//   // Determine the image source safely
//   const imageUrlToDisplay = (property.images && property.images.length > 0)
//     ? property.images[0]
//     : defaultImageUrl;

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//       <div className="relative">
//         <img
//           src={imageUrlToDisplay}
//           alt={property.title || 'Property Image'}
//           className="w-full h-48 object-cover"
//         />
//         {/* Status Badge: Top Left */}
//         <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
//             property.status === 'for-sale' ? 'bg-green-100 text-green-800' :
//             property.status === 'for-rent' ? 'bg-blue-100 text-blue-800' :
//             'bg-red-100 text-red-800'
//           }`}>
//             {property.status === 'for-sale' ? 'For Sale' :
//               property.status === 'for-rent' ? 'For Rent' : 'Sold'}
//           </span>
//           {/* Heart Icon: Top Right */}
//           <button
//             className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
//             onClick={() => setShowPopup(true)}
//           >
//             <Heart className="h-4 w-4 text-gray-600" />
//           </button>
//           {/* Featured Badge: Top Center */}
//           {property.featured && (
//             <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
//               <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                 Featured
//               </span>
//             </div>
//           )}
//         {/* POP UP ON CIKCED ON HEART */}
//         {showPopup && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
//             <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]">
//               <h2 className="text-lg font-bold mb-2">Add to Favorites</h2>
//               <p className="mb-4">Do you want to add this property to your favorites?</p>
//               <div className="flex justify-end gap-2">
//                 <button
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                   onClick={() => setShowPopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
//                   onClick={() => setShowPopup(false)}
//                 >
//                   Yes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Property Details */}
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
//           <span className="text-2xl font-bold text-blue-700">{formatPrice(property.price)}</span>
//         </div>

//         <div className="flex items-center text-gray-600 mb-4">
//           <MapPin className="h-4 w-4 mr-1" />
//           <span className="text-sm">{property.location}</span>
//         </div>

//         <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
//           <div className="flex items-center">
//             <Bed className="h-4 w-4 mr-1" />
//             <span>{property.bedrooms || 'N/A'}</span> {/* Added 'N/A' fallback */}
//           </div>
//           <div className="flex items-center">
//             <Bath className="h-4 w-4 mr-1" />
//             <span>{property.bathrooms || 'N/A'}</span> {/* Added 'N/A' fallback */}
//           </div>
//           <div className="flex items-center">
//             <Square className="h-4 w-4 mr-1" />
//             <span>{property.area?.toLocaleString() || 'N/A'}</span> {/* 🚀 Added null-check and 'N/A' fallback */}
//           </div>
//           <div className="flex items-center">
//             <Car className="h-4 w-4 mr-1" />
//             <span>{property.parking || 'N/A'}</span> {/* Added 'N/A' fallback */}
//           </div>
//         </div>

//         <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//           {property.description}
//         </p>

//         <button
//           onClick={() => onViewDetails(property)}
//           className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };