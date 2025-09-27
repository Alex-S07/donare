import { DonationItem, DonationSection } from '@/types/donations';

// Clothes Section Data
const clothesItems: DonationItem[] = [
  {
    id: 'clothes-001',
    title: 'Winter Jackets for Children',
    description: 'Warm winter jackets in various sizes (6-14 years). Perfect for the upcoming winter season. Includes hooded and non-hooded options.',
    category: 'clothes',
    condition: 'Gently Used',
    targetDemographics: ['Children'],
    availability: 'High Demand',
    impactStatement: 'Keep a child warm this winter',
    testimonial: {
      text: 'My daughter loves her new jacket. It fits perfectly and keeps her cozy!',
      author: 'Priya M., Mother of 2'
    },
    tags: ['winter', 'outerwear', 'urgent'],
    isUrgent: true
  },
  {
    id: 'clothes-002',
    title: 'School Uniforms - Various Sizes',
    description: 'Clean, well-maintained school uniforms including shirts, pants, skirts, and ties. Suitable for primary and secondary school students.',
    category: 'clothes',
    condition: 'Moderately Used',
    targetDemographics: ['Children', 'Students'],
    availability: 'Available',
    impactStatement: 'Help a child attend school with dignity',
    tags: ['school', 'uniform', 'education']
  },
  {
    id: 'clothes-003',
    title: 'Formal Business Attire - Men',
    description: 'Professional shirts, trousers, blazers, and ties. Sizes M-XL. Perfect for job interviews and workplace requirements.',
    category: 'clothes',
    condition: 'Gently Used',
    targetDemographics: ['Men', 'Working Adults'],
    availability: 'Limited Stock',
    impactStatement: 'Boost confidence for job interviews',
    testimonial: {
      text: 'Got my first job wearing this suit. Forever grateful!',
      author: 'Rajesh K., Software Engineer'
    },
    tags: ['formal', 'professional', 'interview']
  },
  {
    id: 'clothes-004',
    title: 'Traditional Sarees & Salwar Suits',
    description: 'Beautiful traditional Indian wear in excellent condition. Various colors and designs suitable for festivals and special occasions.',
    category: 'clothes',
    condition: 'Never Used',
    targetDemographics: ['Women'],
    availability: 'Available',
    impactStatement: 'Celebrate traditions with dignity',
    tags: ['traditional', 'festival', 'ethnic']
  },
  {
    id: 'clothes-005',
    title: 'Baby Clothes Bundle (0-2 years)',
    description: 'Soft, comfortable baby clothes including onesies, sleepers, and tiny outfits. All items thoroughly cleaned and sanitized.',
    category: 'clothes',
    condition: 'Gently Used',
    targetDemographics: ['Children', 'Families'],
    availability: 'Recently Requested',
    impactStatement: 'Comfort for the littlest ones',
    tags: ['baby', 'infant', 'soft']
  },
  {
    id: 'clothes-006',
    title: 'Sports Shoes & Sneakers',
    description: 'Comfortable sports shoes in various sizes. Great for daily wear, exercise, and outdoor activities. Includes both adult and children sizes.',
    category: 'clothes',
    condition: 'Moderately Used',
    targetDemographics: ['Children', 'Men', 'Women'],
    availability: 'Available',
    impactStatement: 'Step forward with confidence',
    tags: ['shoes', 'sports', 'comfort']
  },
  {
    id: 'clothes-007',
    title: 'Elderly Care Clothing',
    description: 'Comfortable, easy-to-wear clothing designed for elderly individuals. Includes adaptive features like velcro closures and elastic waistbands.',
    category: 'clothes',
    condition: 'Never Used',
    targetDemographics: ['Elderly'],
    availability: 'Limited Stock',
    impactStatement: 'Dignity and comfort for seniors',
    tags: ['elderly', 'adaptive', 'comfort']
  },
  {
    id: 'clothes-008',
    title: 'Casual T-Shirts & Jeans',
    description: 'Everyday casual wear including branded t-shirts and denim jeans. Perfect for daily activities and casual outings.',
    category: 'clothes',
    condition: 'Gently Used',
    targetDemographics: ['Men', 'Women', 'Students'],
    availability: 'Available',
    impactStatement: 'Comfortable everyday essentials',
    tags: ['casual', 'daily', 'comfortable']
  },
  {
    id: 'clothes-009',
    title: 'Maternity Wear Collection',
    description: 'Comfortable maternity clothes including dresses, tops, and pants. Designed to accommodate growing bellies with style and comfort.',
    category: 'clothes',
    condition: 'Gently Used',
    targetDemographics: ['Women'],
    availability: 'High Demand',
    impactStatement: 'Support expecting mothers',
    tags: ['maternity', 'pregnancy', 'comfort']
  },
  {
    id: 'clothes-010',
    title: 'Work Uniforms & Aprons',
    description: 'Professional work uniforms for various industries including healthcare, hospitality, and service sectors. Clean and well-maintained.',
    category: 'clothes',
    condition: 'Moderately Used',
    targetDemographics: ['Working Adults'],
    availability: 'Available',
    impactStatement: 'Professional appearance for work',
    tags: ['uniform', 'work', 'professional']
  }
];

