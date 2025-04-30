
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  ctaText: string;
  ctaUrl: string;
  accent: "purple" | "pink";
  imageUrl: string;
  keyPoints?: string[];
}

const FeatureCard = ({
  id,
  title,
  description,
  icon,
  ctaText,
  ctaUrl,
  accent,
  imageUrl,
  keyPoints = []
}: FeatureCardProps) => {
  const accentClasses = {
    purple: {
      bg: "bg-acme-purple/10",
      border: "border-acme-purple/30",
      button: "bg-acme-purple hover:bg-acme-purple-dark",
      icon: "text-acme-purple",
    },
    pink: {
      bg: "bg-acme-pink/10",
      border: "border-acme-pink/30",
      button: "bg-acme-pink hover:bg-opacity-90",
      icon: "text-acme-pink",
    },
  };
  
  // Function to simulate launching a Pendo guide
  const launchDemo = (demoType: string) => {
    console.log(`Demo started: ${demoType}`);
    
    // This would trigger a specific Pendo guide in production
    if ((window as any).simulatePendoGuide) {
      (window as any).simulatePendoGuide(`${demoType}-flow`);
    }
    
    // For the demo site, we'll also scroll to the anchor
    const element = document.getElementById(demoType);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id={id}
      data-pendo-id={`feature-card-${id}`}
      className={cn(
        "rounded-lg p-6 md:p-8 border",
        accentClasses[accent].bg,
        accentClasses[accent].border,
        "transition-transform duration-300 hover:-translate-y-2"
      )}
    >
      <div className="mb-4 text-2xl text-center md:text-left" data-pendo-id={`feature-icon-${id}`}>
        <span className={accentClasses[accent].icon}>{icon}</span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-acme-gray-dark text-center md:text-left">
        {title}
      </h3>
      
      <p className="text-acme-gray mb-6 text-center md:text-left">
        {description}
      </p>
      
      {keyPoints.length > 0 && (
        <ul className="mb-6 text-sm space-y-2" data-pendo-id={`feature-points-${id}`}>
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start" data-pendo-id={`feature-point-${id}-${index}`}>
              <span className={cn("mr-2 text-lg", accentClasses[accent].icon)}>•</span>
              <span className="text-acme-gray-dark">{point}</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg h-48 md:h-60 relative group" 
           data-pendo-id={`feature-image-container-${id}`}>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            variant="secondary" 
            size="sm"
            data-pendo-id={`preview-${id}`}
            onClick={() => {
              if ((window as any).simulatePendoGuide) {
                (window as any).simulatePendoGuide(`${id}-preview`);
              }
            }}
          >
            Preview
          </Button>
        </div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center"
          data-pendo-id={`feature-image-${id}`}
        />
      </div>
      
      <div className="text-center md:text-left">
        <Button 
          className={cn("text-white", accentClasses[accent].button)}
          data-pendo-id={`cta-${id}`}
          onClick={() => launchDemo(id)}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;
