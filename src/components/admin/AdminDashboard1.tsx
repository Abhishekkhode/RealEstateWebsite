import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Property } from '../../types/Property';
import { apiService } from '../../services/api';
import { PropertyForm } from './PropertyForm(WORKING)';
import { PropertyCard } from '../PropertyCard';

export const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    forSale: 0,
    forRent: 0,
    featured: 0
  });

  useEffect(() => {
    loadProperties();
    loadStats();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProperties();
      // Map PropertyResponse[] to Property[]
      setProperties(
        data.map((item: any) => ({
          ...item,
          type: item.type as 'house' | 'apartment' | 'condo' | 'townhouse'
        }))
      );
      setError('');
    } catch (err) {
      setError('Failed to load properties');
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await apiService.getPropertyStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProperty = async (propertyData: Omit<Property, 'id'>) => {
    try {
      setLoading(true);
      // Ensure yearBuilt is always a number (not undefined)
      const propertyToSend = {
        ...propertyData,
        yearBuilt: propertyData.yearBuilt ?? 0 // or use a sensible default
      };
      const newProperty = await apiService.createProperty(propertyToSend);
      // Ensure newProperty matches Property type (especially 'type')
      const propertyToAdd: Property = {
        ...newProperty,
        type: newProperty.type as 'house' | 'apartment' | 'condo' | 'townhouse',
        status: newProperty.status as 'for-sale' | 'for-rent' | 'sold'
      };
      setProperties(prev => [propertyToAdd, ...prev]);
      setShowForm(false);
      loadStats(); // Refresh stats
      setError('');
    } catch (err) {
      setError('Failed to create property');
      console.error('Error creating property:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProperty = async (propertyData: Omit<Property, 'id'>) => {
    if (!editingProperty) return;
    
    try {
      setLoading(true);
      // Ensure yearBuilt is always a number (not undefined)
      const propertyToSend = {
        ...propertyData,
        yearBuilt: propertyData.yearBuilt ?? 0 // or use a sensible default
      };
      const updatedProperty = await apiService.updateProperty(editingProperty.id, propertyToSend);
      setProperties(prev => prev.map(p => 
        p.id === editingProperty.id
          ? {
              ...updatedProperty,
              type: updatedProperty.type as 'house' | 'apartment' | 'condo' | 'townhouse',
              status: updatedProperty.status as 'for-sale' | 'for-rent' | 'sold'
            }
          : p
      ));
      setEditingProperty(null);
      setShowForm(false);
      loadStats(); // Refresh stats
      setError('');
    } catch (err) {
      setError('Failed to update property');
      console.error('Error updating property:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      setLoading(true);
      await apiService.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      loadStats(); // Refresh stats
      setError('');
    } catch (err) {
      setError('Failed to delete property');
      console.error('Error deleting property:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  if (loading && properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
            <p className="text-gray-600">Manage your real estate listings</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
            <button 
              onClick={() => setError('')}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">For Sale</h3>
            <p className="text-2xl font-bold text-green-600">{stats.forSale}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">For Rent</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.forRent}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Featured</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.featured}</p>
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
                onViewDetails={setSelectedProperty}
              />
              
              {/* Admin Actions Overlay */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProperty(property)}
                    disabled={loading}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg shadow-lg transition-colors"
                    title="Edit Property"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    disabled={loading}
                    className="p-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg shadow-lg transition-colors"
                    title="Delete Property"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading...</p>
          </div>
        )}
      </div>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSave={editingProperty ? handleUpdateProperty : handleCreateProperty}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};