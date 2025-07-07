import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminLogin}  from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { PropertyFilters } from './components/PropertyFilters';
import { About } from './components/About';
import  {Contact}  from './components/Contact';
import  Footer  from './components/Footer';
import { Property } from './types/Property';
import { apiService } from './services/api';

function AppContent() {
  const { admin,setAdmin, isLoading } = useAuth();

  const [activeSection, setActiveSection] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priceRange: '',
    bedrooms: ''
  });

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
}, [activeSection]);

  useEffect(() => {
    apiService.getProperties()
      .then(res => {
        setProperties(res);
        setFilteredProperties(res);
      })
      .catch(err => {
        console.error("Error fetching properties for public view:", err);
      });
  }, []);

  // useEffect(() => {
  //   let filtered = [...properties];

  //   if (filters.type) {
  //     filtered = filtered.filter(property => property.type === filters.type);
  //   }
  //   if (filters.status) {
  //     filtered = filtered.filter(property => property.status === filters.status);
  //   }
  //   if (filters.priceRange) {
  //     if (filters.priceRange === '1000000+') {
  //       filtered = filtered.filter(property => property.price >= 1000000);
  //     } else {
  //       const [min, max] = filters.priceRange.split('-').map(Number);
  //       filtered = filtered.filter(property => property.price >= min && property.price <= max);
  //     }
  //   }
  //   if (filters.bedrooms) {
  //     const minBedrooms = parseInt(filters.bedrooms);
  //     filtered = filtered.filter(property => property.bedrooms >= minBedrooms);
  //   }
  //   setFilteredProperties(filtered);
  // }, [filters, properties]);
  useEffect(() => {
    let filtered = [...properties];

    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }
    if (filters.status) {
      filtered = filtered.filter(property => property.status === filters.status);
    }
    if (filters.priceRange) {
      if (filters.priceRange === '1000000+') {
        filtered = filtered.filter(property => property.price !== null && property.price >= 1000000);
      } else {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter(property => property.price !== null && property.price >= min && property.price <= max);
      }
    }
    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms);
      filtered = filtered.filter(property => property.bedrooms !== null && property.bedrooms >= minBedrooms);
    }
    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleSearch = (searchFilters: { location: string; type: string; priceRange: string }) => {
    setActiveSection('properties');
    setFilters(prev => ({
      ...prev,
      type: searchFilters.type,
      priceRange: searchFilters.priceRange
    }));
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const featuredProperties = properties.filter(property => property.featured);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  // --- Public Website Routes ---
  const sectionVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  const PublicWebsite = () => (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />

      <AnimatePresence mode="wait">
        {activeSection === 'home' && (
          <motion.div
            key="home"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <Hero onSearch={handleSearch} />
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our handpicked selection of premium properties</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} />
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button
                    onClick={() => setActiveSection('properties')}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View All Properties
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === 'properties' && (
          <motion.div
            key="properties"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <div className="pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Properties</h1>
                  <p className="text-xl text-gray-600">Find your perfect property from our extensive collection</p>
                </div>
                <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
                <div className="mb-6 text-sm text-gray-600">
                  Showing {filteredProperties.length} of {properties.length} properties
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} />
                  ))}
                </div>
                {filteredProperties.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No properties match your current filters.</p>
                    <button
                      onClick={() => setFilters({ type: '', status: '', priceRange: '', bedrooms: '' })}
                      className="mt-4 text-blue-700 hover:text-blue-800 font-semibold"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'about' && (
          <motion.div
            key="about"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <About />
          </motion.div>
        )}

        {activeSection === 'contact' && (
          <motion.div
            key="contact"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleViewing={() => {
          setSelectedProperty(null);
          setActiveSection('contact');
        }}
      />
    </div>
  );
  
  // --- Protected Route Wrapper ---
  // const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  //   if (!admin) {
  //     return <Navigate to="/admin/login" replace />;
  //   }
  //   return children;
  // };
  // const { admin, setAdmin } = useAuth();


const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};


  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicWebsite />} />
      {/* Admin Login Route - accessible by everyone */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      } />

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
}

