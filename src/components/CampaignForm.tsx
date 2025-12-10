import React, { useState, useEffect } from 'react';
import { Campaign, CampaignStatus } from '../types/Campaign';
import '../styles/CampaignForm.css';

interface CampaignFormProps {
  campaign: Campaign | null;
  onSave: (campaign: Campaign) => void;
  onCancel: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ campaign, onSave, onCancel }) => {
  const [nome, setNome] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [master, setMaster] = useState('');
  const [stato, setStato] = useState<CampaignStatus>('nuova');

  useEffect(() => {
    if (campaign) {
      setNome(campaign.nome);
      setDescrizione(campaign.descrizione);
      setMaster(campaign.master);
      setStato(campaign.stato || 'nuova');
    }
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !master.trim()) {
      alert('Nome e Master sono obbligatori');
      return;
    }

    const now = new Date().toISOString();
    const campaignData: Campaign = {
      id: campaign?.id || `campaign-${Date.now()}`,
      nome: nome.trim(),
      descrizione: descrizione.trim(),
      master: master.trim(),
      dataCreazione: campaign?.dataCreazione || now,
      dataUltimaModifica: now,
      stato: stato
    };

    onSave(campaignData);
  };

  return (
    <div className="campaign-form-container">
      <div className="campaign-form-card">
        <h2>{campaign ? 'Modifica Campagna' : 'Nuova Campagna'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Campagna *</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Es: La Spedizione del Drago"
            />
          </div>

          <div className="form-group">
            <label htmlFor="master">Master *</label>
            <input
              type="text"
              id="master"
              value={master}
              onChange={(e) => setMaster(e.target.value)}
              required
              placeholder="Nome del Dungeon Master"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stato">Stato</label>
            <select
              id="stato"
              value={stato}
              onChange={(e) => setStato(e.target.value as CampaignStatus)}
            >
              <option value="nuova">Nuova</option>
              <option value="in corso">In Corso</option>
              <option value="conclusa">Conclusa</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descrizione">Descrizione</label>
            <textarea
              id="descrizione"
              value={descrizione}
              onChange={(e) => setDescrizione(e.target.value)}
              rows={5}
              placeholder="Racconta la storia della tua campagna..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {campaign ? 'Salva Modifiche' : 'Crea Campagna'}
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

export default CampaignForm;

