// src/components/PropertyList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Property } from '../types/Property';

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {properties.map(property => (
        <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{property.title}</h2>
            <p className="text-gray-500">{property.location}</p>
            <p className="text-blue-600 font-semibold mt-2">${property.price.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-1">{property.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
