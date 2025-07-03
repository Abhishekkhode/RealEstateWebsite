import { Property } from '../types/Property';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 850000,
    location: 'Kukartpally, Hyderabad',
    bedrooms: 3,
    bathrooms: 4,
    area: 1885,
    type: 'house',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Located in Kukatpally, this under-construction 3BHK west-facing flat spans 1885 SFT and is available on the 6th to 10th floors, with 2 car parking slots. Part of Phase 1 featuring 9 towers and 2 clubhouses (totaling 1.31 lakh SFT), possession is expected by December 2026.',
    features: ['Club Houses', 'Children Play Area', '24/7 Security', 'Prime Location'],
    yearBuilt: 2026,
    possession: 2026,
    parking: 2,
    featured: true
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    price: 650000,
    location: 'Manhattan, NY',
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    type: 'apartment',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: "Commercial open plots for sale in the prime area of Hi-Tech City. Total 1000 sq. yards (2 plots): one is 400 sq. yards (60'×60''), South-East facing with 50' South & 40' East road access; the other is 600 sq. yards (60'×90'), East facing with 40' road. ULC cleared, LRS unpaid. Ideal for offices, banks, or other commercial use—just off the main road in a high-potential business zone.",
    features: ['City Views', 'Ideal for Commerial Use', 'No Legal Issues', 'Prime Area'],
    yearBuilt: 2018,
    parking: 1,
    featured: true
  },
  {
    id: '3',
    title: 'VILLA FOR SALE @ OSMAN NAGAR',
    price: 425000,
    location: 'Hyderabad, Telangana',
    bedrooms: 3,
    bathrooms: 3,
    area:  400,
    builduparea: 4800,
    type: 'house',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'West-facing villa for sale at Osman Nagar in the premium project Muppa Indraprastha. Built on a 400 sq. yard plot with a 4800 sq. ft. built-up area, it features Italian marble flooring, Schindler lift, and customized bedrooms, bathrooms, and kitchen.',
    features: ['Project : MUPPA INDRAPRASTHA','Italian Marble', 'Customized Kitchen', 'Customized Bedrooms', 'Two-Car Garage', 'Near Schools'],
    yearBuilt: 2025,
    parking: 2,
    featured: false
  },
  {
    id: '4',
    title: 'Waterfront Condo',
    price: 3200,
    location: 'Miami Beach, FL',
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    type: 'condo',
    status: 'for-rent',
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Beautiful waterfront condo with direct beach access and stunning ocean views.',
    features: ['Ocean Views', 'Beach Access', 'Pool', 'Fitness Center', 'Balcony'],
    yearBuilt: 2019,
    parking: 1,
    featured: true
  },
  {
    id: '5',
    title: 'Historic Townhouse',
    price: 520000,
    location: 'Boston, MA',
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    type: 'townhouse',
    status: 'for-sale',
    images: [
      'https://images.pexels.com/photos/1396128/pexels-photo-1396128.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Charming historic townhouse with original architectural details and modern updates.',
    features: ['Historic Character', 'Exposed Brick', 'Fireplace', 'Private Patio', 'Walk to Transit'],
    yearBuilt: 1920,
    parking: 1,
    featured: false
  },
  {
    id: '6',
    title: 'FULLY FURNISHED FLAT',
    price: 70000,
    location: 'Kondapur, Hyderabad',
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    type: 'house',
    status: 'for-rent',
    images: [
      'https://images.pexels.com/photos/1396126/pexels-photo-1396126.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: "Fully furnished 4BHK flat for rent in Kondapur, just 5 mins from Botanical Garden. Spread across 2800 sq. ft., it features spacious bedrooms with king/queen beds, wardrobes, ACs in all rooms including a home theatre, and a fully equipped modern kitchen. Enjoy a balcony view of the 200-ft main road. Located on a peaceful street near CHIREC School, markets, and hospitals—ideal for families seeking comfort and convenience.",
    features: ['Home Theatre Room', 'Modern Appliances', 'Balcony', 'Blend of Luxury and Comfort', 'Spacious Bedrooms'],
    yearBuilt: 2024,
    parking: 2,
    featured: true
  }
];