// src/services/api.ts
import axios from 'axios';
import { LoginCredentials } from '../types/Admin';
import { Property } from '../types/Property';

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


  // Old and working Login fucntion
  // --- Authentication Endpoints ---
  // login: async (email: string, password: string) => {
  //   // CHANGE THIS LINE:
  //   const response = await api.post('/auth/login', { email, password }); // <-- Corrected: sending 'email'
  //   // Assuming your backend returns a token and admin details upon successful login
  //   const { token, email: userEmail } = response.data;
  //   // const { token, admin } = response.data;
  //   localStorage.setItem('authToken', token);
  //   return {
  //     //  admin, 
  //     // token 
  //      token,
  //     email: userEmail,
  //   }; // Return both for AuthContext to use
  // },

  // Login for getting  invalid credentials popup
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
    // Axios error handling
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
    // If your backend has a logout endpoint to invalidate tokens on the server side
    // await api.post('/auth/logout');
    // For JWTs, logout is often client-side (removing the token)
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

  createProperty: async (propertyData: Omit<Property, 'id'>): Promise<Property> => {
    const response = await api.post('/auth/property', propertyData);
    return response.data;
  },

  updateProperty: async (id: string, propertyData: Omit<Property, 'id'>): Promise<Property> => {
  const response = await api.put(`/auth/properties/${id}`, propertyData); // ✅ send only the fields to update
  return response.data;
},
  // ...existing code...

  deleteProperty: async (id: string) => {
    await api.delete(`/auth/dashboard/${id}`);
  },
};