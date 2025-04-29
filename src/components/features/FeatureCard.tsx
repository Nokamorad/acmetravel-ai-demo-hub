
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
      <div className="mb-4 text-2xl text-center md:text-left">
        <span className={accentClasses[accent].icon}>{icon}</span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-acme-gray-dark text-center md:text-left">
        {title}
      </h3>
      
      <p className="text-acme-gray mb-6 text-center md:text-left">
        {description}
      </p>
      
      {keyPoints.length > 0 && (
        <ul className="mb-6 text-sm space-y-2">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className={cn("mr-2 text-lg", accentClasses[accent].icon)}>•</span>
              <span className="text-acme-gray-dark">{point}</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg h-48 md:h-60">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="text-center md:text-left">
        <Button 
          className={cn("text-white", accentClasses[accent].button)}
          data-pendo-id={`cta-${id}`}
          onClick={() => {
            // Track click event and then navigate
            console.log(`Demo started: ${id}`);
            // This is where you would add Pendo tracking if needed
            window.location.href = ctaUrl;
          }}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;
