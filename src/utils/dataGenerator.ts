
// Data generator utility for creating unique travel data based on visitor ID

// Destinations with their corresponding images
const destinations = [
  {
    city: "San Francisco",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
  {
    city: "New York",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
  {
    city: "Chicago",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
  {
    city: "Seattle",
    image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
  {
    city: "Boston",
    image: "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
  {
    city: "Austin",
    image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  }
];

// Premium destinations
const premiumDestinations = [
  {
    city: "Tokyo",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
  {
    city: "London",
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
  {
    city: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  },
];

// Airlines
const airlines = [
  "United Airlines",
  "Delta Airlines",
  "American Airlines",
  "Southwest Airlines",
  "JetBlue Airways",
  "Alaska Airlines"
];

// Premium airlines
const premiumAirlines = [
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "All Nippon Airways",
  "Cathay Pacific"
];

// Flight codes
const flightCodes = ["UA", "DL", "AA", "WN", "B6", "AS"];
const premiumFlightCodes = ["EK", "QR", "SQ", "NH", "CX"];

// Hotels
const hotels = [
  "Hilton",
  "Marriott",
  "Sheraton",
  "Hyatt",
  "Westin",
  "Four Seasons",
  "Ritz-Carlton"
];

// Premium hotels
const premiumHotels = [
  "Four Seasons",
  "Ritz-Carlton",
  "Mandarin Oriental",
  "St. Regis",
  "Waldorf Astoria"
];

// Status options
const tripStatuses = ["Confirmed", "Pending", "Draft", "Awaiting Approval"];
const transactionStatuses = ["Approved", "Pending", "Submitted", "Rejected"];

// Categories
const categories = ["Airfare", "Lodging", "Transportation", "Meals", "Incidentals"];

// Vendors by category
const vendorsByCategory = {
  Airfare: ["United Airlines", "Delta Airlines", "American Airlines", "Southwest Airlines", "JetBlue"],
  Lodging: ["Hilton Hotels", "Marriott", "Sheraton", "Hyatt Regency", "Westin"],
  Transportation: ["Uber", "Lyft", "Hertz", "Enterprise", "Yellow Cab"],
  Meals: ["Starbucks", "Chipotle", "Panera Bread", "Legal Seafood", "The Capital Grille"],
  Incidentals: ["CVS Pharmacy", "Walgreens", "Amazon", "Office Depot", "Staples"]
};

// Premium vendors by category
const premiumVendorsByCategory = {
  Airfare: ["Emirates", "Qatar Airways", "Singapore Airlines", "Cathay Pacific", "Lufthansa First Class"],
  Lodging: ["Four Seasons", "Ritz-Carlton", "Mandarin Oriental", "St. Regis", "Waldorf Astoria"],
  Transportation: ["Blacklane", "ExecuCar", "GroundLink", "Sixt", "Luxury Car Service"],
  Meals: ["Nobu", "Per Se", "French Laundry", "Masa", "Eleven Madison Park"],
  Incidentals: ["Louis Vuitton", "Tiffany & Co", "Apple Store", "Brooks Brothers", "Montblanc"]
};

// Helper to generate a pseudo-random number from a seed string
const getRandomFromSeed = (seed: string, max: number): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
};

// Generate a date string in the future
const getFutureDate = (daysOffset: number): string => {
  const now = new Date();
  const futureDate = new Date(now.setDate(now.getDate() + daysOffset));
  return futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Generate a date string in the past
const getPastDate = (daysOffset: number): string => {
  const now = new Date();
  const pastDate = new Date(now.setDate(now.getDate() - daysOffset));
  return `${pastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${pastDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
};

// Generate date range string
const getDateRange = (startOffset: number, duration: number): string => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + startOffset);
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + duration);
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Get the tier information from the visitor data
const getVisitorTier = (visitorId: string | null): string => {
  if (!visitorId) return 'standard';
  
  try {
    const visitorData = localStorage.getItem('acmetravel_visitor');
    if (visitorData) {
      const parsedData = JSON.parse(visitorData);
      return parsedData.tier || 'standard';
    }
    return 'standard';
  } catch (error) {
    return 'standard';
  }
};

// Generate unique trips based on visitor ID
export const generateUniqueTrips = (visitorId: string | null) => {
  // Default seed if no visitor ID
  const seed = visitorId || "default-visitor";
  const tier = getVisitorTier(visitorId);
  
  // Number of trips varies based on tier
  let numTrips: number;
  if (tier === 'executive') {
    numTrips = getRandomFromSeed(seed + "-count", 2) + 4; // 4-6 trips
  } else if (tier === 'premium') {
    numTrips = getRandomFromSeed(seed + "-count", 3) + 2; // 2-5 trips
  } else {
    numTrips = getRandomFromSeed(seed + "-count", 2) + 1; // 1-3 trips
  }
  
  const trips = [];
  
  for (let i = 0; i < numTrips; i++) {
    // Generate unique trip properties based on seed+index
    const allDestinations = tier === 'standard' ? destinations : 
                           [...destinations, ...(tier === 'executive' ? premiumDestinations : [])];
    
    const destIndex = getRandomFromSeed(seed + "-dest-" + i, allDestinations.length);
    const statusIndex = getRandomFromSeed(seed + "-status-" + i, tripStatuses.length);
    const daysOffset = getRandomFromSeed(seed + "-date-" + i, 60) + 5; // 5-65 days in future
    
    // Duration is longer for higher tier travelers
    let duration: number;
    if (tier === 'executive') {
      duration = getRandomFromSeed(seed + "-duration-" + i, 7) + 3; // 3-10 days
    } else if (tier === 'premium') {
      duration = getRandomFromSeed(seed + "-duration-" + i, 5) + 2; // 2-7 days
    } else {
      duration = getRandomFromSeed(seed + "-duration-" + i, 4) + 1; // 1-5 days
    }
    
    trips.push({
      id: `trip-${seed.substring(0, 6)}-${i}`,
      destination: allDestinations[destIndex].city,
      dates: getDateRange(daysOffset, duration),
      status: tripStatuses[statusIndex],
      image: allDestinations[destIndex].image
    });
  }
  
  return trips;
};

// Generate unique transactions based on visitor ID
export const generateUniqueTransactions = (visitorId: string | null) => {
  // Default seed if no visitor ID
  const seed = visitorId || "default-visitor";
  const tier = getVisitorTier(visitorId);
  
  // Number of transactions varies by tier
  let numTransactions: number;
  if (tier === 'executive') {
    numTransactions = getRandomFromSeed(seed + "-tx-count", 4) + 6; // 6-10 transactions
  } else if (tier === 'premium') {
    numTransactions = getRandomFromSeed(seed + "-tx-count", 4) + 3; // 3-7 transactions
  } else {
    numTransactions = getRandomFromSeed(seed + "-tx-count", 3) + 1; // 1-4 transactions
  }
  
  const transactions = [];
  
  for (let i = 0; i < numTransactions; i++) {
    // Generate unique transaction properties
    const categoryIndex = getRandomFromSeed(seed + "-cat-" + i, categories.length);
    const category = categories[categoryIndex];
    
    // Use premium vendors for executive and premium tiers
    const vendorsList = (tier === 'executive' || (tier === 'premium' && getRandomFromSeed(seed + "-vendor-premium-" + i, 100) < 50))
      ? premiumVendorsByCategory[category]
      : vendorsByCategory[category];
    
    const vendorIndex = getRandomFromSeed(seed + "-vendor-" + i, vendorsList.length);
    
    const statusIndex = getRandomFromSeed(seed + "-tx-status-" + i, transactionStatuses.length);
    const daysOffset = getRandomFromSeed(seed + "-tx-date-" + i, 30) + 1; // 1-31 days in past
    
    // Generate an amount based on category and tier
    let baseAmount: number;
    const tierMultiplier = tier === 'executive' ? 2.5 : (tier === 'premium' ? 1.5 : 1);
    
    switch (category) {
      case "Airfare":
        baseAmount = (getRandomFromSeed(seed + "-amount-" + i, 400) + 200) * tierMultiplier; // $200-600 base
        break;
      case "Lodging":
        baseAmount = (getRandomFromSeed(seed + "-amount-" + i, 150) + 100) * tierMultiplier; // $100-250 base
        break;
      case "Transportation":
        baseAmount = (getRandomFromSeed(seed + "-amount-" + i, 30) + 10) * tierMultiplier; // $10-40 base
        break;
      default:
        baseAmount = (getRandomFromSeed(seed + "-amount-" + i, 50) + 15) * tierMultiplier; // $15-65 base
    }
    
    const amount = baseAmount + (getRandomFromSeed(seed + "-cents-" + i, 100) / 100);
    
    transactions.push({
      id: i + 1,
      vendor: vendorsList[vendorIndex],
      date: getPastDate(daysOffset),
      category: category,
      status: transactionStatuses[statusIndex],
      amount: amount
    });
  }
  
  // Sort by most recent date
  return transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

// Generate unique trip detail based on visitor ID and trip ID
export const generateTripDetail = (visitorId: string | null, tripId: string) => {
  // Implementation for trip detail generation if needed later
};
