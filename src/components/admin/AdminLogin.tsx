import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ContactSupportModal from '../ContactSupportModal';
import { motion } from 'framer-motion';
import ErrorModal from '../ErrorModal';

export const AdminLogin: React.FC = () => {
  type CredentialKey = 'email' | 'password';

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const [supportOpen, setSupportOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setIsErrorModalOpen(true);
    } else {
      setIsErrorModalOpen(false);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(credentials);
    } catch (err: any) {
      const errMsg = err?.message?.trim() || 'Login failed. Please try again.';
      setError(() => errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name as CredentialKey]: value
    }));

    if (error && credentials[name as CredentialKey] !== value) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="h-10 w-10 text-blue-700" />
            <span className="text-2xl font-bold text-gray-900">EliteEstates</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Sign in to manage properties</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={credentials.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-sm text-gray-600">
            Forgot your password?{' '}
            <span
              onClick={() => setSupportOpen(true)}
              className="text-blue-700 hover:text-blue-800 font-medium cursor-pointer transition-colors"
            >
              Contact Support
            </span>
          </p>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <ContactSupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
      <ErrorModal isOpen={isErrorModalOpen} onClose={() => setError('')} message={error} />
    </div>
  );
};























// import React, { useState, useEffect } from 'react';
// import { Lock, Mail, Eye, EyeOff, Home } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import ContactSupportModal from '../ContactSupportModal';
// import { motion } from 'framer-motion';
// import ErrorModal from '../ErrorModal';

// export const AdminLogin: React.FC = () => {
//   type CredentialKey = 'email' | 'password';

//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login } = useAuth();
//   const [supportOpen, setSupportOpen] = useState(false);
//   const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

//   useEffect(() => {
//     if (error) setIsErrorModalOpen(true);
//     else setIsErrorModalOpen(false);
//   }, [error]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await login(credentials);
//     } catch (err: any) {
//       const errMsg = err?.message?.trim() || 'Login failed. Please try again.';
//       setError(errMsg);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({
//       ...prev,
//       [name as CredentialKey]: value
//     }));
//     if (error && credentials[name as CredentialKey] !== value) {
//       setError('');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black opacity-20"></div>

//       <motion.div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <Home className="h-10 w-10 text-blue-700" />
//             <span className="text-2xl font-bold text-gray-900">EliteEstates</span>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h1>
//           <p className="text-gray-600">Sign in to manage properties</p>
//         </div>

//         {/* Placeholder Animation */}
//         <motion.div
//           className="w-full h-24 bg-blue-100 rounded-md mb-6 flex items-center justify-center"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <p className="text-sm text-blue-600 font-medium">Secure Admin Login</p>
//         </motion.div>

//         {/* Login Form */}
//         <motion.form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 value={credentials.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 required
//                 value={credentials.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
//           >
//             {isSubmitting ? (
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//             ) : (
//               'Sign In'
//             )}
//           </button>
//         </motion.form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Forgot your password?{' '}
//             <span
//               onClick={() => setSupportOpen(true)}
//               className="text-blue-700 hover:text-blue-800 font-medium cursor-pointer transition-colors"
//             >
//               Contact Support
//             </span>
//           </p>
//         </div>
//       </motion.div>

//       {/* Modals */}
//       <ContactSupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
//       <ErrorModal isOpen={isErrorModalOpen} onClose={() => setError('')} message={error} />
//     </div>
//   );
// };



