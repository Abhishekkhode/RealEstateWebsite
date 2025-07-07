import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { Property } from '../../types/Property'; // Ensure this type correctly reflects nullable fields
import { apiService } from '../../services/api';

interface PropertyFormProps {
  property?: Property | null;
  onSave: (property: Omit<Property, 'id'>, id?: string) => void;
  onCancel: () => void;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel }) => {
  // Initialize formData with default empty strings or appropriate default values
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'house' as Property['type'],
    status: 'for-sale' as Property['status'],
    description: '',
    features: [''],
    yearBuilt: '',
    parking: '',
    featured: false,
    images: [''],
    possession: ''
  });

  // Note: The following states (properties, showForm, editingProperty) seem to be misplaced
  // in PropertyForm. They are typically managed in the parent component (AdminDashboard).
  // If they are not used within this component, they can be removed to simplify.
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // This useEffect fetches all properties, which is generally not needed inside a form
  // that is meant to create or edit a single property. This might be a leftover.
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const result = await apiService.getProperties();
        setProperties(result);
      } catch (err) {
        console.error("Failed to load properties", err);
      }
    };
    // Only call if this component actually needs the full list of properties,
    // which is unlikely for a standalone form.
    // fetchProperties(); // Consider removing or moving this
  }, []);


  useEffect(() => {
    if (property) {
      // Safely convert numbers to string, providing an empty string if the number is null/undefined
      setFormData({
        title: property.title || '', // Ensure title is string
        price: property.price?.toString() || '', // Safely convert number to string
        location: property.location || '', // Ensure location is string
        bedrooms: property.bedrooms?.toString() || '', // Safely convert number to string
        bathrooms: property.bathrooms?.toString() || '', // Safely convert number to string
        area: property.area?.toString() || '', // Safely convert number to string
        type: property.type,
        status: property.status,
        description: property.description || '', // Ensure description is string
        features: property.features || [''], // Ensure features is an array, default to ['']
        yearBuilt: property.yearBuilt?.toString() || '', // Safely convert number to string
        parking: property.parking?.toString() || '', // Safely convert number to string
        featured: property.featured ?? false, // Default to false if null/undefined
        images: property.images || [''], // Ensure images is an array, default to ['']
        possession: property.possession || '' // Ensure possession is string
      });
    } else {
      // Reset form data when no property is being edited (e.g., for 'Add New Property')
      setFormData({
        title: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        type: 'house',
        status: 'for-sale',
        description: '',
        features: [''],
        yearBuilt: '',
        parking: '',
        featured: false,
        images: [''],
        possession: ''
      });
    }
  }, [property]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse string inputs back to numbers, handling potential empty strings gracefully
    const parsedPrice = parseInt(formData.price);
    const parsedBedrooms = parseInt(formData.bedrooms);
    const parsedBathrooms = parseInt(formData.bathrooms);
    const parsedArea = parseInt(formData.area);
    const parsedYearBuilt = parseInt(formData.yearBuilt);
    const parsedParking = parseInt(formData.parking);

    const propertyData: Omit<Property, 'id'> = {
      title: formData.title,
      // Use isNaN to check if parsing failed and provide undefined if it did,
      // so backend can handle it as nullable number, or default to 0 if preferred.
    // title: formData.title,
    price: parseInt(formData.price),
    location: formData.location,
    bedrooms: parseInt(formData.bedrooms),
    bathrooms: parseInt(formData.bathrooms),
    area: parseInt(formData.area),
    type: formData.type,
    status: formData.status,
    description: formData.description,
    features: formData.features.filter(f => f.trim() !== ''),
    yearBuilt: parseInt(formData.yearBuilt),
    parking: parseInt(formData.parking),
    featured: formData.featured,
    images: formData.images.filter(img => img.trim() !== '')
    };

    if (property && property.id) {
      onSave(propertyData, property.id);
    } else {
      onSave(propertyData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter property title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
              <input
                type="number"
                name="yearBuilt"
                required
                value={formData.yearBuilt}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter year built"
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                required
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                required
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
              <input
                type="number"
                name="area"
                required
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
              <input
                type="number"
                name="parking"
                required
                value={formData.parking}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Open Plot</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Property</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter property description"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter feature"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Feature
              </button>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image URL"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Image
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
            >
              {property ? 'Update Property' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
