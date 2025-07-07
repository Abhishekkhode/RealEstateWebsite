import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Property } from '../types/Property';
import { Agent } from '../types/Agent';
import AgentDetailsModal from './AgentDetailsModal';
import { apiService } from '../services/api';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleViewing: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onScheduleViewing,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agentIndex, setAgentIndex] = useState(0);
  const [agents, setAgents] = useState<Agent[]>([]);

  // Fallback agent (shown when fetch fails)
  const fallbackAgent: Agent = {
    id: 'default',
    agentName: 'Anand Baradi',
    agentEmail: 'suryapropertyconsultant.info@gmail.com',
    agentPhone: '+91 79891 14553',
    agentPhoto: 'https://via.placeholder.com/150',
    Tgreranumber: 'A02200002962',
  };

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const fetchedAgents = await apiService.getAgents();
        if (fetchedAgents && fetchedAgents.length > 0) {
          setAgents(fetchedAgents);
        } else {
          setAgents([fallbackAgent]);
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error);
        setAgents([fallbackAgent]);
      }
    };
    fetchAgent();
  }, []);

  if (!property) return null;

  const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(price);

    return property.status === 'for-rent' ? `₹${formatted}/month` : `₹${formatted}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  const nextAgent = () => {
    setAgentIndex((prev) => (prev + 1) % agents.length);
  };

  const prevAgent = () => {
    setAgentIndex((prev) => (prev - 1 + agents.length) % agents.length);
  };

  const currentAgent = agents[agentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg md:max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {property.title}
            </h2>
            <div className="flex items-center text-gray-600 mt-1 text-sm sm:text-base">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Image carousel */}
        <div className="relative w-full aspect-video bg-gray-100">
          <img
            // Added the 'key' prop here to help trigger the transition
            key={property.images[currentImageIndex]}
            src={property.images[currentImageIndex]}
            alt={property.title}
            // Ensure transition-opacity and duration are present for the fade effect
            className="w-full h-full object-contain rounded-lg transition-opacity duration-300 ease-in-out"
            onError={(e) => {
              e.currentTarget.src =
                'https://res.cloudinary.com/demo/image/upload/v1690000000/fallback.jpg'; // Fallback image URL
            }}
          />

          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Property details */}
        <div className="p-4 sm:p-6">
          {/* Price and Status */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-blue-700">
              {formatPrice(property.price)}
            </span>
            <span
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                property.status === 'for-sale'
                  ? 'bg-green-100 text-green-800'
                  : property.status === 'for-rent'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {property.status === 'for-sale'
                ? 'For Sale'
                : property.status === 'for-rent'
                ? 'For Rent'
                : 'Sold'}
            </span>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Bed className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
              <span className="text-base sm:text-lg font-semibold">
                {property.bedrooms}
              </span>
              <p className="text-xs sm:text-sm text-gray-600">Bedrooms</p>
            </div>
            <div className="text-center">
              <Bath className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
              <span className="text-base sm:text-lg font-semibold">
                {property.bathrooms}
              </span>
              <p className="text-xs sm:text-sm text-gray-600">Bathrooms</p>
            </div>
            <div className="text-center">
              <Square className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
              <span className="text-base sm:text-lg font-semibold">
                {property.area.toLocaleString()}
              </span>
              <p className="text-xs sm:text-sm text-gray-600">Sq Ft</p>
            </div>
            <div className="text-center">
              <Car className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
              <span className="text-base sm:text-lg font-semibold">
                {property.parking}
              </span>
              <p className="text-xs sm:text-sm text-gray-600">Parking</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
              Description
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
              Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property ID & Possession */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-600" />
              <span>
                {property.possession
                  ? `Possession in : ${property.possession}`
                  : `Built in ${property.yearBuilt}`}
              </span>
            </div>
            <div className="flex items-center">
              <span>Property ID: {property.id}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors text-base"
              onClick={onScheduleViewing}
            >
              Request a Call
            </button>
            <button
              className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors border border-blue-700 text-blue-700 hover:bg-blue-50 text-base"
              onClick={() => currentAgent && setShowAgentModal(true)}
              disabled={!currentAgent}
            >
              Contact Agent
            </button>
          </div>

          {/* Agent Modal */}
          {showAgentModal && currentAgent && (
            <AgentDetailsModal
              agent={currentAgent}
              onClose={() => setShowAgentModal(false)}
              onNextAgent={agents.length > 1 ? nextAgent : undefined}
              onPrevAgent={agents.length > 1 ? prevAgent : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
};




// import React, { useState, useEffect } from 'react';
// import {
//   X,
//   MapPin,
//   Bed,
//   Bath,
//   Square,
//   Car,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { Property } from '../types/Property';
// import { Agent } from '../types/Agent';
// import AgentDetailsModal from './AgentDetailsModal';
// import { apiService } from '../services/api';

// interface PropertyModalProps {
//   property: Property | null;
//   onClose: () => void;
//   onScheduleViewing: () => void;
// }

// export const PropertyModal: React.FC<PropertyModalProps> = ({
//   property,
//   onClose,
//   onScheduleViewing,
// }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showAgentModal, setShowAgentModal] = useState(false);
//   const [agentIndex, setAgentIndex] = useState(0);
//   const [agents, setAgents] = useState<Agent[]>([]);

//   // Fallback agent (shown when fetch fails)
//   const fallbackAgent: Agent = {
//     id: 'default',
//     agentName: 'Anand Baradi',
//     agentEmail: 'suryapropertyconsultant.info@gmail.com',
//     agentPhone: '+91 79891 14553',
//     agentPhoto: 'https://via.placeholder.com/150',
//     Tgreranumber: 'A02200002962',
//   };

//   useEffect(() => {
//     const fetchAgent = async () => {
//       try {
//         const fetchedAgents = await apiService.getAgents();
//         if (fetchedAgents && fetchedAgents.length > 0) {
//           setAgents(fetchedAgents);
//         } else {
//           setAgents([fallbackAgent]);
//         }
//       } catch (error) {
//         console.error('Failed to fetch agents:', error);
//         setAgents([fallbackAgent]);
//       }
//     };
//     fetchAgent();
//   }, []);

//   if (!property) return null;

//   const formatPrice = (price: number) => {
//     const formatted = new Intl.NumberFormat('en-IN', {
//       maximumFractionDigits: 0,
//     }).format(price);

//     return property.status === 'for-rent' ? `₹${formatted}/month` : `₹${formatted}`;
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + property.images.length) % property.images.length
//     );
//   };

//   const nextAgent = () => {
//     setAgentIndex((prev) => (prev + 1) % agents.length);
//   };

//   const prevAgent = () => {
//     setAgentIndex((prev) => (prev - 1 + agents.length) % agents.length);
//   };

//   const currentAgent = agents[agentIndex];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-lg md:max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 sm:p-6 border-b">
//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//               {property.title}
//             </h2>
//             <div className="flex items-center text-gray-600 mt-1 text-sm sm:text-base">
//               <MapPin className="h-4 w-4 mr-1" />
//               <span>{property.location}</span>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Image carousel */}
//         <div className="relative w-full aspect-video bg-gray-100">
//           <img
//             src={property.images[currentImageIndex]}
//             alt={property.title}
//             className="w-full h-full object-contain rounded-lg transition-opacity duration-300"
//             onError={(e) => {
//               e.currentTarget.src =
//                 'https://res.cloudinary.com/demo/image/upload/v1690000000/fallback.jpg'; // Fallback image URL
//             }}
//           />

//           {property.images.length > 1 && (
//             <>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
//               </button>
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {property.images.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
//                     }`}
//                     aria-label={`View image ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Property details */}
//         <div className="p-4 sm:p-6">
//           {/* Price and Status */}
//           <div className="flex justify-between items-center mb-4 sm:mb-6">
//             <span className="text-2xl sm:text-3xl font-bold text-blue-700">
//               {formatPrice(property.price)}
//             </span>
//             <span
//               className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
//                 property.status === 'for-sale'
//                   ? 'bg-green-100 text-green-800'
//                   : property.status === 'for-rent'
//                   ? 'bg-blue-100 text-blue-800'
//                   : 'bg-red-100 text-red-800'
//               }`}
//             >
//               {property.status === 'for-sale'
//                 ? 'For Sale'
//                 : property.status === 'for-rent'
//                 ? 'For Rent'
//                 : 'Sold'}
//             </span>
//           </div>

