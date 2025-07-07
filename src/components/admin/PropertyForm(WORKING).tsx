// src/components/admin/PropertyForm(WORKING).tsx

import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Property } from '../../types/Property'; // Ensure correct path to your Property type
import { Agent } from '../../types/Agent';     // Ensure correct path to your Agent type
import ConfirmUpdateModal from './ConfirmUpdateModal'; // Adjust path if necessary
import SuccessModal from './SuccessModal';         // Adjust path if necessary
import axios from 'axios'; // Make sure axios is installed: npm install axios

interface PropertyFormWorkingProps { // Renamed interface to match component name
  property?: Property | null; // Optional prop for editing an existing property. Null for new.
  onSave: (propertyData: Omit<Property, 'id'>, id?: string) => Promise<void>;
  onCancel: () => void;
}

export const PropertyFormWORKING: React.FC<PropertyFormWorkingProps> = ({ property, onSave, onCancel }) => { // Renamed export
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'house' as Property['type'], // Default type
    status: 'for-sale' as Property['status'], // Default status
    description: '',
    features: [''], // Initialize with an empty string for the first feature input
    yearBuilt: '',
    parking: '',
    featured: false,
    images: [''], // Initialize with an empty string for the first image input/upload
    possession: '',
    agentId: '', // Initialize as empty string for optional agent
  });

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [errorAgents, setErrorAgents] = useState<string | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State to indicate if an image is being uploaded
  const [uploadError, setUploadError] = useState<string | null>(null); // State to store image upload errors

  // Cloudinary environment variables from .env file (e.g., .env.local for Vite)
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;

  // Effect to load existing property data if 'property' prop is provided (for editing)
  // and to fetch agents for assignment
  useEffect(() => {
    if (property) {
      // Populate form data with existing property details for editing
      setFormData({
        title: property.title ?? '',
        price: property.price != null ? property.price.toString() : '',
        location: property.location ?? '',
        bedrooms: property.bedrooms != null ? property.bedrooms.toString() : '',
        bathrooms: property.bathrooms != null ? property.bathrooms.toString() : '',
        area: property.area != null ? property.area.toString() : '',
        type: property.type ?? 'house',
        status: property.status ?? 'for-sale',
        description: property.description ?? '',
        features: property.features && property.features.length > 0 ? property.features : [''], // Ensure at least one empty string for input
        yearBuilt: property.yearBuilt != null ? property.yearBuilt.toString() : '',
        parking: property.parking != null ? property.parking.toString() : '',
        featured: property.featured ?? false,
        images: property.images && property.images.length > 0 ? property.images : [''], // Ensure at least one empty string for input
        possession: property.possession ?? '',
        agentId: property.agentId ?? '', // Set agentId from property, or '' if null/undefined
      });
    } else {
      // Reset form for a new property
      setFormData({
        title: '', price: '', location: '', bedrooms: '', bathrooms: '', area: '',
        type: 'house', status: 'for-sale', description: '', features: [''],
        yearBuilt: '', parking: '', featured: false, images: [''],
        possession: '',
        agentId: '', // Reset agentId to empty string for new property
      });
    }

    // Fetch Agents from your backend API
    const fetchAgents = async () => {
      setLoadingAgents(true);
      setErrorAgents(null);
      try {
        // Assuming your API endpoint for agents is /api/agents
        const response = await axios.get<Agent[]>('/api/agents');
        const agentsData = Array.isArray(response.data) ? response.data : [];
        setAgents(agentsData);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
        if (axios.isAxiosError(err) && err.response) {
          setErrorAgents(`Failed to load agents: ${err.response.status} ${err.response.statusText} - ${err.response.data?.message || err.message}`);
        } else {
          setErrorAgents("Failed to load agents. Please ensure the agent service is running.");
        }
        setAgents([]); // Clear agents on error
      } finally {
        setLoadingAgents(false);
      }
    };

    fetchAgents();
  }, [property]); // Re-run effect if the 'property' prop changes (e.g., when editing a different property)

  // Generic handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value, type } = target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
    }));
  };

  // Handler for Cloudinary image uploads
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic check for Cloudinary configuration
    if (!cloudName || !uploadPreset || !folder) {
      setUploadError("Cloudinary environment variables not set. Cannot upload images.");
      alert("Cloudinary environment variables (VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET, VITE_CLOUDINARY_FOLDER) are not set in your .env file.");
      return;
    }

    setIsUploading(true); // Indicate upload in progress
    setUploadError(null); // Clear any previous upload errors

    // Prepare FormData for Cloudinary
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);
    data.append('folder', folder); // Organize uploads into a specific folder in Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data
      );
      const imageUrl = response.data.secure_url; // Get the secure URL of the uploaded image

      // Update the specific image URL in the formData state
      setFormData(prev => {
        const newImages = [...prev.images];
        newImages[index] = imageUrl;
        return { ...prev, images: newImages };
      });
      console.log('Image uploaded successfully:', imageUrl);
      // Optional: Add a small success message on the UI
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      setUploadError('Failed to upload image. Please try again.');
      // Optional: Alert the user or show an error message
    } finally {
      setIsUploading(false); // Reset upload status
    }
  };

  // Handler for confirming and submitting the form data
  const handleConfirmedSubmit = async () => {
    // --- Frontend Validations ---
    const parsedYearBuilt = formData.yearBuilt !== '' ? Number(formData.yearBuilt) : null;
    if (parsedYearBuilt !== null && (parsedYearBuilt < 1800 || parsedYearBuilt > new Date().getFullYear() + 5)) { // Allow up to 5 years in future for new constructions
        alert("Year built must be a reasonable year (e.g., after 1800 and not too far in the future).");
        setShowConfirmModal(false);
        return;
    }
    if (formData.title.length < 3 || formData.title.length > 100) {
        alert("Title must be between 3 and 100 characters.");
        setShowConfirmModal(false);
        return;
    }
    if (!formData.location.trim()) {
      alert("Location is required.");
      setShowConfirmModal(false);
      return;
    }
    if (formData.price === '' || Number(formData.price) <= 0) {
      alert("Price must be a positive number.");
      setShowConfirmModal(false);
      return;
    }
    if (formData.bedrooms === '' || Number(formData.bedrooms) < 0) {
      alert("Number of bedrooms must be a non-negative number.");
      setShowConfirmModal(false);
      return;
    }
    if (formData.bathrooms === '' || Number(formData.bathrooms) < 0) {
      alert("Number of bathrooms must be a non-negative number.");
      setShowConfirmModal(false);
      return;
    }
    if (formData.area === '' || Number(formData.area) <= 0) {
      alert("Area must be a positive number.");
      setShowConfirmModal(false);
      return;
    }
    if (!formData.description.trim() || formData.description.length < 10) {
      alert("Description is required and should be at least 10 characters long.");
      setShowConfirmModal(false);
      return;
    }
    if (formData.features.some(f => f.trim() === '')) {
      alert("Please ensure all feature fields are filled or remove empty ones.");
      setShowConfirmModal(false);
      return;
    }
    if (!formData.possession.trim()) {
        alert("Possession status is required (e.g., 'Ready to Move', 'Under Construction').");
        setShowConfirmModal(false);
        return;
    }
    // Check if there's at least one non-empty image URL
    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      alert("At least one image is required. Please upload or provide a URL.");
      setShowConfirmModal(false);
      return;
    }
    // --- End Frontend Validations ---


    // Prepare property data to be sent to the backend
    const propertyData: Omit<Property, 'id'> = {
      title: formData.title,
      price: Number(formData.price),
      location: formData.location,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      type: formData.type,
      status: formData.status,
      description: formData.description,
      features: formData.features.filter(f => f.trim() !== ''), // Filter out empty feature strings
      yearBuilt: Number(formData.yearBuilt),
      parking: Number(formData.parking),
      featured: formData.featured,
      images: validImages, // Use only valid, non-empty image URLs
      possession: formData.possession,
      // Pass agentId: send undefined if it's an empty string so it's not saved or saved as null in MongoDB
      agentId: formData.agentId.trim() === '' ? undefined : formData.agentId,
    };

    try {
      console.log("PropertyForm(WORKING): Calling onSave with data:", propertyData);
      if (property && property.id) {
        // If 'property' prop exists, it's an update operation
        await onSave(propertyData, property.id);
      } else {
        // Otherwise, it's a new creation
        await onSave(propertyData);
      }
      console.log("PropertyForm(WORKING): onSave completed successfully!");
      setShowConfirmModal(false); // Close confirmation modal
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("PropertyForm(WORKING): onSave failed:", error);
      setShowConfirmModal(false); // Close confirmation modal
      alert("Failed to save property. Please check console for details and try again.");
    }
  };

  // Handles the initial form submission (triggers confirmation modal)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true); // Show confirmation modal
  };

  // Functions to manage dynamic feature input fields
  const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  const updateFeature = (index: number, value: string) => setFormData(prev => ({ ...prev, features: prev.features.map((f, i) => i === index ? value : f) }));
  const removeFeature = (index: number) => setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));

  // Functions to manage dynamic image input fields (for Cloudinary URLs or file inputs)
  const addImageField = () => setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  const removeImage = (index: number) => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  // Handler for closing the success modal, which then also closes the form
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onCancel(); // Close the form after successful save
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              {property ? 'Edit Property' : 'Add New Property'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Close Form"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information Section */}
            <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Property Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter property title (e.g., Beautiful Family Home)"
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter price (e.g., 5000000)"
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter property location (e.g., Hyderabad, Telangana)"
                />
              </div>

              <div>
                <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">Year Built <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  id="yearBuilt"
                  name="yearBuilt"
                  required
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter year built (e.g., 2000)"
                  min="1800"
                  max={new Date().getFullYear() + 5} // Allow for future constructions
                />
              </div>
            </div>

            {/* Agent Assignment Section */}
            <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Assign Agent (Optional)</h3>
            <div>
              <label htmlFor="agentId" className="block text-sm font-medium text-gray-700 mb-2">Select Agent</label>
              {loadingAgents ? (
                <p className="text-gray-600">Loading agents...</p>
              ) : errorAgents ? (
                <p className="text-red-500 text-sm">{errorAgents}</p>
              ) : (
                <select
                  id="agentId"
                  name="agentId"
                  value={formData.agentId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- No Agent Assigned --</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>
                      {agent.agentName} ({agent.agentEmail})
                    </option>
                  ))}
                </select>
              )}
            </div>
            {formData.agentId && !loadingAgents && !errorAgents && (
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700 space-y-1 border border-blue-200">
                {(() => {
                  const selectedAgent = agents.find(agent => agent.id === formData.agentId);
                  return selectedAgent ? (
                    <>
                      <p><strong>Selected Agent:</strong> {selectedAgent.agentName}</p>
                      <p><strong>Phone:</strong> {selectedAgent.agentPhone}</p>
                      <p><strong>Email:</strong> {selectedAgent.agentEmail}</p>
                      {selectedAgent.agentPhoto && (
                        <p><strong>Photo:</strong> <a href={selectedAgent.agentPhoto} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Photo</a></p>
                      )}
                    </>
                  ) : (
                    <p className="text-orange-700">Agent details not found for selected ID (might have been deleted).</p>
                  );
                })()}
              </div>
            )}

            {/* Possession Status */}
            <div>
              <label htmlFor="possession" className="block text-sm font-medium text-gray-700 mb-2">Possession Status <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="possession"
                name="possession"
                required
                value={formData.possession}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Ready to Move, Under Construction (Dec 2025)"
              />
            </div>

            {/* Property Details Grid */}
            <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Property Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">Bedrooms <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  required
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">Bathrooms <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  required
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter area in sq ft"
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="parking" className="block text-sm font-medium text-gray-700 mb-2">Parking Spots <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  id="parking"
                  name="parking"
                  required
                  value={formData.parking}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
            </div>

            {/* Type and Status & Featured */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Open Plot</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div className="flex items-center pt-8 md:pt-0">
                <label htmlFor="featured" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Property</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Provide a detailed description of the property, its key selling points, and neighborhood."
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <p className="text-xs text-gray-500 mb-2">Add distinct features like "Swimming Pool", "Gym", "Garden", etc.</p>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Feature ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Feature"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Feature
                </button>
              </div>
            </div>

            {/* Images - Cloudinary Integration Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Images <span className="text-red-500">*</span></label>
              <p className="text-sm text-gray-500 mb-2">Upload images directly using the file input. For existing properties, existing image URLs will be shown.</p>
              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      {/* File Input for Cloudinary Upload */}
                      <label htmlFor={`image-upload-${index}`} className="block text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Upload File:</label>
                      <input
                        type="file"
                        id={`image-upload-${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                 file:rounded-full file:border-0 file:text-sm file:font-semibold
                                 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                        disabled={isUploading} // Disable while any image is uploading
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-end sm:self-center"
                        title="Remove Image Slot"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Upload Status/Error */}
                    {isUploading && (
                        <p className="text-blue-500 text-sm mt-2">Uploading image {index + 1}...</p>
                    )}
                    {uploadError && (
                        <p className="text-red-500 text-sm mt-2">{uploadError}</p>
                    )}

                    {/* Display uploaded image preview or current URL */}
                    {image && (
                      <div className="mt-3 text-sm text-gray-600 flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <span className="font-semibold">Current URL:</span>
                        <a href={image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                          {image.length > 70 ? image.substring(0, 67) + '...' : image} {/* Truncate long URLs for display */}
                        </a>
                        <img 
                        src={image} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded-md ml-0 sm:ml-4 mt-2 sm:mt-0 border border-gray-200" />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 mt-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Image Slot
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t mt-8">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors shadow-md"
                disabled={isUploading} // Disable submit button while any image upload is in progress
              >
                {isUploading ? 'Uploading Images...' : (property ? 'Update Property' : 'Create Property')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation and Success Modals */}
      {showConfirmModal && (
        <ConfirmUpdateModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmedSubmit}
          message={property ? "Are you sure you want to update this property with the new details?" : "Are you sure you want to add this new property?"}
          title={property ? "Confirm Property Update" : "Confirm New Property Creation"}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          message={property ? "Property updated successfully!" : "Property added successfully!"}
        />
      )}
    </>
  );
};













// src/components/admin/PropertyForm.tsx

// Working Modal Without Image URLS-Nor working
// import React, { useState, useEffect } from 'react';
// import { X, Trash2 } from 'lucide-react';
// import { Property } from '../../types/Property';
// import { Agent } from '../../types/Agent'; // Import Agent type
// import ConfirmUpdateModal from './ConfirmUpdateModal';
// import SuccessModal from './SuccessModal';
// import axios from 'axios';

// interface PropertyFormProps {
//   property?: Property | null;
//   onSave: (property: Omit<Property, 'id'>, id?: string) => Promise<void>;
//   onCancel: () => void;
// }


// export const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     price: '',
//     location: '',
//     bedrooms: '',
//     bathrooms: '',
//     area: '',
//     type: 'house' as Property['type'],
//     status: 'for-sale' as Property['status'],
//     description: '',
//     features: [''],
//     yearBuilt: '',
//     parking: '',
//     featured: false,
//     images: [''],
//     possession: '',
//     agentId: '', // Initialize as empty string for optional agent
//   });
//   const [agents, setAgents] = useState<Agent[]>([]); // To store agents fetched from API
//   const [loadingAgents, setLoadingAgents] = useState(true);
//   const [errorAgents, setErrorAgents] = useState<string | null>(null);

//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//   const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
//   const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;


//   // Effect to load existing property data and fetch agents
//   useEffect(() => {
//     // 1. Populate form data from `property` prop
//     if (property) {
//       setFormData({
//         title: property.title ?? '',
//         price: property.price != null ? property.price.toString() : '',
//         location: property.location ?? '',
//         bedrooms: property.bedrooms != null ? property.bedrooms.toString() : '',
//         bathrooms: property.bathrooms != null ? property.bathrooms.toString() : '',
//         area: property.area != null ? property.area.toString() : '',
//         type: property.type ?? 'house',
//         status: property.status ?? 'for-sale',
//         description: property.description ?? '',
//         features: property.features ?? [''],
//         yearBuilt: property.yearBuilt != null ? property.yearBuilt.toString() : '',
//         parking: property.parking != null ? property.parking.toString() : '',
//         featured: property.featured ?? false,
//         images: property.images ?? [''],
//         possession: property.possession ?? '',
//         agentId: property.agentId ?? '', // Set agentId from property, or '' if null/undefined
//       });
//     } else {
//       // Reset form for new property
//       setFormData({
//         title: '', price: '', location: '', bedrooms: '', bathrooms: '', area: '',
//         type: 'house', status: 'for-sale', description: '', features: [''],
//         yearBuilt: '', parking: '', featured: false, images: [''],
//         possession: '',
//         agentId: '', // Reset agentId to empty string
//       });
//     }

//     // 2. Fetch Agents from the /api/agents endpoint
//     const fetchAgents = async () => {
//       setLoadingAgents(true);
//       setErrorAgents(null);
//       try {
//         const response = await axios.get<Agent[]>('/api/agents');

//         // Ensure response.data is an array
//         const agentsData = Array.isArray(response.data) ? response.data : [];

//         setAgents(agentsData);

//       } catch (err) {
//         console.error("Failed to fetch agents:", err);
//         if (axios.isAxiosError(err) && err.response) {
//           setErrorAgents(`Failed to load agents: ${err.response.status} ${err.response.statusText} - ${err.response.data?.message || err.message}`);
//         } else {
//           setErrorAgents("Failed to load agents. Please ensure the agent service is running.");
//         }
//         setAgents([]); // Ensure agents is always an empty array on error
//       } finally {
//         setLoadingAgents(false);
//       }
//     };

//     fetchAgents();
//   }, [property]);


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     // Explicitly cast e.target to the expected element types
//     const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
//     const { name, value, type } = target;

//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
//     }));
//   };

//   const handleConfirmedSubmit = async () => {
//     const parsedYearBuilt = formData.yearBuilt !== '' ? Number(formData.yearBuilt) : null;
//     if (parsedYearBuilt !== null && parsedYearBuilt < 1800) {
//         alert("Year built must be after 1800.");
//         setShowConfirmModal(false);
//         return;
//     }
//     if (formData.title.length < 3 || formData.title.length > 100) {
//         alert("Title must be between 3 and 100 characters.");
//         setShowConfirmModal(false);
//         return;
//     }
//     if (!formData.possession.trim()) {
//         alert("Possession status is required.");
//         setShowConfirmModal(false);
//         return;
//     }

//     const propertyData: Omit<Property, 'id'> = {
//       title: formData.title,
//       price: formData.price !== '' ? Number(formData.price) : 0,
//       location: formData.location,
//       bedrooms: formData.bedrooms !== '' ? Number(formData.bedrooms) : 0,
//       bathrooms: formData.bathrooms !== '' ? Number(formData.bathrooms) : 0,
//       area: formData.area !== '' ? Number(formData.area) : 0,
//       type: formData.type,
//       status: formData.status,
//       description: formData.description,
//       features: formData.features.filter(f => f.trim() !== ''),
//       yearBuilt: parsedYearBuilt as number,
//       parking: formData.parking !== '' ? Number(formData.parking) : 0,
//       featured: formData.featured,
//       images: formData.images.filter(img => img.trim() !== ''),
//       possession: formData.possession,
//       // Pass agentId: send undefined if it's an empty string so it's not saved or saved as null in MongoDB
//       agentId: formData.agentId.trim() === '' ? undefined : formData.agentId,
//     };

//     try {
//       console.log("PropertyForm: Calling onSave...", propertyData);
//       if (property && property.id) {
//         await onSave(propertyData, property.id);
//       } else {
//         await onSave(propertyData);
//       }
//       console.log("PropertyForm: onSave completed successfully! Showing success modal.");
//       setShowConfirmModal(false);
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error("PropertyForm: onSave failed:", error);
//       setShowConfirmModal(false);
//       // Handle error display if needed
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowConfirmModal(true);
//   };

//   const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
//   const updateFeature = (index: number, value: string) => setFormData(prev => ({ ...prev, features: prev.features.map((f, i) => i === index ? value : f) }));
//   const removeFeature = (index: number) => setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));

//   const addImage = () => setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
//   const updateImage = (index: number, value: string) => setFormData(prev => ({ ...prev, images: prev.images.map((img, i) => i === index ? value : img) }));
//   const removeImage = (index: number) => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

//   const handleSuccessModalClose = () => {
//     setShowSuccessModal(false);
//     onCancel();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center p-6 border-b">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {property ? 'Edit Property' : 'Add New Property'}
//             </h2>
//             <button
//               onClick={onCancel}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {/* Basic Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   required
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter property title"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
//                 <input
//                   type="number"
//                   name="price"
//                   required
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter price"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   required
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter location"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
//                 <input
//                   type="number"
//                   name="yearBuilt"
//                   required
//                   value={formData.yearBuilt}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter year built (e.g., 2000)"
//                 />
//               </div>
//             </div>

//             {/* SECTION: SELECT OPTIONAL AGENT */}
//             <h3 className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Assign Agent (Optional)</h3>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Select Agent</label>
//               {loadingAgents ? (
//                 <p>Loading agents...</p>
//               ) : errorAgents ? (
//                 <p className="text-red-500">{errorAgents}</p>
//               ) : (
//                 <select
//                   name="agentId"
//                   value={formData.agentId}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">-- No Agent Assigned --</option> {/* Option for no agent */}
//                   {agents.map(agent => (
//                     <option key={agent.id} value={agent.id}>
//                       {agent.agentName} ({agent.agentEmail})
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//             {/* Display selected agent details (optional, fetch details if needed) */}
//             {formData.agentId && !loadingAgents && !errorAgents && (
//               <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-1">
//                 {
//                   (() => {
//                     const selectedAgent = agents.find(agent => agent.id === formData.agentId);
//                     return selectedAgent ? (
//                       <>
//                         <p><strong>Selected Agent:</strong> {selectedAgent.agentName}</p>
//                         <p><strong>Phone:</strong> {selectedAgent.agentPhone}</p>
//                         <p><strong>Email:</strong> {selectedAgent.agentEmail}</p>
//                         {selectedAgent.agentPhoto && <p><strong>Photo:</strong> <a href={selectedAgent.agentPhoto} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Photo</a></p>}
//                       </>
//                     ) : (
//                       <p>Agent details not found for selected ID.</p>
//                     );
//                   })()
//                 }
//               </div>
//             )}
//             {/* END SECTION: SELECT OPTIONAL AGENT */}

//             {/* Possession Status */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Possession Status</label>
//               <input
//                 type="text"
//                 name="possession"
//                 required
//                 value={formData.possession}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., Ready to Move, Under Construction"
//               />
//             </div>

//             {/* Property Details */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
//                 <input
//                   type="number"
//                   name="bedrooms"
//                   required
//                   value={formData.bedrooms}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
//                 <input
//                   type="number"
//                   name="bathrooms"
//                   required
//                   value={formData.bathrooms}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
//                 <input
//                   type="number"
//                   name="area"
//                   required
//                   value={formData.area}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter area"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
//                 <input
//                   type="number"
//                   name="parking"
//                   required
//                   value={formData.parking}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Type and Status */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="house">House</option>
//                   <option value="apartment">Apartment</option>
//                   <option value="condo">Open Plot</option>
//                   <option value="townhouse">Townhouse</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="for-sale">For Sale</option>
//                   <option value="for-rent">For Rent</option>
//                   <option value="sold">Sold</option>
//                 </select>
//               </div>

//               <div className="flex items-center">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="featured"
//                     checked={formData.featured}
//                     onChange={handleChange}
//                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="text-sm font-medium text-gray-700">Featured Property</span>
//                 </label>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 name="description"
//                 required
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                 placeholder="Enter property description"
//               />
//             </div>

//             {/* Features */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
//               <div className="space-y-2">
//                 {formData.features.map((feature, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <input
//                       type="text"
//                       value={feature}
//                       onChange={(e) => updateFeature(index, e.target.value)}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter feature"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeFeature(index)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addFeature}
//                   className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//                 >
//                   + Add Feature
//                 </button>
//               </div>
//             </div>

//             {/* Images */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
//               <div className="space-y-2">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <input
//                       type="url"
//                       value={image}
//                       onChange={(e) => updateImage(index, e.target.value)}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter image URL"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addImage}
//                   className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//                 >
//                   + Add Image
//                 </button>
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6 border-t">
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
//               >
//                 {property ? 'Update Property' : 'Create Property'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <ConfirmUpdateModal
//         isOpen={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onConfirm={handleConfirmedSubmit}
//       />

//       <SuccessModal
//         isOpen={showSuccessModal}
//         onClose={handleSuccessModalClose}
//       />
//     </>
//   );
// };


// just removed the concept of Agent id