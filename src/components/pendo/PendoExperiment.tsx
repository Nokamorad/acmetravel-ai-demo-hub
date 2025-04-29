
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExperimentVariant {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: "purple" | "pink";
  imageUrl?: string;
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
  
  return (
    <Card 
      className={`border hover:shadow-md transition-shadow duration-300 overflow-hidden`}
      data-pendo-id={`experiment-${experimentId}-variant-${variant.id}`}
    >
      <CardContent className="p-0">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{variant.title}</h3>
          <p className="text-gray-600 mb-4">{variant.description}</p>
          <Button 
            onClick={handleClick}
            className={`${variant.buttonColor === 'purple' 
              ? 'bg-acme-purple hover:bg-acme-purple-dark' 
              : 'bg-acme-pink hover:bg-opacity-90'} text-white w-full`}
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
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendoExperiment;
