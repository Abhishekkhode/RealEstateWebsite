// // src/components/admin/AdminDashboard.tsx
// import React, { useState, useEffect, useCallback } from 'react'; // Added useEffect, useCallback
// import { Plus, LogOut,Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
// import { Property } from '../../types/Property';
// // import { properties as initialProperties } from '../../data/properties'; // REMOVE THIS IMPORT
// import { PropertyForm } from './PropertyForm(WORKING)';
// import { PropertyCard } from '../PropertyCard';
// import { apiService } from '../../services/api'; // Import the new apiService
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import ConfirmLogoutModal from '../ConfirmLogoutModal';
// // D:\Surya Property Consultant (FrontEnd)\src\components\ConfirmLogoutModal.tsx
// // import { LogOut } from 'lucide-react';


// export const AdminDashboard: React.FC = () => {
//   const [properties, setProperties] = useState<Property[]>([]); // Initialize with empty array
//   const [showForm, setShowForm] = useState(false);
//   const [editingProperty, setEditingProperty] = useState<Property | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
//   const [isLoading, setIsLoading] = useState(true); // New state for loading
//   const [error, setError] = useState<string | null>(null); // New state for errors


  
// //   const handleLogout = () => {
// //   localStorage.removeItem('token'); // Or sessionStorage, depending on what you used
// //   window.location.href = '/admin/login'; // OR use navigate("/admin/login")
// // };
// // const handleLogout = () => {
// //   localStorage.removeItem('token'); // Clear the token
// //   navigate('/admin/login');         // Redirect to login page
// // };
// // 
// //  // Update this path as needed

// const navigate = useNavigate();
// const { setAdmin } = useAuth();
// const { logout } = useAuth();
// const [showModal, setShowModal] = useState(false);

// const handleLogout = () => {
//   localStorage.removeItem('token');
//   setAdmin(null); // Clear admin context
//   navigate('/admin/login');
// };




//   // Function to fetch properties from the backend
//   const fetchProperties = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await apiService.getProperties(); // API call
//       setProperties(data);
//     } catch (err) {
//       console.error("Error fetching properties for admin:", err);
//       setError("Failed to load properties. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Fetch properties on component mount
//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   // OLD VERSION
//   // const filteredProperties = properties.filter(property => {
//   //   const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
//   //   const matchesStatus = !statusFilter || property.status === statusFilter;
//   //   return matchesSearch && matchesStatus;
//   // });
//   const filteredProperties = properties.filter(property => {
//   // Safely access title and location, ensuring they are strings before calling toLowerCase()
//   const title = property.title || ''; // Default to empty string if null/undefined
//   const location = property.location || ''; // Default to empty string if null/undefined

//   const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         location.toLowerCase().includes(searchTerm.toLowerCase());
//   const matchesStatus = !statusFilter || property.status === statusFilter;
//   return matchesSearch && matchesStatus;
// });

//   const handleCreateProperty = async (propertyData: Omit<Property, 'id'>) => {
//     try {
//       const newProperty = await apiService.createProperty(propertyData); // API call
//       setProperties(prev => [newProperty, ...prev]);
//       setShowForm(false);
//     } catch (err) {
//       console.error("Error creating property:", err);
//       setError("Failed to create property. Please try again.");
//     }
//   };

//   // const handleUpdateProperty = async (propertyData: Omit<Property, 'id'>) => {
//   //   if (editingProperty) {
//   //     try {
//   //       const updatedProperty = await apiService.updateProperty(editingProperty.id, propertyData); // API call
//   //       setProperties(prev => prev.map(p =>
//   //         p.id === editingProperty.id ? updatedProperty : p
//   //       ));
//   //       setEditingProperty(null);
//   //       setShowForm(false);
//   //     } catch (err) {
//   //       console.error("Error updating property:", err);
//   //       setError("Failed to update property. Please try again.");
//   //     }
//   //   }
//   // };
//     const handleUpdateProperty = async (propertyData: Omit<Property, 'id'>) => {
//   if (editingProperty) {
//     try {
//       const updatedProperty = await apiService.updateProperty(editingProperty.id, propertyData);
//       setProperties(prev =>
//         prev.map(p => (p.id === editingProperty.id ? updatedProperty : p))
//       );
//       setEditingProperty(null);
//       setShowForm(false);
//     } catch (err) {
//       console.error("Error updating property:", err);
//       setError("Failed to update property. Please try again.");
//     }
//   }
// };


//   const handleDeleteProperty = async (id: string) => {
//     if (confirm('Are you sure you want to delete this property?')) {
//       try {
//         await apiService.deleteProperty(id); // API call
//         setProperties(prev => prev.filter(p => p.id !== id));
//       } catch (err) {
//         console.error("Error deleting property:", err);
//         setError("Failed to delete property. Please try again.");
//       }
//     }
//   };
//   const handleEditClick = (property: Property) => {
//   setEditingProperty(property);
//   setShowForm(true);
//   };

