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
// src/types/Property.ts
export interface Property {
  id?: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'for-rent' | 'sold';
  description: string;
  features: string[];
  yearBuilt: number;
  parking: number;
  featured: boolean;
  images: string[];
  possession: string;
  agentId?: string; // Optional agentId for linking to Agent
}