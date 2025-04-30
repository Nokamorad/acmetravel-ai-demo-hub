
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

// Airlines
const airlines = [
  "United Airlines",
  "Delta Airlines",
  "American Airlines",
  "Southwest Airlines",
  "JetBlue Airways",
  "Alaska Airlines"
];

// Flight codes
const flightCodes = ["UA", "DL", "AA", "WN", "B6", "AS"];

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

// Generate unique trips based on visitor ID
export const generateUniqueTrips = (visitorId: string | null) => {
  // Default seed if no visitor ID
  const seed = visitorId || "default-visitor";
  
  // Number of trips (2-4 based on visitor ID)
  const numTrips = getRandomFromSeed(seed + "-count", 3) + 2;
  
  const trips = [];
  
  for (let i = 0; i < numTrips; i++) {
    // Generate unique trip properties based on seed+index
    const destIndex = getRandomFromSeed(seed + "-dest-" + i, destinations.length);
    const statusIndex = getRandomFromSeed(seed + "-status-" + i, tripStatuses.length);
    const daysOffset = getRandomFromSeed(seed + "-date-" + i, 60) + 5; // 5-65 days in future
    const duration = getRandomFromSeed(seed + "-duration-" + i, 5) + 2; // 2-7 days trip
    
    trips.push({
      id: `trip-${seed.substring(0, 6)}-${i}`,
      destination: destinations[destIndex].city,
      dates: getDateRange(daysOffset, duration),
      status: tripStatuses[statusIndex],
      image: destinations[destIndex].image
    });
  }
  
  return trips;
};

// Generate unique transactions based on visitor ID
export const generateUniqueTransactions = (visitorId: string | null) => {
  // Default seed if no visitor ID
  const seed = visitorId || "default-visitor";
  
  // Number of transactions (3-7 based on visitor ID)
  const numTransactions = getRandomFromSeed(seed + "-tx-count", 5) + 3;
  
  const transactions = [];
  
  for (let i = 0; i < numTransactions; i++) {
    // Generate unique transaction properties
    const categoryIndex = getRandomFromSeed(seed + "-cat-" + i, categories.length);
    const category = categories[categoryIndex];
    
    const vendorsList = vendorsByCategory[category];
    const vendorIndex = getRandomFromSeed(seed + "-vendor-" + i, vendorsList.length);
    
    const statusIndex = getRandomFromSeed(seed + "-tx-status-" + i, transactionStatuses.length);
    const daysOffset = getRandomFromSeed(seed + "-tx-date-" + i, 30) + 1; // 1-31 days in past
    
    // Generate an amount between $10 and $600 based on category
    let baseAmount: number;
    switch (category) {
      case "Airfare":
        baseAmount = getRandomFromSeed(seed + "-amount-" + i, 400) + 200; // $200-600
        break;
      case "Lodging":
        baseAmount = getRandomFromSeed(seed + "-amount-" + i, 150) + 100; // $100-250
        break;
      case "Transportation":
        baseAmount = getRandomFromSeed(seed + "-amount-" + i, 30) + 10; // $10-40
        break;
      default:
        baseAmount = getRandomFromSeed(seed + "-amount-" + i, 50) + 15; // $15-65
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
