
const FeaturedDestinations = () => {
  const destinations = [
    { 
      city: "New York", 
      country: "USA", 
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=300&h=200"
    },
    { 
      city: "Munich", 
      country: "Germany", 
      image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      city: "Tokyo", 
      country: "Japan", 
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&q=80&w=300&h=200"
    },
    { 
      city: "Paris", 
      country: "France", 
      image: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-midnight-navy mb-4">Featured Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map((destination, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden group h-48 shadow-md">
            <img 
              src={destination.image} 
              alt={destination.city} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
              <h3 className="text-white font-semibold">{destination.city}</h3>
              <p className="text-white/80 text-sm">{destination.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinations;
