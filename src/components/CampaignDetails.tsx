import React, { useState, useEffect } from 'react';
import { Campaign } from '../types/Campaign';
import { Character } from '../types/Character';
import { DiaryEntry } from '../types/DiaryEntry';
import CharacterList from './CharacterList';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';
import { getDiaryEntries } from '../utils/storage';
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
  onOpenCharacterForm: (character: Character | null, isCreating: boolean, campaignName?: string) => void;
  onOpenDiaryEntryForm: (entry: DiaryEntry | null, isCreating: boolean) => void;
  breadcrumbs?: BreadcrumbItem[];
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
  onOpenCharacterForm,
  onOpenDiaryEntryForm,
  breadcrumbs
}) => {
  const [activeTab, setActiveTab] = useState<'characters' | 'diary'>('characters');
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    loadDiaryEntries();
  }, []);

  useEffect(() => {
    if (activeTab === 'diary') {
      loadDiaryEntries();
    }
  }, [activeTab]);

  const loadDiaryEntries = () => {
    const allEntries = getDiaryEntries();
    const filtered = allEntries.filter(e => e.campaignId === campaign.id);
    filtered.sort((a, b) => {
      const dateA = new Date(a.dataSessione).getTime();
      const dateB = new Date(b.dataSessione).getTime();
      return dateB - dateA;
    });
    setDiaryEntries(filtered);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleCreateEntry = () => {
    onOpenDiaryEntryForm(null, true);
  };

  const handleEntryClick = (entry: DiaryEntry) => {
    onOpenDiaryEntryForm(entry, false);
  };

  return (
    <div>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
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
                {campaign.stato && (
                  <div className="campaign-meta-item">
                    <span className="campaign-meta-label">Stato:</span>
                    <span className="campaign-meta-value campaign-status">{campaign.stato}</span>
                  </div>
                )}
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
                    campaignName={campaign.nome}
                  />
                </div>
              )}
              {activeTab === 'diary' && (
                <div className="tab-panel">
                  <div className="diary-entries-header">
                    <button className="btn-primary" onClick={handleCreateEntry}>
                      Nuova Voce
                    </button>
                  </div>
                  {diaryEntries.length === 0 ? (
                    <div className="empty-state">
                      <p>Nessuna voce di diario per questa campagna</p>
                    </div>
                  ) : (
                    <div className="diary-entries-list">
                      {diaryEntries.map(entry => (
                        <div
                          key={entry.id}
                          className="diary-entry-item"
                          onClick={() => handleEntryClick(entry)}
                        >
                          <div className="diary-entry-item-header">
                            <span className="diary-entry-item-date">{formatDate(entry.dataSessione)}</span>
                            {entry.titolo && (
                              <h4 className="diary-entry-item-title">{entry.titolo}</h4>
                            )}
                          </div>
                          {entry.testo && (
                            <p className="diary-entry-item-preview">
                              {entry.testo.length > 150
                                ? entry.testo.substring(0, 150) + '...'
                                : entry.testo}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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

