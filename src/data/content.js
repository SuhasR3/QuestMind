export const INTAKE_QUESTIONS = [
  {
    id: 'q1',
    text: 'What does your inner weather feel like right now?',
    options: [
      { id: 'stormy', text: 'Stormy — racing, restless' },
      { id: 'foggy', text: 'Foggy — heavy, unclear' },
      { id: 'frozen', text: 'Frozen — stuck, numb' },
      { id: 'breezy', text: 'Breezy — just curious' },
    ],
  },
  {
    id: 'q2',
    text: 'When pressure builds, you usually\u2026',
    options: [
      { id: 'push', text: 'Push through it' },
      { id: 'pull', text: 'Pull away from it' },
      { id: 'freeze', text: 'Freeze up' },
      { id: 'understand', text: 'Try to understand it' },
    ],
  },
];

export const CRISIS_PATTERNS = [
  { q1: 'frozen', q2: 'freeze' },
  { q1: 'stormy', q2: 'freeze' },
];

export const BEAT_INTROS = [
  'The path narrows. Thick fog coils ahead\u200a\u2014\u200aand within it, something breathes. The FOG DRAKE takes shape, vast and cold. Pressure builds behind your ribs.',
  'The drake shifts, testing your resolve. Fog tendrils creep forward, probing for weakness. The air hums with tension.',
  'The drake gathers itself for one final surge. The fog thickens into a wall. This is the moment.',
];

export const FIELD_NOTES = [
  'The urge to flee is natural. Every action you take here is a choice\u200a\u2014\u200aand every choice is practice.',
  'There is no wrong move. You\u2019re building awareness of how you respond to pressure.',
  'You\u2019ve already chosen twice. Trust what your pattern is teaching you.',
];

export const ACTION_LABELS = {
  a: 'Approach',
  b: 'Observe',
  c: 'Ground',
};

export const BEAT_ACTIONS = [
  // Beat 0
  {
    a: {
      label: 'Step Forward',
      description: 'Move deliberately toward the drake.',
      narrative:
        'You plant your front foot and step into the mist. The drake flinches\u200a\u2014\u200ait expected retreat. Up close, its edges blur. It\u2019s not as solid as it seemed.',
      threatDelta: -8,
      xpDelta: 10,
      effects: { playerShift: 1, drakeScale: -0.08 },
    },
    b: {
      label: 'Name What You See',
      description: 'Watch the drake without reacting.',
      narrative:
        'You hold still and simply watch. The fog thins under your gaze. You notice the drake\u2019s rhythm\u200a\u2014\u200aslow, cyclical. Not rage. Not malice. Just pressure.',
      threatDelta: -10,
      xpDelta: 10,
      effects: { drakeOpacity: -0.12 },
    },
    c: {
      label: 'Find Your Footing',
      description: 'Anchor your attention in the present.',
      narrative:
        'You press your feet into the earth. One breath fills your chest. One breath empties it. The cold doesn\u2019t vanish\u200a\u2014\u200abut it stops advancing.',
      threatDelta: -15,
      xpDelta: 10,
      effects: {},
    },
  },
  // Beat 1
  {
    a: {
      label: 'Close the Distance',
      description: 'Another deliberate step forward.',
      narrative:
        'You step again. The drake rears back, then settles lower. Each step costs something, but the space between you and the unknown shrinks to something manageable.',
      threatDelta: -8,
      xpDelta: 15,
      effects: { playerShift: 1, drakeScale: -0.08 },
    },
    b: {
      label: 'Label the Fog',
      description: 'Put words to what you\u2019re experiencing.',
      narrative:
        'You name what\u2019s here: \u201cpressure.\u201d \u201ccold.\u201d \u201cuncertainty.\u201d With each word, the drake\u2019s glow dims. Naming things loosens their grip.',
      threatDelta: -10,
      xpDelta: 15,
      effects: { drakeOpacity: -0.12 },
    },
    c: {
      label: 'Steady Your Breath',
      description: 'Return attention to your body.',
      narrative:
        'You feel your hands, your heartbeat, the solid ground. The fog swirls but finds no purchase. What\u2019s anchored cannot be swept away.',
      threatDelta: -15,
      xpDelta: 15,
      effects: {},
    },
  },
  // Beat 2
  {
    a: {
      label: 'Walk Into the Fog',
      description: 'Face the drake directly.',
      narrative:
        'You walk straight toward it. The fog parts around you like water. The drake, seen fully at last, is just fog\u200a\u2014\u200acold and uncomfortable, but no longer unknown. It disperses.',
      threatDelta: -100,
      xpDelta: 25,
      effects: { playerShift: 2, drakeScale: -0.3, drakeOpacity: -0.5 },
    },
    b: {
      label: 'See It Clearly',
      description: 'Watch the surge without flinching.',
      narrative:
        'You watch the final surge without flinching. You see it for what it is\u200a\u2014\u200asensation, not danger. A signal, not a sentence. The drake can\u2019t hold shape under clear sight.',
      threatDelta: -100,
      xpDelta: 25,
      effects: { drakeOpacity: -0.5, drakeScale: -0.2 },
    },
    c: {
      label: 'Hold Your Ground',
      description: 'Breathe through the final wave.',
      narrative:
        'You breathe deep and anchor yourself completely. The surge breaks around you like a wave around stone. When the fog clears, the path is open. The drake is gone.',
      threatDelta: -100,
      xpDelta: 25,
      effects: { drakeScale: -0.3 },
    },
  },
];

