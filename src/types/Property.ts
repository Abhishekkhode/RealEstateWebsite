// export interface Property {
//   id: string;
//   title: string;
//   price: number;
//   location: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   type: 'house' | 'apartment' | 'condo' | 'townhouse';
//   status: 'for-sale' | 'for-rent' | 'sold';
//   images: string[];
//   description: string;
//   features: string[];
//   yearBuilt?: number;
//   possession?: number;
//   parking: number;
//   featured: boolean;
//   agentName?: string;
//   agentPhone?: string;
//   agentEmail?: string;
//   agentPhoto?: string;
//   builduparea?: number;
//   // images?: string[];
// }

// src/types/Property.ts (OR wherever your Property interface is defined)
// This is an assumption based on common API responses for optional numeric fields.
// Adjust based on your *actual* backend response structure.

// src/types/Property.ts (Example - verify yours matches this pattern for optional numerics)
export interface Property {
  id: string;
  title: string;
  price: number | null; // <-- MUST be number | null
  location: string;
  bedrooms: number | null; // <-- MUST be number | null
  bathrooms: number | null; // <-- MUST be number | null
  area: number | null;     // <-- MUST be number | null
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'for-rent' | 'sold';
  description: string;
  features: string[]; // Can your backend send null/undefined for this? If so, consider `string[] | null`
  yearBuilt: number | null; // <-- MUST be number | null
  parking: number | null;   // <-- MUST be number | null
  featured: boolean;
  images: string[]; // Can your backend send null/undefined for this? If so, consider `string[] | null`
  // ... any other properties
}