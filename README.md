# dnd-campaign-tracker-react

Applicazione React + TypeScript per la gestione di campagne di Dungeons and Dragons.

## Funzionalità

- **CRUD Campagne**: Creazione, lettura, aggiornamento ed eliminazione di campagne
- **CRUD Personaggi**: Creazione, lettura, aggiornamento ed eliminazione di personaggi D&D
- Personaggi associabili a una o più campagne
- Persistenza dati tramite localStorage
- Salvataggio automatico su file JSON (`dnd_data.json`)
- Tema scuro con stile medievale fantasy

## Struttura Campagna

Ogni campagna contiene:

- Nome
- Descrizione
- Data creazione
- Master (Dungeon Master)
- Data ultima modifica

## Struttura Personaggio

Ogni personaggio contiene:

- Nome
- Classe
- Razza
- Livello
- Punti Ferita (attuali e massimi)
- Classe Armatura (AC)
- Statistiche (Forza, Destrezza, Costituzione, Intelligenza, Saggezza, Carisma)
- Background
- Allineamento
- Punti Esperienza (XP)
- Velocità
- Bonus Competenza
- Saving Throws
- Campagne associate

## Setup

```bash
npm install
npm start
```

L'applicazione sarà disponibile su `http://localhost:3000`

## Tecnologie

- React 18
- TypeScript
- CSS vanilla (tema medievale fantasy)
- localStorage per persistenza dati
