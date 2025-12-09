import React, { useState } from 'react';
import HomePage from './components/HomePage';
import CampaignList from './components/CampaignList';
import CharactersPage from './components/CharactersPage';
import './styles/App.css';

type Page = 'home' | 'campaigns' | 'characters';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigateToCampaigns = () => {
    setCurrentPage('campaigns');
  };

  const handleNavigateToCharacters = () => {
    setCurrentPage('characters');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'home') {
    return (
      <div className="app">
        <HomePage
          onNavigateToCampaigns={handleNavigateToCampaigns}
          onNavigateToCharacters={handleNavigateToCharacters}
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
      <CampaignList onBackToHome={handleBackToHome} />
    </div>
  );
};

export default App;

