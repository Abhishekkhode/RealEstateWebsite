// // src/components/admin/PropertyForm(WORKING).tsx
// import React, { useState, useEffect } from 'react';
// import { Property } from '../../types/Property';
// import { X, Loader2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface PropertyFormProps {
//   property?: Property | null; // Optional, for editing
//   onSave: (propertyData: Omit<Property, 'id'>) => void;
//   onCancel: () => void;
// }

// export const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel }) => {
//   const [formData, setFormData] = useState<Omit<Property, 'id'>>({
//     title: '',
//     description: '',
//     location: '',
//     price: 0,
//     bedrooms: 0,
//     bathrooms: 0,
//     area: 0,
//     parking: 0,
//     status: 'for-sale',
//     images: [],
//     featured: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   useEffect(() => {
//     if (property) {
//       setFormData({
//         title: property.title || '',
//         description: property.description || '',
//         location: property.location || '',
//         // Ensure price, bedrooms, etc., are always numbers, defaulting to 0 if null/undefined
//         price: property.price ?? 0, // Use nullish coalescing operator ??
//         bedrooms: property.bedrooms ?? 0,
//         bathrooms: property.bathrooms ?? 0,
//         area: property.area ?? 0,
//         parking: property.parking ?? 0,
//         status: property.status || 'for-sale',
//         images: property.images || [],
//         featured: property.featured || false,
//         // amenities: property.amenities || [],
//       });
//       setImagePreviews(property.images || []);
//     } else {
//       setFormData({
//         title: '',
//         description: '',
//         location: '',
//         price: 0,
//         bedrooms: 0,
//         bathrooms: 0,
//         area: 0,
//         parking: 0,
//         status: 'for-sale',
//         images: [],
//         featured: false,
//         // amenities: [],
//       });
//       setImageFiles([]);
//       setImagePreviews([]);
//     }
//   }, [property]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Convert to number, default to 0 for invalid inputs
//     const value = parseFloat(e.target.value);
//     setFormData(prev => ({
//       ...prev,
//       price: isNaN(value) ? 0 : value, // Handle potential NaN from parseFloat
//     }));
//   };

//   const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // Convert to integer, default to 0 for invalid inputs
//     const numValue = parseInt(value);
//     setFormData(prev => ({
//       ...prev,
//       [name]: isNaN(numValue) ? 0 : numValue, // Handle potential NaN from parseInt
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setImageFiles(prev => [...prev, ...files]);

//       const newPreviews = files.map(file => URL.createObjectURL(file));
//       setImagePreviews(prev => [...prev, ...newPreviews]);
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     setImageFiles(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     let uploadedImageUrls: string[] = [];
//     if (imageFiles.length > 0) {
//       try {
//         uploadedImageUrls = await Promise.all(imageFiles.map(async (file) => {
//           // *** IMPORTANT: Replace this with your actual image upload API call ***
//           // Example: const response = await apiService.uploadImage(file);
//           //          return response.imageUrl;
//           console.log(`Simulating upload for ${file.name}`);
//           return new Promise<string>(resolve => setTimeout(() => resolve(`https://example.com/uploaded/${file.name}`), 500));
//         }));
//       } catch (uploadError) {
//         console.error("Error uploading images:", uploadError);
//         setLoading(false);
//         // You might want to show a user-facing error message here
//         return; // Stop form submission if image upload fails
//       }
//     }

//     // Combine existing images (that are still in previews) and newly uploaded images
//     const existingImageUrls = formData.images.filter(url => imagePreviews.includes(url));
//     const finalImages = [...existingImageUrls, ...uploadedImageUrls];

//     const dataToSave: Omit<Property, 'id'> = {
//       ...formData,
//       images: finalImages,
//       // amenities: formData.amenities.filter(a => a.trim() !== ''), // Filter out empty amenity strings
//     };

//     try {
//       await onSave(dataToSave);
//     } catch (err) {
//       console.error("Error saving property:", err);
//       // You might want to show a user-facing error message here
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formTitle = property ? 'Edit Property' : 'Add New Property';

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
//         onClick={onCancel}
//       >
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 50, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 200, damping: 20 }}
//           className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             onClick={onCancel}
//             className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
//             title="Close Form"
//           >
//             <X className="h-6 w-6 text-gray-600" />
//           </button>

