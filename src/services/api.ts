// // src/services/api.ts
// import axios from 'axios';
// import { LoginCredentials } from '../types/Admin';
// import { Property } from '../types/Property';

// // Base URL for your Spring Boot backend
// const API_BASE_URL = 'http://localhost:8080/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request Interceptor: Add Authorization header for authenticated requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor: Handle token expiration or unauthorized access
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // If unauthorized, clear auth token and potentially redirect to login
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('admin');
//       // Optional: You might want to trigger a global logout or redirect here
//       // window.location.href = '/admin'; // Example redirect
//     }
//     return Promise.reject(error);
//   }
// );

// export const apiService = {


//   // Old and working Login fucntion
//   // --- Authentication Endpoints ---
//   // login: async (email: string, password: string) => {
//   //   // CHANGE THIS LINE:
//   //   const response = await api.post('/auth/login', { email, password }); // <-- Corrected: sending 'email'
//   //   // Assuming your backend returns a token and admin details upon successful login
//   //   const { token, email: userEmail } = response.data;
//   //   // const { token, admin } = response.data;
//   //   localStorage.setItem('authToken', token);
//   //   return {
//   //     //  admin, 
//   //     // token 
//   //      token,
//   //     email: userEmail,
//   //   }; // Return both for AuthContext to use
//   // },

//   // Login for getting  invalid credentials popup
//   login: async (email: string, password: string) => {
//   try {
//     const response = await api.post('/auth/login', { email, password });
//     const { token, email: userEmail } = response.data;
//     localStorage.setItem('authToken', token);
//     return {
//       token,
//       email: userEmail,
//     };
//   } catch (err: any) {
//     // Axios error handling
//     if (err.response) {
//       const message =
//         err.response.data?.message || err.response.data || 'Login failed';
//       throw new Error(message);
//     } else if (err.request) {
//       throw new Error('No response from server. Please try again.');
//     } else {
//       throw new Error('An unknown error occurred.');
//     }
//   }
// },


//   logout: async () => {
//     // If your backend has a logout endpoint to invalidate tokens on the server side
//     // await api.post('/auth/logout');
//     // For JWTs, logout is often client-side (removing the token)
//   },

//   validateToken: async () => {
//     // This endpoint should verify the current token's validity on the backend
//     // and return admin details if valid.
//     const response = await api.get('/auth/validate'); // Example endpoint
//     return response.data; // Should return admin data if token is valid
//   },

//   // --- Property Management Endpoints ---
//   getProperties: async (): Promise<Property[]> => {
//     const response = await api.get('/properties');
//     return response.data;
//   },

//   createProperty: async (propertyData: Omit<Property, 'id'>): Promise<Property> => {
//     // const response = await api.post('/auth/property', propertyData);
//     const response = await api.post('/properties', propertyData);
    
//     return response.data;
//   },

//   updateProperty: async (id: string, propertyData: Omit<Property, 'id'>): Promise<Property> => {
//   const response = await api.put(`/properties/${id}`, propertyData); // ✅ send only the fields to update
//   return response.data;
// },
//   // ...existing code...

//   deleteProperty: async (id: string) => {
//     await api.delete(`/auth/dashboard/${id}`);
//   },
// };








// src/services/api.ts
import axios from 'axios';
import { LoginCredentials } from '../types/Admin';
import { Property } from '../types/Property';
import { Agent } from '../types/Agent';
// Assuming Property type is used for both request and response, if your DTOs are different
// you might need a PropertyRequest type here, e.g., import { PropertyRequest } from '../types/Property';

// Base URL for your Spring Boot backend
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization header for authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle token expiration or unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, clear auth token and potentially redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('admin');
      // Optional: You might want to trigger a global logout or redirect here
      // window.location.href = '/admin'; // Example redirect
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // --- Authentication Endpoints ---
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, email: userEmail } = response.data;
      localStorage.setItem('authToken', token);
      return {
        token,
        email: userEmail,
      };
    } catch (err: any) {
      // Axios error handling to provide specific messages for UI
      if (err.response) {
        const message =
          err.response.data?.message || err.response.data || 'Login failed';
        throw new Error(message);
      } else if (err.request) {
        throw new Error('No response from server. Please try again.');
      } else {
        throw new Error('An unknown error occurred.');
      }
    }
  },

  logout: async () => {
    // For JWTs, logout is often client-side (removing the token)
    localStorage.removeItem('authToken');
    localStorage.removeItem('admin'); // Clear any other stored admin info
  },

  validateToken: async () => {
    // This endpoint should verify the current token's validity on the backend
    // and return admin details if valid.
    const response = await api.get('/auth/validate'); // Example endpoint
    return response.data; // Should return admin data if token is valid
  },

  // --- Property Management Endpoints ---
  getProperties: async (): Promise<Property[]> => {
    const response = await api.get('/properties');
    return response.data;
  },

  // Ensure Property type matches your backend's PropertyRequestDTO fields
  // For 'Omit<Property, 'id'>', ensure all required fields are present in the object you send.
  createProperty: async (propertyData: Omit<Property, 'id'>): Promise<Property> => {
    // CORRECT URL: POST to /api/properties
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  updateProperty: async (id: string, propertyData: Omit<Property, 'id'>): Promise<Property> => {
    // CORRECT URL: PUT to /api/properties/{id}
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  deleteProperty: async (id: string) => {
    // CORRECT URL: DELETE to /api/properties/{id}
    await api.delete(`/properties/${id}`);
  },


  getAgents: async (): Promise<Agent[]> => {
  const response = await api.get('/agents');
  return response.data;
},

createAgent: async (agentData: Omit<Agent, 'id'>): Promise<Agent> => {
  const response = await api.post('/agents', agentData);
  return response.data;
},

updateAgent: async (id: string, agentData: Partial<Omit<Agent, 'id'>>): Promise<Agent> => {
  const response = await api.put(`/agents/${id}`, agentData);
  return response.data;
},

deleteAgent: async (id: string): Promise<void> => {
  await api.delete(`/agents/${id}`);
},

// --- NEW: Get Agent by ID ---
  getAgentById: async (id: string): Promise<Agent> => {
    try {
      const response = await api.get(`/agents/${id}`); // Assuming /api/agents/{id} endpoint
      return response.data;
    } catch (err: any) {
      if (err.response) {
        const message =
          err.response.data?.message || err.response.data || `Failed to fetch agent with ID: ${id}`;
        throw new Error(message);
      } else if (err.request) {
        throw new Error('No response from server when fetching agent. Please try again.');
      } else {
        throw new Error('An unknown error occurred while fetching agent.');
      }
    }
  },

};