import React from 'react';
import '../styles/HomePage.css';

interface HomePageProps {
  onNavigateToCampaigns: () => void;
  onNavigateToCharacters: () => void;
  onNavigateToDiaryEntries: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onNavigateToCampaigns,
  onNavigateToCharacters,
  onNavigateToDiaryEntries
}) => {
  return (
    <div className="home-page-container">
      <div className="home-header">
        <h1>D&D Campaign Tracker</h1>
      </div>
      <div className="home-cards-grid">
        <div className="home-card" onClick={onNavigateToCampaigns}>
          <div className="home-card-icon">
            <span className="material-icons">flag</span>
          </div>
          <h2>Campagne</h2>
          <p>Gestisci le tue campagne di Dungeons & Dragons</p>
        </div>
        <div className="home-card" onClick={onNavigateToCharacters}>
          <div className="home-card-icon">
            <span className="material-icons">people</span>
          </div>
          <h2>Personaggi</h2>
          <p>Visualizza tutti i personaggi delle tue campagne</p>
        </div>
        <div className="home-card" onClick={onNavigateToDiaryEntries}>
          <div className="home-card-icon">
            <span className="material-icons">history_edu</span>
          </div>
          <h2>Voci di Diario</h2>
          <p>Gestisci le voci di diario delle tue sessioni</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