// Education Section Data
const educationItems: DonationItem[] = [
  {
    id: 'edu-001',
    title: 'NCERT Textbooks Class 1-5',
    description: 'Complete set of NCERT textbooks for primary classes. Includes Mathematics, English, Hindi, and Environmental Studies. All books in good condition.',
    category: 'education',
    condition: 'Gently Used',
    targetDemographics: ['Children', 'Students'],
    availability: 'High Demand',
    impactStatement: 'Foundation for a bright future',
    testimonial: {
      text: 'These books helped my son excel in his studies. Thank you!',
      author: 'Sunita D., Mother'
    },
    tags: ['textbooks', 'primary', 'NCERT', 'urgent'],
    isUrgent: true
  },
  {
    id: 'edu-002',
    title: 'Scientific Calculator & Geometry Set',
    description: 'Essential mathematical tools including scientific calculators, compass, protractor, and rulers. Perfect for high school mathematics and science.',
    category: 'education',
    condition: 'Never Used',
    targetDemographics: ['Students'],
    availability: 'Available',
    impactStatement: 'Tools for mathematical excellence',
    tags: ['calculator', 'geometry', 'mathematics']
  },
  {
    id: 'edu-003',
    title: 'Art & Craft Supplies Bundle',
    description: 'Creative supplies including colored pencils, watercolors, sketch books, brushes, and craft materials. Inspire creativity and artistic expression.',
    category: 'education',
    condition: 'Moderately Used',
    targetDemographics: ['Children', 'Students'],
    availability: 'Available',
    impactStatement: 'Unleash creative potential',
    tags: ['art', 'creativity', 'craft']
  },
  {
    id: 'edu-004',
    title: 'English Literature Collection',
    description: 'Classic and contemporary English literature books suitable for high school and college students. Includes novels, poetry, and drama.',
    category: 'education',
    condition: 'Gently Used',
    targetDemographics: ['Students'],
    availability: 'Limited Stock',
    impactStatement: 'Expand literary horizons',
    tags: ['literature', 'english', 'reading']
  },
  {
    id: 'edu-005',
    title: 'Computer Programming Books',
    description: 'Learn programming with books on Python, Java, and web development. Perfect for students interested in technology and coding.',
    category: 'education',
    condition: 'Gently Used',
    targetDemographics: ['Students', 'Working Adults'],
    availability: 'Recently Requested',
    impactStatement: 'Code your way to success',
    tags: ['programming', 'technology', 'coding']
  },
  {
    id: 'edu-006',
    title: 'School Stationery Kit',
    description: 'Complete stationery set including notebooks, pens, pencils, erasers, sharpeners, and rulers. Everything needed for a school year.',
    category: 'education',
    condition: 'Never Used',
    targetDemographics: ['Children', 'Students'],
    availability: 'Available',
    impactStatement: 'Ready to learn and grow',
    tags: ['stationery', 'school', 'supplies']
  },
  {
    id: 'edu-007',
    title: 'Science Experiment Kit',
    description: 'Hands-on science learning kit with safe experiments for chemistry, physics, and biology. Includes instruction manual and safety equipment.',
    category: 'education',
    condition: 'Gently Used',
    targetDemographics: ['Children', 'Students'],
    availability: 'High Demand',
    impactStatement: 'Discover the wonders of science',
    tags: ['science', 'experiments', 'learning']
  },
  {
    id: 'edu-008',
    title: 'Competitive Exam Preparation Books',
    description: 'Preparation materials for JEE, NEET, UPSC, and other competitive exams. Includes practice papers and solution guides.',
    category: 'education',
    condition: 'Moderately Used',
    targetDemographics: ['Students'],
    availability: 'Available',
    impactStatement: 'Achieve your dreams',
    tags: ['competitive', 'exams', 'preparation']
  },
  {
    id: 'edu-009',
    title: 'Children\'s Story Books',
    description: 'Colorful picture books and story collections for young readers. Includes moral stories, fairy tales, and educational content.',
    category: 'education',
    condition: 'Gently Used',
    targetDemographics: ['Children'],
    availability: 'Available',
    impactStatement: 'Spark imagination and reading love',
    tags: ['stories', 'children', 'reading']
  },
  {
    id: 'edu-010',
    title: 'Language Learning Materials',
    description: 'Books and audio materials for learning English, Hindi, and regional languages. Includes grammar guides and vocabulary builders.',
    category: 'education',
    condition: 'Gently Used',
    targetDemographics: ['Students', 'Working Adults'],
    availability: 'Limited Stock',
    impactStatement: 'Break language barriers',
    tags: ['language', 'learning', 'communication']
  }
];

