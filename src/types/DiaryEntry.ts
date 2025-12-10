export interface DiaryEntry {
  id: string;
  titolo?: string;
  dataSessione: string;
  campaignId: string;
  characterIds: string[];
  testo: string;
  dataCreazione: string;
  dataModifica: string;
}

