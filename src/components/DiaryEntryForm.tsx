import React, { useState, useEffect } from 'react';
import { DiaryEntry } from '../types/DiaryEntry';
import { Campaign } from '../types/Campaign';
import { Character } from '../types/Character';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';
import '../styles/DiaryEntryForm.css';

interface DiaryEntryFormProps {
  entry: DiaryEntry | null;
  campaigns: Campaign[];
  characters: Character[];
  isCreating: boolean;
  onSave: (entry: DiaryEntry) => void;
  onCancel: () => void;
  breadcrumbs?: BreadcrumbItem[];
}

const DiaryEntryForm: React.FC<DiaryEntryFormProps> = ({
  entry,
  campaigns,
  characters,
  isCreating,
  onSave,
  onCancel,
  breadcrumbs
}) => {
  const [titolo, setTitolo] = useState('');
  const [dataSessione, setDataSessione] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [selectedCharacterIds, setSelectedCharacterIds] = useState<string[]>([]);
  const [testo, setTesto] = useState('');

  useEffect(() => {
    if (entry) {
      setTitolo(entry.titolo || '');
      const dateOnly = entry.dataSessione.split('T')[0];
      setDataSessione(dateOnly);
      setCampaignId(entry.campaignId);
      setSelectedCharacterIds(entry.characterIds);
      setTesto(entry.testo);
    } else {
      setTitolo('');
      const today = new Date().toISOString().split('T')[0];
      setDataSessione(today);
      setCampaignId('');
      setSelectedCharacterIds([]);
      setTesto('');
    }
  }, [entry]);

  const getAvailableCharacters = (): Character[] => {
    if (!campaignId) return [];
    return characters.filter(c => c.campaignIds.includes(campaignId));
  };

  const handleCharacterToggle = (characterId: string) => {
    setSelectedCharacterIds(prev => {
      if (prev.includes(characterId)) {
        return prev.filter(id => id !== characterId);
      } else {
        return [...prev, characterId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataSessione || !campaignId) {
      alert('Data sessione e Campagna sono obbligatori');
      return;
    }

    const now = new Date().toISOString();
    const dataSessioneISO = new Date(dataSessione + 'T00:00:00').toISOString();
    
    const entryData: DiaryEntry = {
      id: entry?.id || `diary-${Date.now()}`,
      titolo: titolo.trim() || undefined,
      dataSessione: dataSessioneISO,
      campaignId: campaignId,
      characterIds: selectedCharacterIds,
      testo: testo.trim(),
      dataCreazione: entry?.dataCreazione || now,
      dataModifica: now
    };

    onSave(entryData);
  };

  const availableCharacters = getAvailableCharacters();

  return (
    <div className="diary-entry-form-container">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
      <div className="diary-entry-form-card">
        <h2>{isCreating ? 'Nuova Voce di Diario' : 'Modifica Voce di Diario'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titolo">Titolo</label>
            <input
              type="text"
              id="titolo"
              value={titolo}
              onChange={(e) => setTitolo(e.target.value)}
              placeholder="Inserisci un titolo per la voce di diario..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataSessione">Data Sessione *</label>
            <input
              type="date"
              id="dataSessione"
              value={dataSessione}
              onChange={(e) => setDataSessione(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="campaignId">Campagna *</label>
            <select
              id="campaignId"
              value={campaignId}
              onChange={(e) => {
                setCampaignId(e.target.value);
                setSelectedCharacterIds([]);
              }}
              required
            >
              <option value="">Seleziona una campagna</option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Personaggi Presenti</label>
            {!campaignId ? (
              <p className="form-hint">Seleziona prima una campagna</p>
            ) : availableCharacters.length === 0 ? (
              <p className="form-hint">Nessun personaggio associato a questa campagna</p>
            ) : (
              <div className="character-multiselect">
                {availableCharacters.map(character => (
                  <label key={character.id} className="character-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCharacterIds.includes(character.id)}
                      onChange={() => handleCharacterToggle(character.id)}
                    />
                    <span>{character.nome}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="testo">Testo</label>
            <textarea
              id="testo"
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
              rows={20}
              placeholder="Scrivi qui il contenuto della voce di diario..."
              className="diary-textarea"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {isCreating ? 'Salva' : 'Salva Modifiche'}
            </button>
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiaryEntryForm;