//           <div className="p-6">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">{formTitle}</h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left Column */}
//               <div>
//                 <div className="mb-4">
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={formData.title} // Ensure this is always string
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     value={formData.description} // Ensure this is always string
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                   <input
//                     type="text"
//                     id="location"
//                     name="location"
//                     value={formData.location} // Ensure this is always string
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={formData.price} // Ensure this is always number
//                     onChange={handlePriceChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                   <select
//                     id="status"
//                     name="status"
//                     value={formData.status} // Ensure this is always string
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   >
//                     <option value="for-sale">For Sale</option>
//                     <option value="for-rent">For Rent</option>
//                     <option value="sold">Sold</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div>
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
//                     <input
//                       type="number"
//                       id="bedrooms"
//                       name="bedrooms"
//                       value={formData.bedrooms} // Ensure this is always number
//                       onChange={handleNumericChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
//                     <input
//                       type="number"
//                       id="bathrooms"
//                       name="bathrooms"
//                       value={formData.bathrooms} // Ensure this is always number
//                       onChange={handleNumericChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
//                     <input
//                       type="number"
//                       id="area"
//                       name="area"
//                       value={formData.area} // Ensure this is always number
//                       onChange={handleNumericChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="parking" className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
//                     <input
//                       type="number"
//                       id="parking"
//                       name="parking"
//                       value={formData.parking} // Ensure this is always number
//                       onChange={handleNumericChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
//                   <input
//                     type="file"
//                     id="images"
//                     name="images"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="w-full text-sm text-gray-500
//                                file:mr-4 file:py-2 file:px-4
//                                file:rounded-full file:border-0
//                                file:text-sm file:font-semibold
//                                file:bg-blue-50 file:text-blue-700
//                                hover:file:bg-blue-100"
//                   />
//                   <div className="mt-2 grid grid-cols-3 gap-2">
//                     {imagePreviews.map((src, index) => (
//                       <div key={index} className="relative group w-24 h-24 rounded-md overflow-hidden">
//                         <img src={src} alt={`Property Image ${index + 1}`} className="w-full h-full object-cover" />
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveImage(index)}
//                           className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
//                           title="Remove image"
//                         >
//                           <X className="h-6 w-6" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id="featured"
//                       name="featured"
//                       checked={formData.featured}
//                       onChange={handleChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Featured Property</label>
//                   </div>
//                 </div>

//                 {/* Amenities - Can be a more complex input (e.g., tags) */}
//                 {/* <div className="mb-4">
//                   <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
//                   <input
//                     type="text"
//                     id="amenities"
//                     name="amenities"
//                     // Ensure this is always a string. Join the array for display.
//                     value={formData.amenities ? formData.amenities.join(', ') : ''}
//                     onChange={(e) => setFormData(prev => ({ ...prev, amenities: e.target.value.split(',').map(s => s.trim()) }))}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div> */}
//               </div>

//               {/* Form Actions */}
//               <div className="md:col-span-2 flex justify-end space-x-4 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-semibold"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold flex items-center justify-center space-x-2"
//                   disabled={loading}
//                 >
//                   {loading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
//                   <span>{property ? 'Update Property' : 'Add Property'}</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };










import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Property } from '../../types/Property'; // Ensure this path is correct
import ConfirmUpdateModal from './ConfirmUpdateModal'; // Ensure this path is correct
import SuccessModal from './SuccessModal'; // Adjust this path based on your SuccessModal location

