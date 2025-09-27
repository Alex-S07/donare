import { DonationItem, FilterOptions, TargetDemographic, ItemCondition, AvailabilityStatus } from '@/types/donations';

/**
 * Filter donation items based on provided criteria
 */
export function filterDonationItems(
  items: DonationItem[],
  filters: FilterOptions,
  searchQuery?: string
): DonationItem[] {
  let filteredItems = [...items];

  // Apply search query
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      item.targetDemographics.some(demo => demo.toLowerCase().includes(query))
    );
  }

  // Apply condition filter
  if (filters.condition?.length) {
    filteredItems = filteredItems.filter(item => 
      filters.condition!.includes(item.condition)
    );
  }

  // Apply demographic filter
  if (filters.targetDemographic?.length) {
    filteredItems = filteredItems.filter(item =>
      item.targetDemographics.some(demo => 
        filters.targetDemographic!.includes(demo)
      )
    );
  }

  // Apply availability filter
  if (filters.availability?.length) {
    filteredItems = filteredItems.filter(item => 
      filters.availability!.includes(item.availability)
    );
  }

  return filteredItems;
}

/**
 * Sort donation items based on criteria
 */
export function sortDonationItems(
  items: DonationItem[],
  sortBy: 'newest' | 'oldest' | 'high_demand' | 'alphabetical'
): DonationItem[] {
  const sortedItems = [...items];

  switch (sortBy) {
    case 'newest':
      // Urgent items first, then by ID (simulating newest)
      return sortedItems.sort((a, b) => {
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
        return b.id.localeCompare(a.id);
      });

    case 'oldest':
      return sortedItems.sort((a, b) => a.id.localeCompare(b.id));

    case 'high_demand':
      const demandOrder: Record<AvailabilityStatus, number> = {
        'High Demand': 0,
        'Recently Requested': 1,
        'Limited Stock': 2,
        'Available': 3
      };
      return sortedItems.sort((a, b) => 
        demandOrder[a.availability] - demandOrder[b.availability]
      );

    case 'alphabetical':
      return sortedItems.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sortedItems;
  }
}

/**
 * Get condition badge styling
 */
export function getConditionStyling(condition: ItemCondition): string {
  switch (condition) {
    case 'Never Used':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Gently Used':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Moderately Used':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Widely Used':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Get availability badge styling
 */
export function getAvailabilityStyling(availability: AvailabilityStatus): string {
  switch (availability) {
    case 'Available':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Limited Stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'High Demand':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Recently Requested':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Get demographic icon
 */
export function getDemographicIcon(demographic: TargetDemographic): string {
  switch (demographic) {
    case 'Children':
      return '👶';
    case 'Women':
      return '👩';
    case 'Men':
      return '👨';
    case 'Elderly':
      return '👴';
    case 'Families':
      return '👨‍👩‍👧‍👦';
    case 'Students':
      return '🎓';
    case 'Working Adults':
      return '💼';
    default:
      return '👥';
  }
}

/**
 * Validate user permissions for actions
 */
export function validateUserAction(
  action: 'request' | 'donate',
  isAuthenticated: boolean,
  userType?: 'sender' | 'receiver'
): {
  canPerform: boolean;
  message: string;
} {
  if (!isAuthenticated) {
    return {
      canPerform: false,
      message: action === 'request' 
        ? 'Please sign up as a receiver to request items'
        : 'Please sign up as a donor to contribute items'
    };
  }

  if (action === 'request' && userType !== 'receiver') {
    return {
      canPerform: false,
      message: 'Only approved receivers can request items'
    };
  }

  if (action === 'donate' && userType !== 'sender') {
    return {
      canPerform: false,
      message: 'Only verified donors can contribute items'
    };
  }

  return {
    canPerform: true,
    message: ''
  };
}

/**
 * Generate item statistics
 */
export function generateItemStatistics(items: DonationItem[]) {
  const total = items.length;
  const available = items.filter(item => item.availability === 'Available').length;
  const highDemand = items.filter(item => item.availability === 'High Demand').length;
  const urgent = items.filter(item => item.isUrgent).length;

  const conditionBreakdown = items.reduce((acc, item) => {
    acc[item.condition] = (acc[item.condition] || 0) + 1;
    return acc;
  }, {} as Record<ItemCondition, number>);

  const demographicBreakdown = items.reduce((acc, item) => {
    item.targetDemographics.forEach(demo => {
      acc[demo] = (acc[demo] || 0) + 1;
    });
    return acc;
  }, {} as Record<TargetDemographic, number>);

  return {
    total,
    available,
    highDemand,
    urgent,
    conditionBreakdown,
    demographicBreakdown,
    availabilityRate: total > 0 ? Math.round((available / total) * 100) : 0,
    urgencyRate: total > 0 ? Math.round((urgent / total) * 100) : 0
  };
}

/**
 * Format item description for display
 */
export function formatItemDescription(description: string, maxLength: number = 150): string {
  if (description.length <= maxLength) {
    return description;
  }
  
  return description.substring(0, maxLength).trim() + '...';
}

/**
 * Generate SEO-friendly item URL slug
 */
export function generateItemSlug(title: string, id: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `${slug}-${id.slice(-8)}`;
}

/**
 * Calculate item relevance score for search
 */
export function calculateRelevanceScore(
  item: DonationItem,
  searchQuery: string,
  userDemographic?: TargetDemographic
): number {
  let score = 0;
  const query = searchQuery.toLowerCase();

  // Title match (highest weight)
  if (item.title.toLowerCase().includes(query)) {
    score += 10;
  }

  // Description match
  if (item.description.toLowerCase().includes(query)) {
    score += 5;
  }

  // Tag match
  if (item.tags?.some(tag => tag.toLowerCase().includes(query))) {
    score += 3;
  }

  // Demographic relevance
  if (userDemographic && item.targetDemographics.includes(userDemographic)) {
    score += 2;
  }

  // Urgency boost
  if (item.isUrgent) {
    score += 1;
  }

  // Availability penalty
  if (item.availability === 'High Demand') {
    score -= 1;
  }

  return score;
}

/**
 * Group items by category for display
 */
export function groupItemsByCategory(items: DonationItem[]) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, DonationItem[]>);
}

/**
 * Get recommended items based on user interaction
 */
export function getRecommendedItems(
  allItems: DonationItem[],
  viewedItems: string[],
  userDemographic?: TargetDemographic,
  limit: number = 4
): DonationItem[] {
  // Filter out already viewed items
  const unviewedItems = allItems.filter(item => !viewedItems.includes(item.id));
  
  // Score items based on relevance
  const scoredItems = unviewedItems.map(item => ({
    item,
    score: userDemographic && item.targetDemographics.includes(userDemographic) ? 2 : 1
  }));

  // Sort by score and return limited results
  return scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
