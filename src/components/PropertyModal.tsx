import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Square, Car, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types/Property';
// import AgentDetailsModal from './AgentDetailsModal';
import AgentDetailsModal from './AgentDetailsModal';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleViewing: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onScheduleViewing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAgentModal, setShowAgentModal] = useState(false);

  if (!property) return null;
  const agent = {
    name: property.agentName || 'Anand Baradi',
    phone: property.agentPhone || '+91 79891 14553',
    email: property.agentEmail || 'suryapropertyconsultant.info@gmail.com',
    photo: property.agentPhoto, // optional
    reranum: 'TG RERA No. : A02200002962.',
  };

  // const formatPrice = (price: number) => {
  //   if (property.status === 'for-rent') {
  //     return `₹${price.toLocaleString()}/month`;
  //   }
  //   return `₹${price.toLocaleString()}`;
  // };
  const formatPrice = (price: number) => {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(price);

  return property.status === 'for-rent'
    ? `₹${formatted}/month`
    : `₹${formatted}`;
};


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // function onScheduleViewing(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   event.preventDefault();
  //   // You might want to open a modal, trigger a callback, or navigate to a scheduling page.
  //   // Since onScheduleViewing is passed as a prop, just call it:
  //   if (typeof (PropertyModal as any).defaultProps?.onScheduleViewing === "function") {
  //     (PropertyModal as any).defaultProps.onScheduleViewing();
  //   }
  // }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
            <div className="flex items-center text-gray-600 mt-1">
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

        {/* Image Gallery */}
        <div className="relative">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price and Status */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-3xl font-bold text-blue-700">{formatPrice(property.price)}</span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              property.status === 'for-sale' ? 'bg-green-100 text-green-800' :
              property.status === 'for-rent' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {property.status === 'for-sale' ? 'For Sale' :
               property.status === 'for-rent' ? 'For Rent' : 'Sold'}
            </span>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Bed className="h-6 w-6 mx-auto mb-2 text-gray-600" />
              <span className="text-lg font-semibold">{property.bedrooms}</span>
              <p className="text-sm text-gray-600">Bedrooms</p>
            </div>
            <div className="text-center">
              <Bath className="h-6 w-6 mx-auto mb-2 text-gray-600" />
              <span className="text-lg font-semibold">{property.bathrooms}</span>
              <p className="text-sm text-gray-600">Bathrooms</p>
            </div>
            <div className="text-center">
              <Square className="h-6 w-6 mx-auto mb-2 text-gray-600" />
              <span className="text-lg font-semibold">{property.area.toLocaleString()}</span>
              <p className="text-sm text-gray-600">Sq Ft</p>
            </div>
            <div className="text-center">
              <Car className="h-6 w-6 mx-auto mb-2 text-gray-600" />
              <span className="text-lg font-semibold">{property.parking}</span>
              <p className="text-sm text-gray-600">Parking</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm">
                {/* Built in{property.yearBuilt} */}
                {property.possession ? `Possession in : ${property.possession}` : `Built in ${property.yearBuilt}`}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">Property ID: {property.id}</span>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            // onClick={() => window.open("/Contact.tsx", "_blank")}>
            onClick = {onScheduleViewing}>
              Request a Call
            </button>
            <button className="flex-1 border border-blue-700 text-blue-700 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors"
            onClick={() => setShowAgentModal(true)}>
              Contact Agent
            </button>
          </div>
          {showAgentModal && (
            <AgentDetailsModal
              agent={agent}
              onClose={() => setShowAgentModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};