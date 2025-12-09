import { Campaign } from '../types/Campaign';
import { Character } from '../types/Character';

const STORAGE_KEY = 'dnd_data';
const JSON_FILE_NAME = 'dnd_data.json';

interface DndData {
  campaigns: Campaign[];
  characters: Character[];
}

const getDefaultData = (): DndData => ({
  campaigns: [],
  characters: []
});

export const getData = (): DndData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return getDefaultData();
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return { campaigns: parsed, characters: [] };
    }
    return {
      campaigns: parsed.campaigns || [],
      characters: parsed.characters || []
    };
  } catch {
    return getDefaultData();
  }
};

export const saveData = (data: DndData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  downloadJSON(data);
};

export const getCampaigns = (): Campaign[] => {
  return getData().campaigns;
};

export const saveCampaigns = (campaigns: Campaign[]): void => {
  const data = getData();
  data.campaigns = campaigns;
  saveData(data);
};

export const getCharacters = (): Character[] => {
  return getData().characters;
};

export const saveCharacters = (characters: Character[]): void => {
  const data = getData();
  data.characters = characters;
  saveData(data);
};

export const downloadJSON = (data: DndData): void => {
  const dataStr = JSON.stringify(data, null, 2);
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

export const loadFromJSON = (file: File): Promise<DndData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          resolve({ campaigns: parsed, characters: [] });
        } else if (parsed.campaigns || parsed.characters) {
          resolve({
            campaigns: parsed.campaigns || [],
            characters: parsed.characters || []
          });
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