// Household Section Data
const householdItems: DonationItem[] = [
  {
    id: 'house-001',
    title: 'Kitchen Utensils & Cookware Set',
    description: 'Essential kitchen items including pots, pans, plates, bowls, and cooking utensils. Everything needed to set up a basic kitchen.',
    category: 'household',
    condition: 'Gently Used',
    targetDemographics: ['Families'],
    availability: 'Available',
    impactStatement: 'Cook with love and care',
    tags: ['kitchen', 'cooking', 'utensils']
  },
  {
    id: 'house-002',
    title: 'Bed Sheets & Blankets',
    description: 'Comfortable bedding including cotton bed sheets, pillows, and warm blankets. Clean and well-maintained for a good night\'s sleep.',
    category: 'household',
    condition: 'Gently Used',
    targetDemographics: ['Families', 'Elderly'],
    availability: 'High Demand',
    impactStatement: 'Comfort for peaceful sleep',
    testimonial: {
      text: 'Finally, my children sleep comfortably. These blankets are so warm!',
      author: 'Meera S., Mother of 3'
    },
    tags: ['bedding', 'comfort', 'sleep'],
    isUrgent: true
  },
  {
    id: 'house-003',
    title: 'Study Table & Chair Set',
    description: 'Wooden study furniture perfect for children\'s homework and study sessions. Includes adjustable chair and spacious table with drawers.',
    category: 'household',
    condition: 'Moderately Used',
    targetDemographics: ['Children', 'Students'],
    availability: 'Limited Stock',
    impactStatement: 'Create a learning environment',
    tags: ['furniture', 'study', 'education']
  },
  {
    id: 'house-004',
    title: 'Water Purifier & Storage',
    description: 'Basic water filtration system with storage containers. Ensures access to clean drinking water for the whole family.',
    category: 'household',
    condition: 'Gently Used',
    targetDemographics: ['Families'],
    availability: 'Recently Requested',
    impactStatement: 'Clean water for healthy living',
    tags: ['water', 'health', 'purifier']
  },
  {
    id: 'house-005',
    title: 'Storage Boxes & Organizers',
    description: 'Plastic storage containers and organizers to keep belongings tidy and organized. Various sizes available for different needs.',
    category: 'household',
    condition: 'Never Used',
    targetDemographics: ['Families'],
    availability: 'Available',
    impactStatement: 'Organize life, organize dreams',
    tags: ['storage', 'organization', 'containers']
  },
  {
    id: 'house-006',
    title: 'Electric Fan & Room Cooler',
    description: 'Ceiling and table fans to beat the heat. Includes a small room cooler for better air circulation during summer months.',
    category: 'household',
    condition: 'Moderately Used',
    targetDemographics: ['Families', 'Elderly'],
    availability: 'Available',
    impactStatement: 'Cool comfort in hot weather',
    tags: ['cooling', 'fan', 'summer']
  },
  {
    id: 'house-007',
    title: 'Baby Care Essentials',
    description: 'Baby crib, high chair, baby bath tub, and other essential items for infant care. All items thoroughly cleaned and safety-checked.',
    category: 'household',
    condition: 'Gently Used',
    targetDemographics: ['Families', 'Children'],
    availability: 'High Demand',
    impactStatement: 'Safe haven for little ones',
    tags: ['baby', 'safety', 'care']
  },
  {
    id: 'house-008',
    title: 'Cleaning Supplies & Tools',
    description: 'Brooms, mops, buckets, and eco-friendly cleaning supplies to maintain a clean and healthy living environment.',
    category: 'household',
    condition: 'Never Used',
    targetDemographics: ['Families'],
    availability: 'Available',
    impactStatement: 'Clean home, healthy family',
    tags: ['cleaning', 'hygiene', 'maintenance']
  },
  {
    id: 'house-009',
    title: 'Dining Table & Chairs',
    description: 'Wooden dining set for 4 people. Perfect for family meals and creating a proper dining space in the home.',
    category: 'household',
    condition: 'Moderately Used',
    targetDemographics: ['Families'],
    availability: 'Limited Stock',
    impactStatement: 'Gather around for family meals',
    tags: ['furniture', 'dining', 'family']
  },
  {
    id: 'house-010',
    title: 'Emergency Lighting & Torch',
    description: 'Battery-powered emergency lights, torches, and lanterns for power outages. Includes rechargeable and solar-powered options.',
    category: 'household',
    condition: 'Gently Used',
    targetDemographics: ['Families'],
    availability: 'Available',
    impactStatement: 'Light in times of darkness',
    tags: ['emergency', 'lighting', 'safety']
  }
];

