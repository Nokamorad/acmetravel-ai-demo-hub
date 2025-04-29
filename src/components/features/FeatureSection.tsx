
import FeatureCard from "./FeatureCard";

interface FeatureSectionProps {
  title: string;
  description: string;
}

const FeatureSection = ({ title, description }: FeatureSectionProps) => {
  const features = [
    {
      id: "onboarding",
      title: "Getting Started",
      description: "Interactive onboarding experience with email integration to quickly get users productive with the platform.",
      icon: "🚀",
      ctaText: "Start Onboarding Demo",
      ctaUrl: "#onboarding-demo", // Replace with actual Pendo link
      accent: "purple" as const,
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
    },
    {
      id: "support",
      title: "Getting Help",
      description: "Smart support using frustration detection and session replay to provide timely assistance.",
      icon: "🤝",
      ctaText: "Start Support Demo",
      ctaUrl: "#support-demo", // Replace with actual Pendo link
      accent: "pink" as const,
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    },
    {
      id: "upsell",
      title: "Getting More",
      description: "Personalized upsell experiences with PMF surveys and A/B testing to drive growth.",
      icon: "✨",
      ctaText: "Start Upsell Demo",
      ctaUrl: "#upsell-demo", // Replace with actual Pendo link
      accent: "purple" as const,
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-acme-gray-dark mb-4">{title}</h2>
          <p className="text-acme-gray text-lg max-w-2xl mx-auto">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