//           {/* Key Features */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
//             <div className="text-center">
//               <Bed className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
//               <span className="text-base sm:text-lg font-semibold">
//                 {property.bedrooms}
//               </span>
//               <p className="text-xs sm:text-sm text-gray-600">Bedrooms</p>
//             </div>
//             <div className="text-center">
//               <Bath className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
//               <span className="text-base sm:text-lg font-semibold">
//                 {property.bathrooms}
//               </span>
//               <p className="text-xs sm:text-sm text-gray-600">Bathrooms</p>
//             </div>
//             <div className="text-center">
//               <Square className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
//               <span className="text-base sm:text-lg font-semibold">
//                 {property.area.toLocaleString()}
//               </span>
//               <p className="text-xs sm:text-sm text-gray-600">Sq Ft</p>
//             </div>
//             <div className="text-center">
//               <Car className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-gray-600" />
//               <span className="text-base sm:text-lg font-semibold">
//                 {property.parking}
//               </span>
//               <p className="text-xs sm:text-sm text-gray-600">Parking</p>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mb-4 sm:mb-6">
//             <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
//               Description
//             </h3>
//             <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//               {property.description}
//             </p>
//           </div>

//           {/* Features */}
//           <div className="mb-4 sm:mb-6">
//             <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
//               Features
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//               {property.features.map((feature, index) => (
//                 <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   <span className="text-sm">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Property ID & Possession */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg text-sm">
//             <div className="flex items-center">
//               <Calendar className="h-4 w-4 mr-2 text-gray-600" />
//               <span>
//                 {property.possession
//                   ? `Possession in : ${property.possession}`
//                   : `Built in ${property.yearBuilt}`}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <span>Property ID: {property.id}</span>
//             </div>
//           </div>

