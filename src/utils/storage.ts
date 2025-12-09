import { Campaign } from '../types/Campaign';

const STORAGE_KEY = 'dnd_campaigns';
const JSON_FILE_NAME = 'campaigns.json';

export const getCampaigns = (): Campaign[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveCampaigns = (campaigns: Campaign[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  downloadJSON(campaigns);
};

export const downloadJSON = (campaigns: Campaign[]): void => {
  const dataStr = JSON.stringify(campaigns, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = JSON_FILE_NAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const loadFromJSON = (file: File): Promise<Campaign[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const campaigns = JSON.parse(content);
        if (Array.isArray(campaigns)) {
          resolve(campaigns);
        } else {
          reject(new Error('Invalid JSON format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

