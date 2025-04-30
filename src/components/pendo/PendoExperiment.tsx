
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExperimentVariant {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: "default" | "destructive" | "sky" | "sunset" | "navy";
  imageUrl?: string;
  iconUrl?: string;
}

interface PendoExperimentProps {
  experimentId: string;
  variants: ExperimentVariant[];
  defaultVariant?: number;
}

const PendoExperiment = ({ 
  experimentId, 
  variants, 
  defaultVariant = 0 
}: PendoExperimentProps) => {
  const [activeVariant, setActiveVariant] = useState<number>(defaultVariant);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  useEffect(() => {
    // In production, Pendo would determine which variant to show
    // Here we'll just randomize it or use the defaultVariant
    if (!(window as any).pendoExperiments) {
      (window as any).pendoExperiments = {};
    }
    
    if (!(window as any).pendoExperiments[experimentId]) {
      const randomVariant = Math.floor(Math.random() * variants.length);
      setActiveVariant(randomVariant);
      (window as any).pendoExperiments[experimentId] = randomVariant;
      
      console.log(`Pendo Experiment ${experimentId} showing variant: ${randomVariant}`);
    } else {
      setActiveVariant((window as any).pendoExperiments[experimentId]);
    }
  }, [experimentId, variants.length, defaultVariant]);
  
  const handleClick = () => {
    // Track conversion in the experiment
    console.log(`Pendo Experiment ${experimentId} conversion on variant: ${activeVariant}`);
    setHasInteracted(true);
  };
  
  const variant = variants[activeVariant];

  // Map buttonColor to appropriate classes
  const getButtonClasses = (color: string) => {
    switch(color) {
      case 'sky':
        return 'bg-sky-blue hover:bg-sky-blue/90 text-white';
      case 'sunset':
        return 'bg-sunset-coral hover:bg-sunset-coral/90 text-white';
      case 'navy':
        return 'bg-midnight-navy hover:bg-midnight-navy/90 text-white';
      default:
        return '';
    }
  };
  
  return (
    <Card 
      className={`border hover:shadow-md transition-shadow duration-300 overflow-hidden`}
      data-pendo-id={`experiment-${experimentId}-variant-${variant.id}`}
    >
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            {variant.iconUrl && (
              <div className="w-8 h-8 flex-shrink-0">
                <img 
                  src={variant.iconUrl} 
                  alt="" 
                  className="w-full h-full object-contain"
                  data-pendo-id={`experiment-${experimentId}-icon`}
                />
              </div>
            )}
            <h3 className="text-lg font-semibold">{variant.title}</h3>
          </div>
          
          <p className="text-gray-600 mb-4">{variant.description}</p>
          <Button 
            onClick={handleClick}
            variant={variant.buttonColor === 'sky' || variant.buttonColor === 'sunset' || variant.buttonColor === 'navy' ? 'outline' : variant.buttonColor}
            className={`w-full ${getButtonClasses(variant.buttonColor)}`}
            data-pendo-id={`experiment-${experimentId}-button`}
          >
            {hasInteracted ? 'Added to Itinerary' : variant.buttonText}
          </Button>
        </div>
        
        {variant.imageUrl && (
          <div className="h-40 w-full">
            <img 
              src={variant.imageUrl} 
              alt={variant.title} 
              className="w-full h-full object-cover"
              data-pendo-id={`experiment-${experimentId}-image`}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendoExperiment;