//           {/* CTA buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//             <button
//               className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors text-base"
//               onClick={onScheduleViewing}
//             >
//               Request a Call
//             </button>
//             <button
//               className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors border border-blue-700 text-blue-700 hover:bg-blue-50 text-base"
//               onClick={() => currentAgent && setShowAgentModal(true)}
//               disabled={!currentAgent}
//             >
//               Contact Agent
//             </button>
//           </div>

//           {/* Agent Modal */}
//           {showAgentModal && currentAgent && (
//             <AgentDetailsModal
//               agent={currentAgent}
//               onClose={() => setShowAgentModal(false)}
//               onNextAgent={agents.length > 1 ? nextAgent : undefined}
//               onPrevAgent={agents.length > 1 ? prevAgent : undefined}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };






// Currently Working Code
// import React, { useState, useEffect } from 'react';
// import { X, MapPin, Bed, Bath, Square, Car, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Property } from '../types/Property';
// import { Agent } from '../types/Agent';
// import AgentDetailsModal from './AgentDetailsModal';
// import { apiService } from '../services/api';

// interface PropertyModalProps {
//   property: Property | null;
//   onClose: () => void;
//   onScheduleViewing: () => void;
// }

// export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onScheduleViewing }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showAgentModal, setShowAgentModal] = useState(false);
//   const [agentIndex, setAgentIndex] = useState(0); // State to manage the current agent's index
//   const [agents, setAgents] = useState<Agent[]>([]);

//   useEffect(() => {
//     const fetchAgent = async () => {
//       try {
//         const fetchedAgents = await apiService.getAgents();
//         if (fetchedAgents && fetchedAgents.length > 0) {
//           setAgents(fetchedAgents);
//         }
//       } catch (error) {
//         console.error('Failed to fetch agents:', error);
//       }
//     };
//     fetchAgent();
//   }, []);

//   if (!property) return null;

//   const formatPrice = (price: number) => {
//     const formatted = new Intl.NumberFormat('en-IN', {
//       maximumFractionDigits: 0,
//     }).format(price);

//     return property.status === 'for-rent' ? `₹${formatted}/month` : `₹${formatted}`;
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
//   };

