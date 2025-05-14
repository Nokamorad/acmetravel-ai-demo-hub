
/**
 * Utility for managing custom icons in localStorage
 */

export interface CustomIconsMap {
  [iconId: string]: string; // iconId -> dataURL
}

export const getCustomIcon = (iconId: string): string | null => {
  try {
    const customIcons = JSON.parse(localStorage.getItem('customIcons') || '{}');
    return customIcons[iconId] || null;
  } catch (error) {
    console.error('Error retrieving custom icon:', error);
    return null;
  }
};

export const getAllCustomIcons = (): CustomIconsMap => {
  try {
    return JSON.parse(localStorage.getItem('customIcons') || '{}');
  } catch (error) {
    console.error('Error retrieving custom icons:', error);
    return {};
  }
};

export const saveCustomIcon = (iconId: string, iconUrl: string): void => {
  try {
    const customIcons = getAllCustomIcons();
    customIcons[iconId] = iconUrl;
    localStorage.setItem('customIcons', JSON.stringify(customIcons));
  } catch (error) {
    console.error('Error saving custom icon:', error);
  }
};

export const removeCustomIcon = (iconId: string): void => {
  try {
    const customIcons = getAllCustomIcons();
    delete customIcons[iconId];
    localStorage.setItem('customIcons', JSON.stringify(customIcons));
  } catch (error) {
    console.error('Error removing custom icon:', error);
  }
};

export const clearAllCustomIcons = (): void => {
  localStorage.removeItem('customIcons');
};
