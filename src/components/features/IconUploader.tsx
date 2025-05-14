
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface IconUploaderProps {
  iconId: string;
  currentIcon?: string;
  onUpload: (iconId: string, iconUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const IconUploader = ({ iconId, currentIcon, onUpload, size = 'md' }: IconUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const sizeClass = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 2MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Create file reader to read the file
    const reader = new FileReader();
    reader.onload = (e) => {
      const iconUrl = e.target?.result as string;
      
      // Save icon to localStorage
      const customIcons = JSON.parse(localStorage.getItem('customIcons') || '{}');
      customIcons[iconId] = iconUrl;
      localStorage.setItem('customIcons', JSON.stringify(customIcons));
      
      onUpload(iconId, iconUrl);
      setIsUploading(false);
      
      toast({
        title: "Icon uploaded successfully",
        description: "Your custom icon has been saved",
      });
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "Failed to read the image file",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemoveIcon = () => {
    // Remove from localStorage
    const customIcons = JSON.parse(localStorage.getItem('customIcons') || '{}');
    delete customIcons[iconId];
    localStorage.setItem('customIcons', JSON.stringify(customIcons));
    
    onUpload(iconId, '');
    
    toast({
      title: "Icon removed",
      description: "Custom icon has been removed",
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`border rounded-md p-2 flex items-center justify-center bg-white ${sizeClass[size]} relative`}>
        {currentIcon ? (
          <img 
            src={currentIcon} 
            alt="Custom Icon" 
            className="w-full h-full object-contain"
          />
        ) : (
          <Upload className="w-full h-full text-gray-400" />
        )}
      </div>
      
      <div className="flex gap-2">
        <label className="cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleUpload}
            disabled={isUploading}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            disabled={isUploading}
            className="text-xs"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </label>
        
        {currentIcon && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleRemoveIcon}
            className="text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default IconUploader;
