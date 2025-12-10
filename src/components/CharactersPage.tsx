import React, { useState, useEffect } from 'react';
import { Character } from '../types/Character';
import { Campaign } from '../types/Campaign';
import { getCharacters, saveCharacters, getCampaigns } from '../utils/storage';
import CharacterDetails from './CharacterDetails';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';
import '../styles/CharactersPage.css';

interface CharactersPageProps {
  onBack: () => void;
}

const CharactersPage: React.FC<CharactersPageProps> = ({ onBack }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);

  useEffect(() => {
    loadCharacters();
    loadCampaigns();
  }, []);

  const loadCharacters = () => {
    const loaded = getCharacters();
    setCharacters(loaded);
  };

  const loadCampaigns = () => {
    const loaded = getCampaigns();
    setCampaigns(loaded);
  };

  const handleCharacterClick = (character: Character) => {
    setEditingCharacter(character);
    setIsCreatingCharacter(false);
    setShowCharacterForm(true);
  };

  const handleCharacterFormSave = (character: Character) => {
    if (isCreatingCharacter) {
      const updated = [...characters, character];
      setCharacters(updated);
      saveCharacters(updated);
    } else {
      const updated = characters.map(c => c.id === character.id ? character : c);
      setCharacters(updated);
      saveCharacters(updated);
    }
    setShowCharacterForm(false);
    setEditingCharacter(null);
    setIsCreatingCharacter(false);
  };

  const handleCharacterFormCancel = () => {
    setShowCharacterForm(false);
    setEditingCharacter(null);
    setIsCreatingCharacter(false);
  };

  const handleCharacterFormDelete = (characterId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo personaggio?')) {
      const updated = characters.filter(c => c.id !== characterId);
      setCharacters(updated);
      saveCharacters(updated);
      setShowCharacterForm(false);
      setEditingCharacter(null);
      setIsCreatingCharacter(false);
    }
  };

  const handleCreate = () => {
    setEditingCharacter(null);
    setIsCreatingCharacter(true);
    setShowCharacterForm(true);
  };

  if (showCharacterForm) {
    const breadcrumbs = [
      { label: 'Home', onClick: onBack },
      { label: 'Personaggi', onClick: handleCharacterFormCancel },
      { label: isCreatingCharacter ? 'Nuovo Personaggio' : editingCharacter?.nome || '' }
    ];

    return (
      <CharacterDetails
        character={editingCharacter}
        campaigns={campaigns.map(c => ({ id: c.id, nome: c.nome }))}
        isCreating={isCreatingCharacter}
        onSave={handleCharacterFormSave}
        onDelete={handleCharacterFormDelete}
        onBack={handleCharacterFormCancel}
        breadcrumbs={breadcrumbs}
      />
    );
  }

  const charactersPageBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', onClick: onBack },
    { label: 'Personaggi' }
  ];

  return (
    <div className="characters-page-container">
      <Breadcrumbs items={charactersPageBreadcrumbs} />
      <div className="characters-page-header">
        <h1>Personaggi</h1>
        <button className="btn-primary" onClick={handleCreate}>
          Crea Personaggio
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="empty-state">
          <p>Nessun personaggio disponibile</p>
        </div>
      ) : (
        <div className="characters-list">
          {characters.map(character => (
            <div 
              key={character.id} 
              className="character-list-item"
              onClick={() => handleCharacterClick(character)}
            >
              <div className="character-list-name">
                <h3>{character.nome}</h3>
              </div>
              <div className="character-list-info">
                <span className="character-list-class">{character.classe || '-'}</span>
                <span className="character-list-separator">•</span>
                <span className="character-list-race">{character.razza || '-'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharactersPage;

