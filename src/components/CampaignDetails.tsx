import React from 'react';
import { Campaign } from '../types/Campaign';
import '../styles/CampaignDetails.css';

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewCharacters: () => void;
  onViewDiaryEntries: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  campaign,
  onBack,
  onEdit,
  onDelete,
  onViewCharacters,
  onViewDiaryEntries
}) => {
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
          <div className="content-actions">
            <button className="btn-content" onClick={onViewCharacters}>
              Personaggi
            </button>
            <button className="btn-content" onClick={onViewDiaryEntries}>
              Voci Diario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;