function getDominant(history) {
  const counts = { a: 0, b: 0, c: 0 };
  history.forEach((h) => counts[h]++);
  const max = Math.max(counts.a, counts.b, counts.c);
  if (counts.a === counts.b && counts.b === counts.c) return 'mixed';
  if (counts.a === max) return 'a';
  if (counts.b === max) return 'b';
  return 'c';
}

export const DEBRIEF_MAP = {
  a: {
    technique: 'Exposure & Approach Behavior',
    explanation:
      'You chose to move toward discomfort instead of away from it. In psychology, this is called \u201cexposure\u201d\u200a\u2014\u200athe deliberate practice of approaching what makes you anxious. Each step forward tells your nervous system: \u201cI can handle this.\u201d',
    microAction:
      'In the next hour, notice one thing you\u2019ve been putting off or avoiding. Take one small step toward it\u200a\u2014\u200aeven just acknowledging it counts. The skill isn\u2019t fearlessness; it\u2019s willingness.',
    source: 'Based on principles from Exposure Therapy and Behavioral Activation (CBT)',
  },
  b: {
    technique: 'Cognitive Defusion & Mindful Observation',
    explanation:
      'You chose to watch and name your experience rather than get tangled in it. This skill\u200a\u2014\u200acalled \u201ccognitive defusion\u201d in ACT\u200a\u2014\u200acreates space between you and your thoughts. When you label a feeling, you step from \u201cI am anxious\u201d to \u201cI notice anxiety.\u201d',
    microAction:
      'Right now, silently name three things you\u2019re feeling without judging them. \u201cI notice [feeling].\u201d That pause between noticing and reacting? That\u2019s the skill you just practiced.',
    source: 'Based on principles from Acceptance and Commitment Therapy (ACT)',
  },
  c: {
    technique: 'Grounding & Somatic Regulation',
    explanation:
      'You chose to anchor yourself in physical sensations when pressure built. Grounding interrupts the anxiety spiral by pulling attention from \u201cwhat if\u201d thoughts back to \u201cwhat is\u201d\u200a\u2014\u200ayour body, your breath, the present moment.',
    microAction:
      'Try the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This is your grounding skill\u200a\u2014\u200aportable, free, and always available.',
    source: 'Based on principles from Somatic Experiencing and Mindfulness-Based Stress Reduction',
  },
  mixed: {
    technique: 'Flexible Coping',
    explanation:
      'You used a mix of approaches\u200a\u2014\u200astepping forward, observing, and grounding. This flexibility is itself a powerful skill. Rather than one rigid response to stress, you adapted to each moment.',
    microAction:
      'Next time you feel pressure building, pause and ask: \u201cDo I need to approach this, observe it, or ground myself?\u201d Having options is the skill.',
    source: 'Based on principles from psychological flexibility (ACT) and adaptive coping',
  },
};

export function getDebriefForHistory(history) {
  const dominant = getDominant(history);
  return { ...DEBRIEF_MAP[dominant], dominant };
}

export const CRISIS_RESOURCES = {
  title: 'You\u2019re Not Alone',
  message:
    'If you\u2019re in crisis or having thoughts of self-harm, please reach out to someone who can help right now.',
  resources: [
    { name: '988 Suicide & Crisis Lifeline', action: 'Call or text 988', available: '24/7' },
    { name: 'Crisis Text Line', action: 'Text HOME to 741741', available: '24/7' },
    {
      name: 'SAMHSA Helpline',
      action: '1-800-662-4357',
      available: '24/7, free, confidential',
    },
  ],
  footer:
    'QuestMind Battle is not therapy and cannot replace professional care. If you\u2019re struggling, a real human can help.',
};

export const DISCLAIMER_TEXT =
  'This is a mental fitness experience, not a diagnostic tool or therapy replacement. If you are in crisis, please call 988 or text HOME to 741741.';
