
import React from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';
import { getCustomIcon } from '@/utils/iconManager';

export interface CustomIconProps extends Omit<LucideProps, 'ref'> {
  iconId: string;
  icon: LucideIcon;
  size?: number;
  className?: string;
  showDefault?: boolean; // Force showing default icon even if custom exists
}

const CustomIcon = ({ 
  iconId, 
  icon: Icon, 
  size = 24, 
  className = "", 
  showDefault = false,
  ...rest 
}: CustomIconProps) => {
  const customIconUrl = !showDefault ? getCustomIcon(iconId) : null;
  
  if (customIconUrl) {
    return (
      <span 
        className={`inline-block ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={customIconUrl} 
          alt={iconId} 
          className="w-full h-full object-contain"
          width={size}
          height={size}
        />
      </span>
    );
  }
  
  return <Icon size={size} className={className} {...rest} />;
};

export default CustomIcon;
