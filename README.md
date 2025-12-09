# dnd-campaign-tracker-react

Applicazione React + TypeScript per la gestione di campagne di Dungeons and Dragons.

## Funzionalità

- **CRUD Campagne**: Creazione, lettura, aggiornamento ed eliminazione di campagne
- Persistenza dati tramite localStorage
- Salvataggio automatico su file JSON (`campaigns.json`)
- Tema scuro con stile medievale fantasy

## Struttura Campagna

Ogni campagna contiene:

- Nome
- Descrizione
- Data creazione
- Master (Dungeon Master)
- Data ultima modifica

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
