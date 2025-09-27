export type ItemCondition = 'Never Used' | 'Gently Used' | 'Moderately Used' | 'Widely Used';

export type TargetDemographic = 'Children' | 'Women' | 'Men' | 'Elderly' | 'Families' | 'Students' | 'Working Adults';

export type AvailabilityStatus = 'Available' | 'Limited Stock' | 'High Demand' | 'Recently Requested';

export type DonationCategory = 'clothes' | 'education' | 'household' | 'medical' | 'electronics';

export interface DonationItem {
  id: string;
  title: string;
  description: string;
  category: DonationCategory;
  condition: ItemCondition;
  targetDemographics: TargetDemographic[];
  availability: AvailabilityStatus;
  imageUrl?: string;
  impactStatement?: string;
  testimonial?: {
    text: string;
    author: string;
  };
  tags?: string[];
  isUrgent?: boolean;
  donatedBy?: string;
  location?: string;
}

export interface DonationSection {
  id: DonationCategory;
  title: string;
  description: string;
  icon: string;
  items: DonationItem[];
  totalItems: number;
  availableItems: number;
  highDemandItems: number;
}

export interface FilterOptions {
  condition?: ItemCondition[];
  targetDemographic?: TargetDemographic[];
  availability?: AvailabilityStatus[];
  searchQuery?: string;
}

export interface DonationCardProps {
  item: DonationItem;
  onRequestItem: (itemId: string) => void;
  onDonateSimilar: (itemId: string) => void;
  isAuthenticated: boolean;
  userType?: 'sender' | 'receiver';
  showActions?: boolean;
}

export interface SectionHeaderProps {
  section: DonationSection;
  activeFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

// Action button types
export type ActionType = 'request' | 'donate' | 'login_required';

export interface ActionButtonProps {
  type: ActionType;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Statistics for sections
export interface SectionStats {
  totalDonations: number;
  activeDonors: number;
  itemsFulfilled: number;
  averageResponseTime: string;
}

// User interaction tracking
export interface UserInteraction {
  itemId: string;
  action: 'view' | 'request' | 'donate_similar' | 'share';
  timestamp: Date;
  userId?: string;
  userType?: 'sender' | 'receiver' | 'anonymous';
}

// Search and filter state
export interface SearchState {
  query: string;
  filters: FilterOptions;
  sortBy: 'newest' | 'oldest' | 'high_demand' | 'alphabetical';
  viewMode: 'grid' | 'list';
}

// Component state interfaces
export interface DonationShowcaseState {
  activeSection: DonationCategory;
  searchState: SearchState;
  loading: boolean;
  error?: string;
  selectedItem?: DonationItem;
  showRequestModal: boolean;
  showDonateModal: boolean;
}

// API response types
export interface DonationItemsResponse {
  success: boolean;
  data: {
    items: DonationItem[];
    total: number;
    hasMore: boolean;
  };
  error?: string;
}

export interface RequestItemPayload {
  itemId: string;
  requesterId: string;
  message?: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  preferredDelivery: 'pickup' | 'delivery' | 'either';
}

export interface DonateItemPayload {
  title: string;
  description: string;
  category: DonationCategory;
  condition: ItemCondition;
  targetDemographics: TargetDemographic[];
  donorId: string;
  images?: File[];
  location: string;
  availableUntil?: Date;
}

// Notification types
export interface DonationNotification {
  id: string;
  type: 'item_requested' | 'item_donated' | 'request_fulfilled' | 'new_similar_item';
  title: string;
  message: string;
  itemId?: string;
  userId: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Analytics and insights
export interface DonationInsights {
  popularCategories: Array<{
    category: DonationCategory;
    requestCount: number;
    fulfillmentRate: number;
  }>;
  demandTrends: Array<{
    demographic: TargetDemographic;
    trendDirection: 'up' | 'down' | 'stable';
    changePercentage: number;
  }>;
  seasonalPatterns: Array<{
    month: string;
    category: DonationCategory;
    demandLevel: 'low' | 'medium' | 'high';
  }>;
}

// Form validation schemas
export interface ItemValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  images: {
    maxCount: number;
    maxSizePerFile: number; // in bytes
    allowedTypes: string[];
  };
}

// Constants
export const ITEM_CONDITIONS: ItemCondition[] = [
  'Never Used',
  'Gently Used', 
  'Moderately Used',
  'Widely Used'
];

export const TARGET_DEMOGRAPHICS: TargetDemographic[] = [
  'Children',
  'Women', 
  'Men',
  'Elderly',
  'Families',
  'Students',
  'Working Adults'
];

export const AVAILABILITY_STATUSES: AvailabilityStatus[] = [
  'Available',
  'Limited Stock',
  'High Demand',
  'Recently Requested'
];

export const DONATION_CATEGORIES: Array<{
  id: DonationCategory;
  label: string;
  description: string;
}> = [
  {
    id: 'clothes',
    label: 'Clothing & Accessories',
    description: 'Garments, shoes, and accessories for all ages'
  },
  {
    id: 'education',
    label: 'Educational Materials',
    description: 'Books, stationery, and learning resources'
  },
  {
    id: 'household',
    label: 'Household Items',
    description: 'Furniture, kitchenware, and home essentials'
  },
  {
    id: 'medical',
    label: 'Medical Supplies',
    description: 'Basic medical equipment and supplies'
  },
  {
    id: 'electronics',
    label: 'Electronics & Technology',
    description: 'Devices, gadgets, and tech accessories'
  }
];