function App() {
  return (
    // <Router>
    //   <AuthProvider>
    //     <AppContent />
    //   </AuthProvider>
    // </Router>
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;

// // src/App.tsx
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Router, Routes, Route, and Navigate
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { AdminLogin } from './components/admin/AdminLogin';
// import { AdminDashboard } from './components/admin/AdminDashboard';
// import { Header } from './components/Header';
// import { Hero } from './components/Hero';
// import { PropertyCard } from './components/PropertyCard';
// import { PropertyModal } from './components/PropertyModal';
// import { PropertyFilters } from './components/PropertyFilters';
// import { About } from './components/About';
// // import { Contact } from './components/Contact(OLD)';
// import { Contact } from './components/Contact';
// import { Footer } from './components/Footer';
// import { Property } from './types/Property';
// import { apiService } from './services/api'; // Use apiService for all API calls

// // This component will contain the main application logic for public and admin views.
// // It will now rely on React Router's <Routes> and <Route> for navigation.
// function AppContent() {
//   const { admin, isLoading } = useAuth(); // Use the auth context

//   // State for public-facing property data
//   const [activeSection, setActiveSection] = useState('home'); // Still used for internal component visibility
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
//   const [filters, setFilters] = useState({
//     type: '',
//     status: '',
//     priceRange: '',
//     bedrooms: ''
//   });


//   //   const handleEditClick = (property: Property) => {
//   //   setEditingProperty(property);
//   //   setShowForm(true);
//   // };

  

//   // Fetch properties from backend for public view
//   useEffect(() => {
//     // Only fetch if not an admin route or if admin is null (public view)
//     // This optimization might be complex, so let's fetch generally for now
//     apiService.getProperties()
//       .then(res => {
//         setProperties(res); // apiService directly returns data
//         setFilteredProperties(res);
//       })
//       .catch(err => {
//         console.error("Error fetching properties for public view:", err);
//       });
//   }, []);

//   // Filter properties based on current filters (client-side filtering after fetch)
//   useEffect(() => {
//     let filtered = [...properties];

//     if (filters.type) {
//       filtered = filtered.filter(property => property.type === filters.type);
//     }

//     if (filters.status) {
//       filtered = filtered.filter(property => property.status === filters.status);
//     }

//     if (filters.priceRange) {
//       if (filters.priceRange === '1000000+') {
//         filtered = filtered.filter(property => property.price >= 1000000);
//       } else {
//         const [min, max] = filters.priceRange.split('-').map(Number);
//         filtered = filtered.filter(property => property.price >= min && property.price <= max);
//       }
//     }

//     if (filters.bedrooms) {
//       const minBedrooms = parseInt(filters.bedrooms);
//       filtered = filtered.filter(property => property.bedrooms >= minBedrooms);
//     }

//     setFilteredProperties(filtered);
//   }, [filters, properties]);

//   const handleSearch = (searchFilters: { location: string; type: string; priceRange: string }) => {
//     setActiveSection('properties'); // This will still control local sections
//     setFilters(prev => ({
//       ...prev,
//       type: searchFilters.type,
//       priceRange: searchFilters.priceRange
//     }));
//   };

//   const handleFilterChange = (newFilters: typeof filters) => {
//     setFilters(newFilters);
//   };
  

//   const featuredProperties = properties.filter(property => property.featured);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
//       </div>
//     );
//   }

//   // --- Public Website Routes ---
//   const PublicWebsite = () => (
//     <div className="min-h-screen bg-gray-50">
//       <Header activeSection={activeSection} onNavigate={setActiveSection} />

//       {/* Render sections based on activeSection state, as before */}
//       {activeSection === 'home' && (
//         <>
//           <Hero onSearch={handleSearch} />
//           <section className="py-16 bg-white">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center mb-12">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
//                 <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our handpicked selection of premium properties</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {featuredProperties.map((property) => (
//                   <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} />
//                 ))}
//               </div>
//               <div className="text-center mt-12">
//                 <button
//                   onClick={() => setActiveSection('properties')}
//                   className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
//                 >
//                   View All Properties
//                 </button>
//               </div>
//             </div>
//           </section>
//         </>
//       )}

//       {activeSection === 'properties' && (
//         <div className="pt-16">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <div className="text-center mb-12">
//               <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Properties</h1>
//               <p className="text-xl text-gray-600">Find your perfect property from our extensive collection</p>
//             </div>
//             <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
//             <div className="mb-6 text-sm text-gray-600">
//               Showing {filteredProperties.length} of {properties.length} properties
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredProperties.map((property) => (
//                 <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} />
//               ))}
//             </div>
//             {filteredProperties.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No properties match your current filters.</p>
//                 <button
//                   onClick={() => setFilters({ type: '', status: '', priceRange: '', bedrooms: '' })}
//                   className="mt-4 text-blue-700 hover:text-blue-800 font-semibold"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {activeSection === 'about' && <About />}
//       {activeSection === 'contact' && <Contact />}

//       <Footer />

//       <PropertyModal
//         property={selectedProperty}
//         onClose={() => setSelectedProperty(null)}
//         onScheduleViewing={() => {
//           setSelectedProperty(null);
//           setActiveSection('contact');
//         }}
//       />
//     </div>
//   );

//   // --- Protected Route Wrapper ---
//   // This component checks if the user is an admin. If not, it redirects to login.
//   const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
//     if (!admin) {
//       return <Navigate to="/admin/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<PublicWebsite />} />
//       {/* Admin Login Route - accessible by everyone */}
//       <Route path="/admin/login" element={<AdminLogin />} />

//       {/* Protected Admin Routes */}
//       <Route path="/admin/dashboard" element={
//         <ProtectedAdminRoute>
//           <AdminDashboard />
//         </ProtectedAdminRoute>
//       } />
//       {/* You can add more protected admin routes here */}
//       {/* Example: <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} /> */}

//       {/* Catch-all for undefined routes */}
//       <Route path="*" element={<div>404 Page Not Found</div>} />
//     </Routes>
//   );
// }

// // Main App component responsible for providing AuthContext and Router
// function App() {
//   return (
//     <Router> {/* 👈 THIS IS THE CRUCIAL CHANGE: Router wraps everything */}
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;