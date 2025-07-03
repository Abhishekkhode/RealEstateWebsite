import React from 'react';
import { Home, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminHeader: React.FC = () => {
  const { admin, logout } = useAuth();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-700" />
            <div>
              <span className="text-xl font-bold text-gray-900">Elite Estates</span>
              <span className="text-sm text-gray-500 ml-2">Admin Portal</span>
            </div>
          </div>

          {/* Admin Info & Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>Welcome, {admin?.name}</span>
            </div>
            
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};