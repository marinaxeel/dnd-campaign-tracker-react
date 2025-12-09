import React, { useState } from 'react';
import { Campaign } from '../types/Campaign';
import { Character } from '../types/Character';
import CharacterList from './CharacterList';
import '../styles/CampaignDetails.css';

interface CampaignDetailsProps {
  campaign: Campaign;
  characters: Character[];
  campaigns: Campaign[];
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewDiaryEntries: () => void;
  onCharacterUpdate: (character: Character) => void;
  onCharacterDelete: (characterId: string) => void;
  onCharacterAdd: (character: Character) => void;
  onOpenCharacterForm: (character: Character | null, isCreating: boolean) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  campaign,
  characters,
  campaigns,
  onBack,
  onEdit,
  onDelete,
  onViewDiaryEntries,
  onCharacterUpdate,
  onCharacterDelete,
  onCharacterAdd,
  onOpenCharacterForm
}) => {
  const [activeTab, setActiveTab] = useState<'characters' | 'diary'>('characters');

  return (
    <div>
      <div>
        <button className="btn-back" onClick={onBack}>
          Torna alle campagne
        </button>
      </div>
      <div className="campaign-details-container">
        <div className="campaign-details-card">
          <div className="campaign-details-header">
            <div className="campaign-header-content">
              <h1>{campaign.nome}</h1>
              <div className="campaign-info-inline">
                <p className="campaign-description">
                  {campaign.descrizione || <em>Nessuna descrizione disponibile</em>}
                </p>
                <div className="campaign-meta-item">
                  <span className="campaign-meta-label">Dungeon Master:</span>
                  <span className="campaign-meta-value">{campaign.master}</span>
                </div>
                <div className="campaign-meta-item">
                  <span className="campaign-meta-label">Creata:</span>
                  <span className="campaign-meta-value">
                    {new Date(campaign.dataCreazione).toLocaleString('it-IT', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="campaign-meta-item">
                  <span className="campaign-meta-label">Ultimo agg.:</span>
                  <span className="campaign-meta-value">
                    {new Date(campaign.dataUltimaModifica).toLocaleString('it-IT', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="campaign-details-actions">
              <button className="btn-edit" onClick={onEdit} title="Modifica">
                <span className="material-icons">edit</span>
              </button>
              <button className="btn-delete" onClick={onDelete} title="Elimina">
                <span className="material-icons">delete</span>
              </button>
            </div>
          </div>
          <div className="tabs-container">
            <div className="tabs-header">
              <button 
                className={`tab-button ${activeTab === 'characters' ? 'active' : ''}`}
                onClick={() => setActiveTab('characters')}
              >
                Personaggi
              </button>
              <button 
                className={`tab-button ${activeTab === 'diary' ? 'active' : ''}`}
                onClick={() => setActiveTab('diary')}
              >
                Voci Diario
              </button>
            </div>
            <div className="tabs-content">
              {activeTab === 'characters' && (
                <div className="tab-panel">
                  <CharacterList
                    characters={characters}
                    campaigns={campaigns.map(c => ({ id: c.id, nome: c.nome }))}
                    onUpdate={onCharacterUpdate}
                    onDelete={onCharacterDelete}
                    onAdd={onCharacterAdd}
                    onOpenCharacterForm={onOpenCharacterForm}
                    campaignId={campaign.id}
                  />
                </div>
              )}
              {activeTab === 'diary' && (
                <div className="tab-panel">
                  <div className="empty-state">
                    <p>Le voci di diario saranno disponibili a breve</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;