//   const nextAgent = () => {
//     setAgentIndex((prev) => (prev + 1) % agents.length);
//   };

//   const prevAgent = () => {
//     setAgentIndex((prev) => (prev - 1 + agents.length) % agents.length);
//   };

//   const currentAgent = agents[agentIndex];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
//             <div className="flex items-center text-gray-600 mt-1">
//               <MapPin className="h-4 w-4 mr-1" />
//               <span>{property.location}</span>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="relative">
//           <img
//             src={property.images[currentImageIndex]}
//             alt={property.title}
//             className="w-full h-64 sm:h-80 object-cover"
//           />
//           {property.images.length > 1 && (
//             <>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
//               >
//                 <ChevronLeft className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
//               >
//                 <ChevronRight className="h-5 w-5" />
//               </button>
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {property.images.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <span className="text-3xl font-bold text-blue-700">{formatPrice(property.price)}</span>
//             <span
//               className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                 property.status === 'for-sale'
//                   ? 'bg-green-100 text-green-800'
//                   : property.status === 'for-rent'
//                   ? 'bg-blue-100 text-blue-800'
//                   : 'bg-red-100 text-red-800'
//               }`}
//             >
//               {property.status === 'for-sale'
//                 ? 'For Sale'
//                 : property.status === 'for-rent'
//                 ? 'For Rent'
//                 : 'Sold'}
//             </span>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="text-center">
//               <Bed className="h-6 w-6 mx-auto mb-2 text-gray-600" />
//               <span className="text-lg font-semibold">{property.bedrooms}</span>
//               <p className="text-sm text-gray-600">Bedrooms</p>
//             </div>
//             <div className="text-center">
//               <Bath className="h-6 w-6 mx-auto mb-2 text-gray-600" />
//               <span className="text-lg font-semibold">{property.bathrooms}</span>
//               <p className="text-sm text-gray-600">Bathrooms</p>
//             </div>
//             <div className="text-center">
//               <Square className="h-6 w-6 mx-auto mb-2 text-gray-600" />
//               <span className="text-lg font-semibold">{property.area.toLocaleString()}</span>
//               <p className="text-sm text-gray-600">Sq Ft</p>
//             </div>
//             <div className="text-center">
//               <Car className="h-6 w-6 mx-auto mb-2 text-gray-600" />
//               <span className="text-lg font-semibold">{property.parking}</span>
//               <p className="text-sm text-gray-600">Parking</p>
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Description</h3>
//             <p className="text-gray-600 leading-relaxed">{property.description}</p>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Features</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//               {property.features.map((feature, index) => (
//                 <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
//                   <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                   <span className="text-sm">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-center">
//               <Calendar className="h-4 w-4 mr-2 text-gray-600" />
//               <span className="text-sm">
//                 {property.possession ? `Possession in : ${property.possession}` : `Built in ${property.yearBuilt}`}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-sm">Property ID: {property.id}</span>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
//               onClick={onScheduleViewing}
//             >
//               Request a Call
//             </button>
//             {/* <button
//               className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
//                 currentAgent ? 'border border-blue-700 text-blue-700 hover:bg-blue-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//               }`}
//               onClick={() => currentAgent && setShowAgentModal(true)}
//               disabled={!currentAgent}
//             >
//               {currentAgent ? 'Contact Agent' : 'Loading Agent...'}
//             </button> */}
//             <button
//             className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors border border-blue-700 text-blue-700 hover:bg-blue-50"
//             onClick={() => {
//               if (currentAgent) { // Only proceed if currentAgent exists
//                 setShowAgentModal(true);
//               } else {
//                 // Optional: Add a subtle feedback here if you want, e.g., a toast notification
//                 // console.log("Agent details are still loading or not available.");
//               }
//             }}
//           >
//             Contact Agent
//           </button>
//           </div>

//           {showAgentModal && currentAgent && (
//             <AgentDetailsModal
//               agent={currentAgent}
//               onClose={() => setShowAgentModal(false)}
//               onNextAgent={agents.length > 1 ? nextAgent : undefined} // Only show if more than one agent
//               onPrevAgent={agents.length > 1 ? prevAgent : undefined} // Only show if more than one agent
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
