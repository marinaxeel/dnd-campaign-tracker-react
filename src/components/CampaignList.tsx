import React, { useState, useEffect } from 'react';
import { Campaign } from '../types/Campaign';
import { Character } from '../types/Character';
import { getCampaigns, saveCampaigns, getCharacters, saveCharacters } from '../utils/storage';
import CampaignForm from './CampaignForm';
import CampaignDetails from './CampaignDetails';
import CharacterDetails from './CharacterDetails';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';
import '../styles/CampaignList.css';

interface CampaignListProps {
  onBackToHome?: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ onBackToHome }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFromDetails, setEditingFromDetails] = useState(false);
  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
  const [currentCampaignName, setCurrentCampaignName] = useState<string>('');

  useEffect(() => {
    loadCampaigns();
    loadCharacters();
  }, []);

  const loadCampaigns = () => {
    const loaded = getCampaigns();
    setCampaigns(loaded);
  };

  const loadCharacters = () => {
    const loaded = getCharacters();
    setCharacters(loaded);
  };

  const handleCreate = () => {
    setEditingCampaign(null);
    setEditingFromDetails(false);
    setShowForm(true);
  };

  const handleSave = (campaign: Campaign) => {
    let updated: Campaign[];
    if (editingCampaign) {
      updated = campaigns.map(c => c.id === campaign.id ? campaign : c);
    } else {
      updated = [...campaigns, campaign];
    }
    setCampaigns(updated);
    saveCampaigns(updated);
    setShowForm(false);
    setEditingCampaign(null);
    if (editingFromDetails) {
      const savedCampaign = updated.find(c => c.id === campaign.id);
      if (savedCampaign) {
        setSelectedCampaign(savedCampaign);
      }
      setEditingFromDetails(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    if (editingFromDetails && editingCampaign) {
      setSelectedCampaign(editingCampaign);
      setEditingFromDetails(false);
    }
    setEditingCampaign(null);
  };

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleBackToList = () => {
    setSelectedCampaign(null);
  };

  const handleEditFromDetails = () => {
    if (selectedCampaign) {
      setEditingCampaign(selectedCampaign);
      setEditingFromDetails(true);
      setSelectedCampaign(null);
      setShowForm(true);
    }
  };

  const handleDeleteFromDetails = () => {
    if (selectedCampaign && window.confirm('Sei sicuro di voler eliminare questa campagna?')) {
      const updated = campaigns.filter(c => c.id !== selectedCampaign.id);
      setCampaigns(updated);
      saveCampaigns(updated);
      setSelectedCampaign(null);
    }
  };

  const handleCharacterUpdate = (character: Character) => {
    const updated = characters.map(c => c.id === character.id ? character : c);
    setCharacters(updated);
    saveCharacters(updated);
  };

  const handleCharacterDelete = (characterId: string) => {
    const updated = characters.filter(c => c.id !== characterId);
    setCharacters(updated);
    saveCharacters(updated);
  };

  const handleCharacterAdd = (character: Character) => {
    const updated = [...characters, character];
    setCharacters(updated);
    saveCharacters(updated);
  };

  const handleOpenCharacterForm = (character: Character | null, isCreating: boolean, campaignName?: string) => {
    setEditingCharacter(character);
    setIsCreatingCharacter(isCreating);
    setShowCharacterForm(true);
    if (campaignName) {
      setCurrentCampaignName(campaignName);
    } else {
      setCurrentCampaignName('');
    }
  };

  const handleCharacterFormSave = (character: Character) => {
    if (isCreatingCharacter) {
      if (selectedCampaign && !character.campaignIds.includes(selectedCampaign.id)) {
        character.campaignIds.push(selectedCampaign.id);
      }
      handleCharacterAdd(character);
    } else {
      handleCharacterUpdate(character);
    }
    setShowCharacterForm(false);
    setEditingCharacter(null);
    setIsCreatingCharacter(false);
    setCurrentCampaignName('');
  };

  const handleCharacterFormCancel = () => {
    setShowCharacterForm(false);
    setEditingCharacter(null);
    setIsCreatingCharacter(false);
    setCurrentCampaignName('');
  };

  const handleCharacterFormDelete = (characterId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo personaggio?')) {
      handleCharacterDelete(characterId);
      setShowCharacterForm(false);
      setEditingCharacter(null);
      setIsCreatingCharacter(false);
      setCurrentCampaignName('');
    }
  };

  const handleViewDiaryEntries = () => {
    console.log('View diary entries for campaign:', selectedCampaign?.id);
  };

  if (showForm) {
    return (
      <CampaignForm
        campaign={editingCampaign}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (showCharacterForm) {
    const breadcrumbs: BreadcrumbItem[] = [];
    if (onBackToHome) {
      breadcrumbs.push({ label: 'Home', onClick: onBackToHome });
    }
    breadcrumbs.push({ label: 'Campagne', onClick: () => {
      setShowCharacterForm(false);
      setEditingCharacter(null);
      setIsCreatingCharacter(false);
      setCurrentCampaignName('');
      setSelectedCampaign(null);
    }});
    if (currentCampaignName && selectedCampaign) {
      breadcrumbs.push({ label: currentCampaignName, onClick: () => {
        setShowCharacterForm(false);
        setEditingCharacter(null);
        setIsCreatingCharacter(false);
        setCurrentCampaignName('');
      }});
      breadcrumbs.push({ label: 'Personaggi', onClick: () => {
        setShowCharacterForm(false);
        setEditingCharacter(null);
        setIsCreatingCharacter(false);
        setCurrentCampaignName('');
      }});
    }
    breadcrumbs.push({ label: isCreatingCharacter ? 'Nuovo Personaggio' : editingCharacter?.nome || '' });

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

  if (selectedCampaign) {
    const campaignDetailsBreadcrumbs: BreadcrumbItem[] = [];
    if (onBackToHome) {
      campaignDetailsBreadcrumbs.push({ label: 'Home', onClick: onBackToHome });
    }
    campaignDetailsBreadcrumbs.push({ label: 'Campagne', onClick: handleBackToList });
    campaignDetailsBreadcrumbs.push({ label: selectedCampaign.nome });

    return (
      <CampaignDetails
        campaign={selectedCampaign}
        characters={characters}
        campaigns={campaigns}
        onBack={handleBackToList}
        onEdit={handleEditFromDetails}
        onDelete={handleDeleteFromDetails}
        onViewDiaryEntries={handleViewDiaryEntries}
        onCharacterUpdate={handleCharacterUpdate}
        onCharacterDelete={handleCharacterDelete}
        onCharacterAdd={handleCharacterAdd}
        onOpenCharacterForm={(character, isCreating) => handleOpenCharacterForm(character, isCreating, selectedCampaign.nome)}
        breadcrumbs={campaignDetailsBreadcrumbs}
      />
    );
  }

  const campaignListBreadcrumbs: BreadcrumbItem[] = [];
  if (onBackToHome) {
    campaignListBreadcrumbs.push({ label: 'Home', onClick: onBackToHome });
  }
  campaignListBreadcrumbs.push({ label: 'Campagne' });

  return (
    <div className="campaign-list-container">
      {campaignListBreadcrumbs.length > 0 && (
        <Breadcrumbs items={campaignListBreadcrumbs} />
      )}
      <div className="campaign-list-header">
        <h1>Campagne</h1>
        <button className="btn-primary" onClick={handleCreate}>
          Crea nuova
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="empty-state">
          <p>Crea la tua prima campagna!</p>
        </div>
      ) : (
        <div className="campaigns-grid">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="campaign-card">
              <div className="campaign-card-simple" onClick={() => handleViewDetails(campaign)}>
                <h2>{campaign.nome}</h2>
                <span className="material-icons">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;