// Medical Section Data
const medicalItems: DonationItem[] = [
  {
    id: 'med-001',
    title: 'First Aid Kit & Basic Supplies',
    description: 'Complete first aid kit with bandages, antiseptic, thermometer, and basic medical supplies. Essential for every household emergency.',
    category: 'medical',
    condition: 'Never Used',
    targetDemographics: ['Families'],
    availability: 'Available',
    impactStatement: 'Prepared for health emergencies',
    tags: ['first-aid', 'emergency', 'safety']
  },
  {
    id: 'med-002',
    title: 'Blood Pressure Monitor',
    description: 'Digital blood pressure monitor for home use. Perfect for elderly individuals who need regular BP monitoring.',
    category: 'medical',
    condition: 'Gently Used',
    targetDemographics: ['Elderly'],
    availability: 'High Demand',
    impactStatement: 'Monitor health at home',
    testimonial: {
      text: 'This device helps me track my BP daily. Very grateful!',
      author: 'Ramesh G., Senior Citizen'
    },
    tags: ['blood-pressure', 'monitoring', 'elderly'],
    isUrgent: true
  },
  {
    id: 'med-003',
    title: 'Wheelchair & Mobility Aids',
    description: 'Manual wheelchair and walking aids including crutches and walking sticks. Helps individuals with mobility challenges.',
    category: 'medical',
    condition: 'Gently Used',
    targetDemographics: ['Elderly'],
    availability: 'Limited Stock',
    impactStatement: 'Restore independence and mobility',
    tags: ['mobility', 'wheelchair', 'independence']
  },
  {
    id: 'med-004',
    title: 'Nebulizer & Respiratory Care',
    description: 'Portable nebulizer for respiratory treatments. Includes masks and tubing. Essential for asthma and respiratory conditions.',
    category: 'medical',
    condition: 'Moderately Used',
    targetDemographics: ['Children', 'Elderly'],
    availability: 'Recently Requested',
    impactStatement: 'Breathe easier, live better',
    tags: ['respiratory', 'asthma', 'breathing']
  },
  {
    id: 'med-005',
    title: 'Diabetic Care Kit',
    description: 'Glucose meter, test strips, and diabetic care supplies. Helps manage diabetes with regular monitoring.',
    category: 'medical',
    condition: 'Never Used',
    targetDemographics: ['Elderly', 'Working Adults'],
    availability: 'High Demand',
    impactStatement: 'Manage diabetes effectively',
    tags: ['diabetes', 'glucose', 'monitoring']
  },
  {
    id: 'med-006',
    title: 'Baby Health & Care Items',
    description: 'Baby thermometer, nasal aspirator, and infant care supplies. Essential items for newborn and infant health monitoring.',
    category: 'medical',
    condition: 'Gently Used',
    targetDemographics: ['Children', 'Families'],
    availability: 'Available',
    impactStatement: 'Healthy start for little ones',
    tags: ['baby', 'infant', 'health']
  },
  {
    id: 'med-007',
    title: 'Reading Glasses & Vision Aids',
    description: 'Reading glasses in various powers and magnifying glasses. Helps improve vision for reading and daily activities.',
    category: 'medical',
    condition: 'Gently Used',
    targetDemographics: ['Elderly', 'Working Adults'],
    availability: 'Available',
    impactStatement: 'See the world clearly',
    tags: ['vision', 'reading', 'glasses']
  },
  {
    id: 'med-008',
    title: 'Heating Pad & Pain Relief',
    description: 'Electric heating pad and hot water bottles for pain relief and muscle relaxation. Safe and effective pain management.',
    category: 'medical',
    condition: 'Moderately Used',
    targetDemographics: ['Elderly', 'Working Adults'],
    availability: 'Available',
    impactStatement: 'Comfort in times of pain',
    tags: ['pain-relief', 'heating', 'comfort']
  }
];

