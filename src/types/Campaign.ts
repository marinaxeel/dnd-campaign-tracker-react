export type CampaignStatus = 'nuova' | 'in corso' | 'conclusa';

export interface Campaign {
  id: string;
  nome: string;
  descrizione: string;
  dataCreazione: string;
  master: string;
  dataUltimaModifica: string;
  stato?: CampaignStatus;
}

