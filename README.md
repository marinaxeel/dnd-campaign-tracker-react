# dnd-campaign-tracker-react

Applicazione React + TypeScript per la gestione di campagne di Dungeons and Dragons.

## Funzionalità

- **CRUD Campagne**: Creazione, lettura, aggiornamento ed eliminazione di campagne
- **CRUD Personaggi**: Creazione, lettura, aggiornamento ed eliminazione di personaggi D&D
- **CRUD Voci di Diario**: Creazione, lettura, aggiornamento ed eliminazione di voci di diario per le sessioni
- Personaggi associabili a una o più campagne
- Voci di diario associate a campagne con selezione multipla di personaggi presenti
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
- Stato (nuova, in corso, conclusa)

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

## Struttura Voce di Diario

Ogni voce di diario contiene:

- Data sessione
- Campagna associata
- Personaggi presenti (multiselect con i personaggi associati alla campagna)
- Testo libero (textarea)
- Data/ora creazione
- Data/ora modifica

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