// Electronics Section Data
const electronicsItems: DonationItem[] = [
  {
    id: 'elec-001',
    title: 'Refurbished Laptop for Students',
    description: 'Working laptop with basic software installed. Perfect for online classes, homework, and skill development. Battery life 3-4 hours.',
    category: 'electronics',
    condition: 'Moderately Used',
    targetDemographics: ['Students'],
    availability: 'High Demand',
    impactStatement: 'Bridge the digital divide',
    testimonial: {
      text: 'This laptop changed my daughter\'s education journey completely!',
      author: 'Kavita R., Parent'
    },
    tags: ['laptop', 'education', 'digital'],
    isUrgent: true
  },
  {
    id: 'elec-002',
    title: 'Smartphone for Communication',
    description: 'Basic smartphone with calling, messaging, and internet capabilities. Helps stay connected with family and access online services.',
    category: 'electronics',
    condition: 'Gently Used',
    targetDemographics: ['Working Adults', 'Students'],
    availability: 'Limited Stock',
    impactStatement: 'Stay connected with the world',
    tags: ['smartphone', 'communication', 'connectivity']
  },
  {
    id: 'elec-003',
    title: 'Educational Tablet with Learning Apps',
    description: 'Tablet loaded with educational apps and e-books. Perfect for interactive learning and skill development for children.',
    category: 'electronics',
    condition: 'Gently Used',
    targetDemographics: ['Children', 'Students'],
    availability: 'Recently Requested',
    impactStatement: 'Interactive learning experience',
    tags: ['tablet', 'learning', 'interactive']
  },
  {
    id: 'elec-004',
    title: 'Radio & Music Player',
    description: 'FM radio with USB and SD card support. Provides entertainment and access to news and educational programs.',
    category: 'electronics',
    condition: 'Moderately Used',
    targetDemographics: ['Elderly', 'Families'],
    availability: 'Available',
    impactStatement: 'Entertainment and information access',
    tags: ['radio', 'music', 'entertainment']
  },
  {
    id: 'elec-005',
    title: 'LED TV for Family Entertainment',
    description: '32-inch LED TV in working condition. Perfect for family entertainment and educational programs. Includes remote control.',
    category: 'electronics',
    condition: 'Gently Used',
    targetDemographics: ['Families'],
    availability: 'High Demand',
    impactStatement: 'Bring families together',
    tags: ['television', 'entertainment', 'family']
  },
  {
    id: 'elec-006',
    title: 'Computer Accessories Bundle',
    description: 'Keyboard, mouse, speakers, and webcam. Essential accessories for computer setup and online learning.',
    category: 'electronics',
    condition: 'Gently Used',
    targetDemographics: ['Students', 'Working Adults'],
    availability: 'Available',
    impactStatement: 'Complete your digital setup',
    tags: ['accessories', 'computer', 'peripherals']
  },
  {
    id: 'elec-007',
    title: 'Solar Charger & Power Bank',
    description: 'Eco-friendly solar charger with power bank. Ensures devices stay charged even during power outages.',
    category: 'electronics',
    condition: 'Never Used',
    targetDemographics: ['Students', 'Working Adults'],
    availability: 'Available',
    impactStatement: 'Sustainable power solution',
    tags: ['solar', 'charger', 'sustainable']
  },
  {
    id: 'elec-008',
    title: 'Digital Camera for Memories',
    description: 'Basic digital camera for capturing precious moments and memories. Includes memory card and carrying case.',
    category: 'electronics',
    condition: 'Moderately Used',
    targetDemographics: ['Families', 'Students'],
    availability: 'Limited Stock',
    impactStatement: 'Capture life\'s precious moments',
    tags: ['camera', 'photography', 'memories']
  }
];

