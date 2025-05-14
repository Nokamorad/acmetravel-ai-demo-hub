
import React from 'react';
import AppLayout from "@/components/layout/AppLayout";
import IconManager from "@/components/features/IconManager";

const IconSettings = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Icon Settings</h1>
        <p className="text-gray-600 mb-8">
          Customize the icons used throughout the application. Upload your own images to replace 
          the default icons. Uploaded icons will be saved to your browser's local storage.
        </p>
        <IconManager />
      </div>
    </AppLayout>
  );
};

export default IconSettings;
