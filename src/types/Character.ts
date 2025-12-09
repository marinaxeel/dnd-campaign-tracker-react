export interface Character {
  id: string;
  nome: string;
  classe: string;
  razza: string;
  livello: number;
  hpAttuali: number;
  hpMassimi: number;
  ac: number;
  forza: number;
  destrezza: number;
  costituzione: number;
  intelligenza: number;
  saggezza: number;
  carisma: number;
  background: string;
  allineamento: string;
  xp: number;
  velocita: number;
  proficiencyBonus: number;
  savingThrows: string[];
  campaignIds: string[];
  storia?: string;
}