//   // const handleEditProperty = (property: Property) => {
//   //   setEditingProperty(property);
//   //   setShowForm(true);
//   // };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setEditingProperty(null);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//         <p className="text-red-600 text-lg mb-4">{error}</p>
//         <button
//           onClick={fetchProperties}
//           className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
//             <p className="text-gray-600">Manage your real estate listings</p>
//           </div>
//           <div className="flex gap-4">
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Property</span>
//           </button>
//           <motion.button
//               whileHover={{ scale: 1.08, backgroundColor: "#ef4444" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
//               style={{ marginLeft: 12 }}
//             >
//               Logout
//             </motion.button>
//           </div>
//         </div> */}
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
//         <p className="text-gray-600">Manage your real estate listings</p>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
//         {/* Add Property Button */}
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-transform duration-300 transform hover:scale-105"
//         >
//           <Plus className="h-5 w-5" />
//           <span>Add Property</span>
//         </button>
//         <motion.button
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//           //Basic Logout
//           // onClick={logout}
//           // Using Computers Alters to log out
//         //   onClick={() => {
//         //   const confirmed = window.confirm("Are you sure you want to sign out?");
//         //   if (confirmed) logout();
//         // }}
//         onClick={() => setShowModal(true)}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
//           style={{ marginLeft: 12 }}
//           >
//             <LogOut size={20} strokeWidth={2} />
//           <span>Sign Out</span>
//         </motion.button>
//         <ConfirmLogoutModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={() => {
//           setShowModal(false);
//           logout();
//         }}
//       />
//       </div>
//     </div>

//         {/* Header End */}

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
//             <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-sm font-medium text-gray-500">For Sale</h3>
//             <p className="text-2xl font-bold text-green-600">
//               {properties.filter(p => p.status === 'for-sale').length}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-sm font-medium text-gray-500">For Rent</h3>
//             <p className="text-2xl font-bold text-blue-600">
//               {properties.filter(p => p.status === 'for-rent').length}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-sm font-medium text-gray-500">Featured</h3>
//             <p className="text-2xl font-bold text-yellow-600">
//               {properties.filter(p => p.featured).length}
//             </p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search properties..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <div className="sm:w-48">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">All Status</option>
//                 <option value="for-sale">For Sale</option>
//                 <option value="for-rent">For Rent</option>
//                 <option value="sold">Sold</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Properties Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProperties.map((property) => (
//             <div key={property.id} className="relative group">
//               <PropertyCard
//                 property={property}
//                 onViewDetails={setSelectedProperty}
//               />

//               {/* Admin Actions Overlay */}
//               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEditClick(property)}
//                     className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
//                     title="Edit Property."
//                   >
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteProperty(property.id)}
//                     className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors"
//                     title="Delete Property"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredProperties.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
//           </div>
//         )}
//       </div>

//       {/* Property Form Modal */}
//       {showForm && (
//         <PropertyForm
//           property={editingProperty}
//           onSave={editingProperty ? handleUpdateProperty : handleCreateProperty}
//           onCancel={handleCloseForm}
//         />
//       )}
//     </div>
//   );
// };








// src/components/admin/AdminDashboard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, LogOut, Search, Trash2 } from 'lucide-react';
import { Property } from '../../types/Property';
import { PropertyForm } from './PropertyForm(WORKING)';
import { PropertyCard } from '../PropertyCard';
import { apiService } from '../../services/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmLogoutModal from '../ConfirmLogoutModal';
import { PropertyDetailsModal } from './PropertyDetailsModal'; // Import the new modal component

export const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null); // State to hold the property for details modal
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setAdmin, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Renamed for clarity with other modals

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getProperties();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties for admin:", err);
      setError("Failed to load properties. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filteredProperties = properties.filter(property => {
    const title = property.title || '';
    const location = property.location || '';

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProperty = async (propertyData: Omit<Property, 'id'>) => {
    try {
      const newProperty = await apiService.createProperty(propertyData);
      setProperties(prev => [newProperty, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error("Error creating property:", err);
      setError("Failed to create property. Please try again.");
    }
  };

  const handleUpdateProperty = async (propertyData: Omit<Property, 'id'>) => {
    if (editingProperty) {
      try {
        const updatedProperty = await apiService.updateProperty(editingProperty.id, propertyData);
        setProperties(prev =>
          prev.map(p => (p.id === editingProperty.id ? updatedProperty : p))
        );
        setEditingProperty(null);
        setShowForm(false);
      } catch (err) {
        console.error("Error updating property:", err);
        setError("Failed to update property. Please try again.");
      }
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await apiService.deleteProperty(id);
        setProperties(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error("Error deleting property:", err);
        setError("Failed to delete property. Please try again.");
      }
    }
  };

  const handleEditPropertyFromCard = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  // This function now explicitly sets the selected property AND opens the modal
  const handleViewDetailsClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  // Function to close the Property Details Modal
  const handleCloseDetailsModal = () => {
    setSelectedProperty(null); // Clear the selected property to close the modal
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={fetchProperties}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
            <p className="text-gray-600">Manage your real estate listings</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
            {/* Add Property Button */}
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-transform duration-300 transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span>Add Property</span>
            </button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogoutModal(true)} // Use renamed state
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
              style={{ marginLeft: 12 }}
            >
              <LogOut size={20} strokeWidth={2} />
              <span>Sign Out</span>
            </motion.button>
            <ConfirmLogoutModal
              isOpen={showLogoutModal} // Use renamed state
              onClose={() => setShowLogoutModal(false)} // Use renamed state
              onConfirm={() => {
                setShowLogoutModal(false); // Use renamed state
                logout();
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
            <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">For Sale</h3>
            <p className="text-2xl font-bold text-green-600">
              {properties.filter(p => p.status === 'for-sale').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">For Rent</h3>
            <p className="text-2xl font-bold text-blue-600">
              {properties.filter(p => p.status === 'for-rent').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Featured</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {properties.filter(p => p.featured).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="relative group">
              <PropertyCard
                property={property}
                onViewDetails={handleViewDetailsClick}
                onEditProperty={handleEditPropertyFromCard}
                isAdminView={true}
              />

              {/* Admin Actions Overlay (Only Delete remains) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors"
                    title="Delete Property"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Property Form Modal (for Add/Edit) */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSave={editingProperty ? handleUpdateProperty : handleCreateProperty}
          onCancel={handleCloseForm}
        />
      )}

      {/* Property Details Modal (for View Details) */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
};