# QuestMind Battle

A 5-minute interactive mental fitness experience that teaches evidence-based emotional regulation skills through a retro RPG battle loop.

> **This is not therapy.** QuestMind Battle is a mental fitness game, not a diagnostic tool or treatment. If you are in crisis, please call **988** or text **HOME to 741741**.

## Quick Start

```bash
cd questmind-battle
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Play

1. **Title Screen** — Read the disclaimer, then press BEGIN QUEST.
2. **Intake** — Answer two quick questions about how you're feeling.
3. **Battle** — Face the Fog Drake across 3 beats. Each beat, choose one of three actions:
   - **Approach** — Step toward the discomfort (Exposure therapy)
   - **Observe** — Watch and name your experience (Cognitive defusion / ACT)
   - **Ground** — Anchor in physical sensation (Somatic grounding)
4. **Debrief** — See which technique you practiced and get a real-life micro-action.

## Tech Stack

- **React 19** + **Vite 6** — fast builds, minimal config
- **CSS** — hand-crafted retro RPG aesthetic, no UI framework
- **SVG sprites** — original player and drake art, no external assets
- **Mock DM** — fully playable with zero API keys

## Architecture

```
src/
├── App.jsx                  # State machine router
├── hooks/
│   ├── useGameState.js      # Core reducer + actions
│   └── useAnalytics.js      # Console event logger
├── providers/
│   └── mockDM.js            # Mock content provider
├── data/
│   └── content.js           # All narrative content
├── components/
│   ├── TitleScreen.jsx
│   ├── IntakeScreen.jsx
│   ├── DebriefScreen.jsx
│   ├── CrisisOverlay.jsx
│   ├── battle/
│   │   ├── BattleScreen.jsx
│   │   ├── BattleStage.jsx
│   │   └── ActionCards.jsx
│   └── sprites/
│       ├── PlayerSprite.jsx
│       └── DrakeSprite.jsx
└── index.css                # Master stylesheet
```

## Safety Features

- Non-diagnostic disclaimer on title screen and debrief
- Crisis pattern detection during intake
- 988 Suicide & Crisis Lifeline + Crisis Text Line (741741) guidance
- No PII collection or persistence
- Supportive, non-judgmental language throughout

## Build for Production

```bash
npm run build
npm run preview
```

Output goes to `dist/` — deploy to any static host.

## Evidence Basis

- **Approach** → Exposure Therapy / Behavioral Activation (CBT)
- **Observe** → Cognitive Defusion (ACT)
- **Ground** → Somatic Experiencing / MBSR
