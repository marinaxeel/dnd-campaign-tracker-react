import React, { useState, useEffect } from 'react';
import { Character } from '../types/Character';
import '../styles/CharacterDetails.css';

interface CharacterDetailsProps {
  character: Character | null;
  campaigns: { id: string; nome: string }[];
  isCreating: boolean;
  onSave: (character: Character) => void;
  onDelete: (characterId: string) => void;
  onBack: () => void;
}

const CLASS_OPTIONS = [
  'Barbaro',
  'Bardo',
  'Chierico',
  'Druido',
  'Guerriero',
  'Monaco',
  'Paladino',
  'Ranger',
  'Ladro',
  'Stregone',
  'Warlock',
  'Mago'
];

const RACE_OPTIONS = [
  'Umano',
  'Elfo',
  'Drow',
  'Nano',
  'Halfling',
  'Gnomo',
  'Mezzelfo',
  'Mezzorco',
  'Tiefling',
  'Draconide',
  'Goliath',
  'Aasimar',
  'Genasi',
  'Tabaxi',
  'Tritone',
  'Tortle',
  'Kenku',
  'Lizardfolk',
  'Yuan-ti',
  'Aarakocra',
  'Firbolg',
  'Gith',
  'Bugbear',
  'Goblin',
  'Hobgoblin',
  'Orco',
  'Kobold',
  'Centauro',
  'Loxodon',
  'Minotauro',
  'Vedalken',
  'Simic Hybrid'
];

const BACKGROUND_OPTIONS = [
  'Acolito',
  'Artigiano',
  'Artista',
  'Charlatano',
  'Criminale',
  'Eremita',
  'Eroe del Popolo',
  'Marinaio',
  'Nobile',
  'Sage',
  'Soldato',
  'Straniero',
  'Uomo di Città'
];