interface PropertyFormProps {
  property?: Property | null; // property can be optional or null for new entries
  onSave: (property: Omit<Property, 'id'>, id?: string) => Promise<void>;
  onCancel: () => void;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel }) => {
  // Initial state for new properties or when no property is being edited
  // const [formData, setFormData] =
  //  useState({
  //   title: '',
  //   price: '',
  //   location: '',
  //   bedrooms: '',
  //   bathrooms: '',
  //   area: '',
  //   type: 'house' as Property['type'],
  //   status: 'for-sale' as Property['status'],
  //   description: '',
  //   features: [''],
  //   yearBuilt: '',
  //   parking: '',
  //   featured: false,
  //   images: ['']
  // });
    const [formData, setFormData] = useState({
    title: '',
    price: '', // <--- Initialized to empty string
    location: '',
    bedrooms: '', // <--- Initialized to empty string
    bathrooms: '', // <--- Initialized to empty string
    area: '',     // <--- Initialized to empty string
    type: 'house' as Property['type'],
    status: 'for-sale' as Property['status'],
    description: '',
    features: [''],
    yearBuilt: '', // <--- Initialized to empty string
    parking: '',   // <--- Initialized to empty string
    featured: false,
    images: ['']
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State to control ConfirmUpdateModal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New state for SuccessModal visibility

  // This useEffect ensures the form is populated correctly when a property is passed in
  useEffect(() => {
    console.log("PropertyForm useEffect triggered. Property prop:", property); // Debug log
    if (property) {
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
    features: property.features ?? [''],
    yearBuilt: property.yearBuilt != null ? property.yearBuilt.toString() : '',
    parking: property.parking != null ? property.parking.toString() : '',
    featured: property.featured ?? false,
    images: property.images ?? ['']
  });
}
else {
        // When property is null (e.g., for adding a new property), reset form to initial state
        console.log("PropertyForm: Property is null/undefined. Resetting form data."); // Debug log
        setFormData({
            title: '', price: '', location: '', bedrooms: '', bathrooms: '', area: '',
            type: 'house', status: 'for-sale', description: '', features: [''],
            yearBuilt: '', parking: '', featured: false, images: ['']
        });
    }
  }, [property]); // Dependency array to re-run when 'property' prop changes

  // --- Modified handleConfirmedSubmit to await the onSave operation and show success modal ---
 const handleConfirmedSubmit = async () => {
  const propertyData: Omit<Property, 'id'> = {
    title: formData.title,
    price: formData.price !== '' ? Number(formData.price) : 0,
    location: formData.location,
    bedrooms: formData.bedrooms !== '' ? Number(formData.bedrooms) : 0,
    bathrooms: formData.bathrooms !== '' ? Number(formData.bathrooms) : 0,
    area: formData.area !== '' ? Number(formData.area) : 0,
    type: formData.type,
    status: formData.status,
    description: formData.description,
    features: formData.features.filter(f => f.trim() !== ''),
    yearBuilt: formData.yearBuilt !== '' ? Number(formData.yearBuilt) : 0,
    parking: formData.parking !== '' ? Number(formData.parking) : 0,
    featured: formData.featured,
    images: formData.images.filter(img => img.trim() !== '')
  };

  try {
    console.log("PropertyForm: Calling onSave...");
    if (property && property.id) {
      await onSave(propertyData, property.id);
    } else {
      await onSave(propertyData);
    }
    console.log("PropertyForm: onSave completed successfully! Showing success modal.");
    setShowConfirmModal(false); // ✅ Close confirmation modal
    setShowSuccessModal(true);  // ✅ Show success modal
  } catch (error) {
    console.error("PropertyForm: Error saving property:", error);
  }
};


  // --- Modified handleSubmit to trigger the modal for updates ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PropertyForm: Form submitted."); // Debug log
    if (property && property.id) {
      // If editing an existing property, show the confirmation modal
      console.log("PropertyForm: Editing existing property. Showing confirmation modal."); // Debug log
      setShowConfirmModal(true);
    } else {
      // If creating a new property, proceed directly
      console.log("PropertyForm: Creating new property. Proceeding with submit."); // Debug log
      void handleConfirmedSubmit(); // Use `void` to explicitly mark as unawaited promise.
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  const updateFeature = (index: number, value: string) => setFormData(prev => ({ ...prev, features: prev.features.map((f, i) => i === index ? value : f) }));
  const removeFeature = (index: number) => setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));

  const addImage = () => setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  const updateImage = (index: number, value: string) => setFormData(prev => ({ ...prev, images: prev.images.map((img, i) => i === index ? value : img) }));
  const removeImage = (index: number) => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  // Handler for when the success modal is closed
  const handleSuccessModalClose = () => {
    console.log("PropertyForm: Closing success modal and triggering onCancel."); // Debug log
    setShowSuccessModal(false); // Hide the success modal
    onCancel(); // Close the main PropertyForm after success modal is dismissed
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
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
                  <option value="condo">Condo</option>
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

      {/* Confirmation Modal */}
      <ConfirmUpdateModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmedSubmit}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
      />
    </>
  );
};