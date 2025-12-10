import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import CampaignList from './components/CampaignList';
import CharactersPage from './components/CharactersPage';
import DiaryEntryList from './components/DiaryEntryList';
import DiaryEntryForm from './components/DiaryEntryForm';
import { Campaign } from './types/Campaign';
import { Character } from './types/Character';
import { DiaryEntry } from './types/DiaryEntry';
import { getCampaigns, saveCampaigns, getCharacters, saveCharacters, getDiaryEntries, saveDiaryEntries } from './utils/storage';
import './styles/App.css';

type Page = 'home' | 'campaigns' | 'characters' | 'diary-entries' | 'diary-entry-form';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingDiaryEntry, setEditingDiaryEntry] = useState<DiaryEntry | null>(null);
  const [isCreatingDiaryEntry, setIsCreatingDiaryEntry] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCampaigns(getCampaigns());
    setCharacters(getCharacters());
  };

  const handleNavigateToCampaigns = () => {
    setCurrentPage('campaigns');
  };

  const handleNavigateToCharacters = () => {
    setCurrentPage('characters');
  };

  const handleNavigateToDiaryEntries = () => {
    setCurrentPage('diary-entries');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleOpenDiaryEntryForm = (entry: DiaryEntry | null, isCreating: boolean) => {
    setEditingDiaryEntry(entry);
    setIsCreatingDiaryEntry(isCreating);
    setCurrentPage('diary-entry-form');
  };

  const handleDiaryEntrySave = (entry: DiaryEntry) => {
    const allEntries = getDiaryEntries();
    let updated: DiaryEntry[];
    if (isCreatingDiaryEntry) {
      updated = [...allEntries, entry];
    } else {
      updated = allEntries.map(e => e.id === entry.id ? entry : e);
    }
    saveDiaryEntries(updated);
    setCurrentPage('diary-entries');
    setEditingDiaryEntry(null);
    setIsCreatingDiaryEntry(false);
  };

  const handleDiaryEntryCancel = () => {
    if (editingDiaryEntry) {
      setCurrentPage('diary-entries');
    } else {
      setCurrentPage('diary-entries');
    }
    setEditingDiaryEntry(null);
    setIsCreatingDiaryEntry(false);
  };

  if (currentPage === 'diary-entry-form') {
    const breadcrumbs = [
      { label: 'Home', onClick: handleBackToHome },
      { label: 'Voci di Diario', onClick: () => setCurrentPage('diary-entries') },
      { label: isCreatingDiaryEntry ? 'Nuova Voce' : 'Modifica Voce' }
    ];

    return (
      <div className="app">
        <DiaryEntryForm
          entry={editingDiaryEntry}
          campaigns={campaigns}
          characters={characters}
          isCreating={isCreatingDiaryEntry}
          onSave={handleDiaryEntrySave}
          onCancel={handleDiaryEntryCancel}
          breadcrumbs={breadcrumbs}
        />
      </div>
    );
  }

  if (currentPage === 'diary-entries') {
    const breadcrumbs = [
      { label: 'Home', onClick: handleBackToHome },
      { label: 'Voci di Diario' }
    ];

    return (
      <div className="app">
        <DiaryEntryList
          campaigns={campaigns}
          onBack={handleBackToHome}
          onOpenEntry={handleOpenDiaryEntryForm}
          breadcrumbs={breadcrumbs}
        />
      </div>
    );
  }

  if (currentPage === 'home') {
    return (
      <div className="app">
        <HomePage
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToCharacters={handleNavigateToCharacters}
          onNavigateToDiaryEntries={handleNavigateToDiaryEntries}
        />
      </div>
    );
  }

  if (currentPage === 'characters') {
    return (
      <div className="app">
        <CharactersPage onBack={handleBackToHome} />
      </div>
    );
  }

  return (
    <div className="app">
      <CampaignList
        onBackToHome={handleBackToHome}
        onOpenDiaryEntryForm={handleOpenDiaryEntryForm}
      />
    </div>
  );
};

export default App;