const ALIGNMENT_OPTIONS = [
  'Legale Buono', 'Neutrale Buono', 'Caotico Buono',
  'Legale Neutrale', 'Neutrale', 'Caotico Neutrale',
  'Legale Malvagio', 'Neutrale Malvagio', 'Caotico Malvagio'
];

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  campaigns,
  isCreating,
  onSave,
  onDelete,
  onBack
}) => {
  const [nome, setNome] = useState('');
  const [classe, setClasse] = useState('');
  const [razza, setRazza] = useState('');
  const [livello, setLivello] = useState(1);
  const [hpAttuali, setHpAttuali] = useState(1);
  const [hpMassimi, setHpMassimi] = useState(1);
  const [ac, setAc] = useState(10);
  const [forza, setForza] = useState(10);
  const [destrezza, setDestrezza] = useState(10);
  const [costituzione, setCostituzione] = useState(10);
  const [intelligenza, setIntelligenza] = useState(10);
  const [saggezza, setSaggezza] = useState(10);
  const [carisma, setCarisma] = useState(10);
  const [background, setBackground] = useState('');
  const [allineamento, setAllineamento] = useState('');
  const [xp, setXp] = useState(0);
  const [velocita, setVelocita] = useState(30);
  const [proficiencyBonus, setProficiencyBonus] = useState(2);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [storia, setStoria] = useState('');
  const [activeTab, setActiveTab] = useState<'base' | 'background' | 'campaigns'>('base');

  useEffect(() => {
    if (character) {
      setNome(character.nome);
      setClasse(character.classe);
      setRazza(character.razza);
      setLivello(character.livello);
      setHpAttuali(character.hpAttuali);
      setHpMassimi(character.hpMassimi);
      setAc(character.ac);
      setForza(character.forza);
      setDestrezza(character.destrezza);
      setCostituzione(character.costituzione);
      setIntelligenza(character.intelligenza);
      setSaggezza(character.saggezza);
      setCarisma(character.carisma);
      setBackground(character.background);
      setAllineamento(character.allineamento);
      setXp(character.xp);
      setVelocita(character.velocita);
      setProficiencyBonus(character.proficiencyBonus);
      setSelectedCampaigns([...character.campaignIds]);
      setStoria(character.storia || '');
    } else {
      resetForm();
    }
  }, [character]);

  const resetForm = () => {
    setNome('');
    setClasse('');
    setRazza('');
    setLivello(1);
    setHpAttuali(1);
    setHpMassimi(1);
    setAc(10);
    setForza(10);
    setDestrezza(10);
    setCostituzione(10);
    setIntelligenza(10);
    setSaggezza(10);
    setCarisma(10);
    setBackground('');
    setAllineamento('');
    setXp(0);
    setVelocita(30);
    setProficiencyBonus(2);
    setSelectedCampaigns([]);
    setStoria('');
  };

  const getModifier = (stat: number): number => {
    return Math.floor((stat - 10) / 2);
  };

  const toggleCampaign = (campaignId: string) => {
    if (selectedCampaigns.includes(campaignId)) {
      setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId));
    } else {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      alert('Il nome è obbligatorio');
      return;
    }

    const characterData: Character = {
      id: character?.id || `character-${Date.now()}`,
      nome: nome.trim(),
      classe: classe,
      razza: razza,
      livello,
      hpAttuali,
      hpMassimi,
      ac,
      forza,
      destrezza,
      costituzione,
      intelligenza,
      saggezza,
      carisma,
      background: background,
      allineamento,
      xp,
      velocita,
      proficiencyBonus,
      savingThrows: character?.savingThrows || [],
      campaignIds: selectedCampaigns,
      storia: storia.trim()
    };

    onSave(characterData);
  };

  return (
    <div className="character-details-container">
      <div className="character-details-header">
        <button className="btn-back" onClick={onBack}>
          Torna alla campagna
        </button>
        <h1>{isCreating ? 'Nuovo Personaggio' : character?.nome}</h1>
        {!isCreating && character && (
          <button className="btn-delete" onClick={() => onDelete(character.id)}>
            <span className="material-icons">delete</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="character-form">
        <div className="character-form-tabs">
          <div className="character-tabs-header">
            <button 
              type="button"
              className={`character-tab-button ${activeTab === 'base' ? 'active' : ''}`}
              onClick={() => setActiveTab('base')}
            >
              Informazioni Base
            </button>
            <button 
              type="button"
              className={`character-tab-button ${activeTab === 'background' ? 'active' : ''}`}
              onClick={() => setActiveTab('background')}
            >
              Background
            </button>
            <button 
              type="button"
              className={`character-tab-button ${activeTab === 'campaigns' ? 'active' : ''}`}
              onClick={() => setActiveTab('campaigns')}
            >
              Campagne
            </button>
          </div>

          <div className="character-tabs-content">
            {activeTab === 'base' && (
              <div className="character-tab-panel">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nome">Nome *</label>
                    <input
                      type="text"
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="classe">Classe</label>
                    <select
                      id="classe"
                      value={classe}
                      onChange={(e) => setClasse(e.target.value)}
                    >
                      <option value="">Seleziona...</option>
                      {CLASS_OPTIONS.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="razza">Razza</label>
                    <select
                      id="razza"
                      value={razza}
                      onChange={(e) => setRazza(e.target.value)}
                    >
                      <option value="">Seleziona...</option>
                      {RACE_OPTIONS.map(race => (
                        <option key={race} value={race}>{race}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="livello">Livello</label>
                    <input
                      type="number"
                      id="livello"
                      value={livello}
                      onChange={(e) => setLivello(parseInt(e.target.value) || 1)}
                      min="1"
                      max="20"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="background">Background</label>
                    <select
                      id="background"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                    >
                      <option value="">Seleziona...</option>
                      {BACKGROUND_OPTIONS.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="allineamento">Allineamento</label>
                    <select
                      id="allineamento"
                      value={allineamento}
                      onChange={(e) => setAllineamento(e.target.value)}
                    >
                      <option value="">Seleziona...</option>
                      {ALIGNMENT_OPTIONS.map(align => (
                        <option key={align} value={align}>{align}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-divider"></div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <label>Forza</label>
                    <input
                      type="number"
                      value={forza}
                      onChange={(e) => setForza(parseInt(e.target.value) || 10)}
                      min="1"
                      max="30"
                    />
                    <span className="stat-modifier">({getModifier(forza) >= 0 ? '+' : ''}{getModifier(forza)})</span>
                  </div>
                  <div className="stat-item">
                    <label>Destrezza</label>
                    <input
                      type="number"
                      value={destrezza}
                      onChange={(e) => setDestrezza(parseInt(e.target.value) || 10)}
                      min="1"
                      max="30"
                    />
                    <span className="stat-modifier">({getModifier(destrezza) >= 0 ? '+' : ''}{getModifier(destrezza)})</span>
                  </div>
                  <div className="stat-item">
                    <label>Costituzione</label>
                    <input
                      type="number"
                      value={costituzione}
                      onChange={(e) => setCostituzione(parseInt(e.target.value) || 10)}
                      min="1"
                      max="30"
                    />
                    <span className="stat-modifier">({getModifier(costituzione) >= 0 ? '+' : ''}{getModifier(costituzione)})</span>
                  </div>
                  <div className="stat-item">
                    <label>Intelligenza</label>
                    <input
                      type="number"
                      value={intelligenza}
                      onChange={(e) => setIntelligenza(parseInt(e.target.value) || 10)}
                      min="1"
                      max="30"
                    />
                    <span className="stat-modifier">({getModifier(intelligenza) >= 0 ? '+' : ''}{getModifier(intelligenza)})</span>
                  </div>
                  <div className="stat-item">
                    <label>Saggezza</label>
                    <input
                      type="number"
                      value={saggezza}
                      onChange={(e) => setSaggezza(parseInt(e.target.value) || 10)}
                      min="1"
                      max="30"
                    />
                    <span className="stat-modifier">({getModifier(saggezza) >= 0 ? '+' : ''}{getModifier(saggezza)})</span>
                  </div>
                  <div className="stat-item">
                    <label>Carisma</label>
                    <input
                      type="number"
                      value={carisma}
                      onChange={(e) => setCarisma(parseInt(e.target.value) || 10)}
                      min="1"
                      max="30"
                    />
                    <span className="stat-modifier">({getModifier(carisma) >= 0 ? '+' : ''}{getModifier(carisma)})</span>
                  </div>
                </div>

                <div className="form-divider"></div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="hpAttuali">HP Attuali</label>
                    <input
                      type="number"
                      id="hpAttuali"
                      value={hpAttuali}
                      onChange={(e) => setHpAttuali(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hpMassimi">HP Massimi</label>
                    <input
                      type="number"
                      id="hpMassimi"
                      value={hpMassimi}
                      onChange={(e) => setHpMassimi(parseInt(e.target.value) || 1)}
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ac">Classe Armatura (AC)</label>
                    <input
                      type="number"
                      id="ac"
                      value={ac}
                      onChange={(e) => setAc(parseInt(e.target.value) || 10)}
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="xp">Punti Esperienza</label>
                    <input
                      type="number"
                      id="xp"
                      value={xp}
                      onChange={(e) => setXp(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="velocita">Velocità (metri)</label>
                    <input
                      type="number"
                      id="velocita"
                      value={velocita}
                      onChange={(e) => setVelocita(parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="proficiencyBonus">Bonus Competenza</label>
                    <input
                      type="number"
                      id="proficiencyBonus"
                      value={proficiencyBonus}
                      onChange={(e) => setProficiencyBonus(parseInt(e.target.value) || 2)}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'background' && (
              <div className="character-tab-panel">
                <div className="character-form-section">
                  <h2>Storia del Personaggio</h2>
                  <div className="form-group">
                    <textarea
                      id="storia"
                      value={storia}
                      onChange={(e) => setStoria(e.target.value)}
                      placeholder="Racconta la storia del tuo personaggio..."
                      className="character-story-textarea"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div className="character-tab-panel">
                <div className="character-form-section">
                  <h2>Campagne Associate</h2>
                  {campaigns.length === 0 ? (
                    <p className="no-campaigns">Nessuna campagna disponibile</p>
                  ) : (
                    <div className="campaigns-checkbox-list">
                      {campaigns.map(campaign => (
                        <label key={campaign.id} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={selectedCampaigns.includes(campaign.id)}
                            onChange={() => toggleCampaign(campaign.id)}
                          />
                          <span>{campaign.nome}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isCreating ? 'Crea Personaggio' : 'Salva Modifiche'}
          </button>
          <button type="button" className="btn-secondary" onClick={onBack}>
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterDetails;

