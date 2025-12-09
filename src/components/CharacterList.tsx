import React, { useState } from 'react';
import { Character } from '../types/Character';
import CharacterDetails from './CharacterDetails';
import '../styles/CharacterList.css';

interface CharacterListProps {
  characters: Character[];
  campaigns: { id: string; nome: string }[];
  onUpdate: (character: Character) => void;
  onDelete: (characterId: string) => void;
  onAdd: (character: Character) => void;
  onOpenCharacterForm: (character: Character | null, isCreating: boolean) => void;
  campaignId?: string;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  campaigns,
  onUpdate,
  onDelete,
  onAdd,
  onOpenCharacterForm,
  campaignId
}) => {
  const filteredCharacters = campaignId
    ? characters.filter(c => c.campaignIds.includes(campaignId))
    : characters;

  const getModifier = (stat: number): number => {
    return Math.floor((stat - 10) / 2);
  };

  const handleCharacterCardClick = (character: Character) => {
    onOpenCharacterForm(character, false);
  };

  const handleCreate = () => {
    onOpenCharacterForm(null, true);
  };

  return (
    <div className="character-list-container">
      <div className="character-list-header">
        <div className="character-list-actions">
          <button className="btn-primary" onClick={handleCreate}>
            Crea Personaggio
          </button>
        </div>
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="empty-state">
          <p>Nessun personaggio disponibile</p>
        </div>
      ) : (
        <div className="characters-details-grid">
          {filteredCharacters.map(character => (
            <div key={character.id} className="character-detail-card" onClick={() => handleCharacterCardClick(character)}>
              <div className="character-card-header">
                <h3>{character.nome}</h3>
                <span className="character-level">Livello {character.livello}</span>
              </div>
              <div className="character-card-info">
                <div className="character-card-main-info">
                  <div className="character-info-box">
                    <span className="info-label">Classe</span>
                    <span className="info-value">{character.classe || '-'}</span>
                  </div>
                  <div className="character-info-box">
                    <span className="info-label">Razza</span>
                    <span className="info-value">{character.razza || '-'}</span>
                  </div>
                  {character.background && (
                    <div className="character-info-box">
                      <span className="info-label">Background</span>
                      <span className="info-value">{character.background}</span>
                    </div>
                  )}
                  {character.allineamento && (
                    <div className="character-info-box">
                      <span className="info-label">Allineamento</span>
                      <span className="info-value">{character.allineamento}</span>
                    </div>
                  )}
                </div>
                <div className="character-card-stats">
                  <div className="stat-mini">
                    <span className="stat-label">FOR</span>
                    <span className="stat-value">{character.forza}</span>
                    <span className="stat-mod">({getModifier(character.forza) >= 0 ? '+' : ''}{getModifier(character.forza)})</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-label">DES</span>
                    <span className="stat-value">{character.destrezza}</span>
                    <span className="stat-mod">({getModifier(character.destrezza) >= 0 ? '+' : ''}{getModifier(character.destrezza)})</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-label">COS</span>
                    <span className="stat-value">{character.costituzione}</span>
                    <span className="stat-mod">({getModifier(character.costituzione) >= 0 ? '+' : ''}{getModifier(character.costituzione)})</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-label">INT</span>
                    <span className="stat-value">{character.intelligenza}</span>
                    <span className="stat-mod">({getModifier(character.intelligenza) >= 0 ? '+' : ''}{getModifier(character.intelligenza)})</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-label">SAG</span>
                    <span className="stat-value">{character.saggezza}</span>
                    <span className="stat-mod">({getModifier(character.saggezza) >= 0 ? '+' : ''}{getModifier(character.saggezza)})</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-label">CAR</span>
                    <span className="stat-value">{character.carisma}</span>
                    <span className="stat-mod">({getModifier(character.carisma) >= 0 ? '+' : ''}{getModifier(character.carisma)})</span>
                  </div>
                </div>
                <div className="character-card-combat">
                  <div className="character-info-box">
                    <span className="info-label">HP</span>
                    <span className="info-value">{character.hpAttuali}/{character.hpMassimi}</span>
                  </div>
                  <div className="character-info-box">
                    <span className="info-label">AC</span>
                    <span className="info-value">{character.ac}</span>
                  </div>
                  <div className="character-info-box">
                    <span className="info-label">Velocità</span>
                    <span className="info-value">{character.velocita}m</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;

