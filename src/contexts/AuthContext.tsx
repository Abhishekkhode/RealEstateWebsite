// // src/contexts/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom'; // 🔼 Add this import
// import { Admin, LoginCredentials } from '../types/Admin';
// import { apiService } from '../services/api'; // Import the new apiService

// interface AuthContextType {
//   admin: Admin | null;
//   login: (credentials: LoginCredentials) => Promise<boolean>;
//   logout: () => void;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [admin, setAdmin] = useState<Admin | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   // const navigate = useNavigate();


//   useEffect(() => {
//     const initializeAuth = async () => {
//       const storedAdmin = localStorage.getItem('admin');
//       const token = localStorage.getItem('authToken');

//       if (storedAdmin && token) {
//         try {
//           // Validate token with backend
//           const validatedAdmin = await apiService.validateToken(); // API call
//           if (validatedAdmin) {
//             setAdmin({
//               ...validatedAdmin,
//               role: validatedAdmin.role as Admin['role']
//             });
//           } else {
//             // Token is invalid, clear stored data
//             localStorage.removeItem('admin');
//             localStorage.removeItem('authToken');
//           }
//         } catch (error) {
//           console.error('Token validation failed:', error);
//           localStorage.removeItem('admin');
//           localStorage.removeItem('authToken');
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const login = async (credentials: LoginCredentials): Promise<boolean> => {
//     setIsLoading(true);
//     try {
//       const { admin: adminData, token } = await apiService.login(credentials.email, credentials.password); // API call
//       // Store token in localStorage (already handled by apiService interceptor for subsequent requests)
//       localStorage.setItem('authToken', token); // apiService handles this
//       setAdmin(adminData);
//       localStorage.setItem('admin', JSON.stringify(adminData));
//       setIsLoading(false);
//       return true;
//       // setAdmin(adminData);
//       // localStorage.setItem('admin', JSON.stringify(adminData));
//       // setIsLoading(false);
//       // navigate('/admin/dashboard'); // 🚀 Redirect after login
//       // return true;

//     } catch (error) {
//       console.error('Login failed:', error);
//       setIsLoading(false);
//       return false;
//     }
//   };

//   const logout = async () => {
//     setIsLoading(true);
//     try {
//       await apiService.logout(); // Optional: if backend has a logout endpoint
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setAdmin(null);
//       localStorage.removeItem('admin');
//       localStorage.removeItem('authToken');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ admin, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };








// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Admin, LoginCredentials } from '../types/Admin'; // Ensure these types are correct
import { apiService } from '../services/api'; // Ensure apiService is correctly implemented

interface AuthContextType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setAdmin(null);
        setIsLoading(false);
        return;
      }

      try {
        // Assume validateToken returns Admin object if valid, or throws error
        const validatedAdmin = await apiService.validateToken();
        if (validatedAdmin) {
          setAdmin(validatedAdmin);
        } else {
          // If validatedAdmin is null/undefined (though validateToken should ideally throw)
          setAdmin(null);
          localStorage.removeItem('authToken'); // Clear invalid token
        }
      } catch (err) {
        console.error('Token validation failed:', err);
        setAdmin(null);
        localStorage.removeItem('authToken'); // Clear invalid token on error
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []); // Empty dependency array means this runs once on mount

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const { token, email } = await apiService.login(credentials.email, credentials.password);
      
      localStorage.setItem('authToken', token); // Store the token with key 'authToken'
      const adminData: Admin = {
        email,
        role: 'ADMIN', // Assuming role is always ADMIN for this context
        // Add any other admin properties you get from login response
      };
      setAdmin(adminData);
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error.message);
      throw new Error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Attempt to invalidate token on the backend first
      await apiService.logout();
      console.log('Backend logout successful.');
    } catch (error) {
      // Log the error but proceed with client-side logout anyway
      // The user should still be logged out on the client even if backend logout fails
      console.error('Backend logout failed:', error);
    } finally {
      // Always clear client-side state and storage regardless of backend logout success/failure
      setAdmin(null); // Clear admin context state
      localStorage.removeItem('authToken'); // Clear the token from local storage
      // Only remove if you have other admin-related data stored under 'admin' key
      // If 'authToken' is the only thing, then this line is not needed:
      // localStorage.removeItem('admin');
      setIsLoading(false);
      navigate('/admin/login'); // Redirect to login page
    }
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};










    // LOGIN FUCTION
  // const login = async (credentials: LoginCredentials): Promise<boolean> => {
  //   setIsLoading(true);
  //   try {
  //     const { admin: adminData, token } = await apiService.login(credentials.email, credentials.password); // API call
  //     localStorage.setItem('authToken', token);
  //     setAdmin(adminData);
  //     localStorage.setItem('admin', JSON.stringify(adminData));
  //     setIsLoading(false);
  //     navigate('/admin/dashboard'); // 🚀 UNCOMMENTED AND ENABLED: Redirect after successful login
  //     return true;

  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     setIsLoading(false);
  //     return false;
  //   }
  // };


//   const login = async (credentials: LoginCredentials): Promise<boolean> => {
//   setIsLoading(true);
//   try {
//     const { admin: adminData, token } = await apiService.login(credentials.email, credentials.password); // ✅ Rename here

//     localStorage.setItem('authToken', token);
//     setAdmin(adminData);
//     localStorage.setItem('admin', JSON.stringify(adminData)); // optional
//      // ✅ Now this is defined
//     setIsLoading(false);
//     navigate('/admin/dashboard'); // ✅ Redirect after login
//     return true;
//   } catch (error) {
//     console.error('Login failed:', error);
//     setIsLoading(false);
//     return false;
//   }
// };


