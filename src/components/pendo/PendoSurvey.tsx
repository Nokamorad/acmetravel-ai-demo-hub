
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PendoSurveyProps {
  type: 'nps' | 'pmf' | 'csat';
  title: string;
  description: string;
  pendoId: string;
}

const PendoSurvey = ({ type, title, description, pendoId }: PendoSurveyProps) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  
  const handleSubmit = () => {
    if (!selectedValue && type !== 'pmf') {
      toast({
        title: "Please select a value",
        description: "You need to provide feedback before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    // Log the submission for Pendo tracking
    console.log(`Survey submitted: ${pendoId} with value: ${selectedValue}`);
    
    setSubmitted(true);
    toast({
      title: "Feedback received",
      description: "Thank you for your valuable feedback!",
    });
  };
  
  const renderSurvey = () => {
    switch (type) {
      case 'nps':
        return (
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-3">How likely are you to recommend AcmeTravel to a colleague?</p>
            <div className="flex justify-between items-center gap-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    selectedValue === value 
                      ? 'bg-acme-purple text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedValue(value)}
                  data-pendo-id={`nps-score-${value}`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
          </div>
        );
        
      case 'pmf':
        return (
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-3">How would you feel if you could no longer use AcmeTravel?</p>
            <div className="space-y-2">
              {['Very disappointed', 'Somewhat disappointed', 'Not disappointed'].map((option) => (
                <button
                  key={option}
                  className={`w-full p-3 rounded-md text-left ${
                    selectedValue === (['Very disappointed', 'Somewhat disappointed', 'Not disappointed'].indexOf(option))
                      ? 'bg-acme-purple text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedValue(['Very disappointed', 'Somewhat disappointed', 'Not disappointed'].indexOf(option))}
                  data-pendo-id={`pmf-${option.toLowerCase().replace(' ', '-')}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
        
      case 'csat':
        return (
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-3">How satisfied are you with your recent flight rebooking experience?</p>
            <div className="flex justify-between items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`w-12 h-12 rounded-md text-sm font-medium ${
                    selectedValue === value 
                      ? 'bg-acme-purple text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedValue(value)}
                  data-pendo-id={`csat-score-${value}`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Very unsatisfied</span>
              <span>Very satisfied</span>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Card className="w-full border-t-4 border-acme-pink" data-pendo-id={pendoId}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          renderSurvey()
        ) : (
          <div className="py-6 text-center">
            <p className="text-acme-purple font-medium">Thank you for your feedback!</p>
            <p className="text-sm text-gray-500 mt-2">Your input helps us improve Travel Agent.</p>
          </div>
        )}
      </CardContent>
      {!submitted && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => console.log('Survey dismissed')}>
            Skip
          </Button>
          <Button 
            className="bg-acme-purple hover:bg-acme-purple-dark"
            onClick={handleSubmit}
            data-pendo-id={`${pendoId}-submit`}
          >
            Submit Feedback
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PendoSurvey;
