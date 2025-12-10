import React, { useState, useEffect } from 'react';
import { DiaryEntry } from '../types/DiaryEntry';
import { Campaign } from '../types/Campaign';
import { getDiaryEntries } from '../utils/storage';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';
import '../styles/DiaryEntryList.css';

interface DiaryEntryListProps {
  campaigns: Campaign[];
  onBack: () => void;
  onOpenEntry: (entry: DiaryEntry | null, isCreating: boolean) => void;
  campaignId?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const DiaryEntryList: React.FC<DiaryEntryListProps> = ({
  campaigns,
  onBack,
  onOpenEntry,
  campaignId,
  breadcrumbs
}) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    loadEntries();
  }, [campaignId]);

  const loadEntries = () => {
    const allEntries = getDiaryEntries();
    const filtered = campaignId
      ? allEntries.filter(e => e.campaignId === campaignId)
      : allEntries;
    
    filtered.sort((a, b) => {
      const dateA = new Date(a.dataSessione).getTime();
      const dateB = new Date(b.dataSessione).getTime();
      return dateB - dateA;
    });
    
    setEntries(filtered);
  };

  const getCampaignName = (campaignId: string): string => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign?.nome || 'Campagna sconosciuta';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleCreate = () => {
    onOpenEntry(null, true);
  };

  const handleEntryClick = (entry: DiaryEntry) => {
    onOpenEntry(entry, false);
  };

  return (
    <div className="diary-entry-list-container">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
      <div className="diary-entry-list-header">
        <h1>Voci di Diario</h1>
        <button className="btn-primary" onClick={handleCreate}>
          Nuova Voce
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>Nessuna voce di diario disponibile</p>
        </div>
      ) : (
        <div className="diary-entries-list">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="diary-entry-card"
              onClick={() => handleEntryClick(entry)}
            >
              <div className="diary-entry-card-header">
                <span className="diary-entry-date">{formatDate(entry.dataSessione)}</span>
                <div className="diary-entry-card-content">
                  <h3>{entry.titolo || getCampaignName(entry.campaignId)}</h3>
                  {entry.titolo && (
                    <p className="diary-entry-card-campaign">{getCampaignName(entry.campaignId)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiaryEntryList;