export const dummySections: DonationSection[] = [
  {
    id: 'clothes',
    title: 'Clothing & Accessories',
    description: 'Garments, shoes, and accessories for all ages and occasions',
    icon: '👕',
    items: clothesItems,
    totalItems: clothesItems.length,
    availableItems: clothesItems.filter(item => item.availability === 'Available').length,
    highDemandItems: clothesItems.filter(item => item.availability === 'High Demand').length
  },
  {
    id: 'education',
    title: 'Educational Materials',
    description: 'Books, stationery, and learning resources for students of all ages',
    icon: '📚',
    items: educationItems,
    totalItems: educationItems.length,
    availableItems: educationItems.filter(item => item.availability === 'Available').length,
    highDemandItems: educationItems.filter(item => item.availability === 'High Demand').length
  },
  {
    id: 'household',
    title: 'Household Items',
    description: 'Furniture, kitchenware, and home essentials for comfortable living',
    icon: '🏠',
    items: householdItems,
    totalItems: householdItems.length,
    availableItems: householdItems.filter(item => item.availability === 'Available').length,
    highDemandItems: householdItems.filter(item => item.availability === 'High Demand').length
  },
  {
    id: 'medical',
    title: 'Medical Supplies',
    description: 'Basic medical equipment and health monitoring devices',
    icon: '🏥',
    items: medicalItems,
    totalItems: medicalItems.length,
    availableItems: medicalItems.filter(item => item.availability === 'Available').length,
    highDemandItems: medicalItems.filter(item => item.availability === 'High Demand').length
  },
  {
    id: 'electronics',
    title: 'Electronics & Technology',
    description: 'Devices, gadgets, and tech accessories for digital inclusion',
    icon: '💻',
    items: electronicsItems,
    totalItems: electronicsItems.length,
    availableItems: electronicsItems.filter(item => item.availability === 'Available').length,
    highDemandItems: electronicsItems.filter(item => item.availability === 'High Demand').length
  }
];

// Export individual sections for easier access
export const clothesSection = dummySections[0];
export const educationSection = dummySections[1];
export const householdSection = dummySections[2];
export const medicalSection = dummySections[3];
export const electronicsSection = dummySections[4];
