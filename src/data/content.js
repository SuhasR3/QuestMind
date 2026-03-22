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

export const QUESTS = {
  fog_drake: {
    id: 'fog_drake',
    name: 'FOG DRAKE',
    level: 'Lv.03',
    accentColor: '#7c6af7',
    lore: 'A serpentine shape made entirely of churning grey-green fog. Its form has no edges \u2014 the longer you look, the less defined it becomes. Only the eyes are fixed: two deep red points that never blink. From here it looks enormous. You have been looking at it from here for a long time.',
    cbtLabel: 'Behavioral Activation / Exposure',
    hasWrongMove: false,
    beats: BEAT_INTROS.map((intro, i) => ({
      intro,
      fieldNote: FIELD_NOTES[i],
      actions: Object.fromEntries(
        Object.entries(BEAT_ACTIONS[i]).map(([k, v]) => [k, { ...v, correct: true, toast: '' }])
      ),
    })),
    debrief: null,
  },

  the_weight: {
    id: 'the_weight',
    name: 'THE WEIGHT',
    level: 'Lv.04',
    accentColor: '#7c6af7',
    lore: 'A massive ancient tortoise the size of a small building. Its shell is a precarious tower of crumbling grey stone blocks, each carved with illegible text \u2014 every obligation you have ever had, stacked unevenly. The creature looks exhausted. Its legs are slightly buckled. It does not attack. It just keeps existing, enormous, directly in your path.',
    cbtLabel: 'Task Decomposition / Behavioral Activation',
    hasWrongMove: false,
    beats: [
      {
        intro: 'The tower sways. Each block looks heavier than the last. Your brain has merged all of it into one impossible object.',
        fieldNote: 'Overwhelm is almost never too much to do. It is a list pretending to be one thing.',
        actions: {
          a: {
            label: 'Break It Down',
            description: 'Read one stone. Separate it.',
            narrative: 'You read one stone. It says \u201creply to Marcus.\u201d It separates from the pile and shrinks to hand size. That was a two-minute task carrying the weight of everything else.',
            toast: 'Decomposition \u2014 one thing at a time breaks the fusion',
            threatDelta: -12, xpDelta: 30,
            effects: { drakeScale: -0.06 },
            correct: true,
          },
          b: {
            label: 'Write It Out',
            description: 'Pull out the field journal. Name what you see.',
            narrative: 'You list what you can see. Three stones get labels. They do not move but they stop swaying. Named things stop merging.',
            toast: 'Externalizing \u2014 the brain cannot hold a list and fear it simultaneously',
            threatDelta: -10, xpDelta: 30,
            effects: { drakeOpacity: -0.08 },
            correct: true,
          },
          c: {
            label: 'Just One Thing',
            description: 'Pick one stone and set it aside.',
            narrative: 'You pick one stone and set it aside. The tower drops one level. The creature exhales. You did not solve everything. You moved one thing.',
            toast: 'Behavioral Activation \u2014 starting anywhere interrupts the freeze',
            threatDelta: -15, xpDelta: 30,
            effects: { drakeScale: -0.08 },
            correct: true,
          },
        },
      },
      {
        intro: 'The tower is lower than it was. Your body registered that. Smaller is different from gone \u2014 but smaller is real.',
        fieldNote: 'The stones were always separate. The pile was the cognitive distortion.',
        actions: {
          a: {
            label: 'Break It Down',
            description: 'Find another stone. Name what is actually inside it.',
            narrative: 'Another stone: \u201csort out the finances.\u201d Beneath it: one spreadsheet, thirty minutes, Tuesday. Two smaller stones replace it. It multiplied in the right direction.',
            toast: 'Sub-tasks \u2014 smaller things are lighter things',
            threatDelta: -12, xpDelta: 30,
            effects: { drakeScale: -0.06 },
            correct: true,
          },
          b: {
            label: 'Write It Out',
            description: 'Finish the list. Label everything visible.',
            narrative: 'List complete. All visible stones now labeled. The creature stops moving entirely. It cannot grow what it cannot hide.',
            toast: 'Visibility \u2014 named things cannot pretend to be bigger than they are',
            threatDelta: -10, xpDelta: 30,
            effects: { drakeOpacity: -0.08 },
            correct: true,
          },
          c: {
            label: 'Just One Thing',
            description: 'Remove a second stone.',
            narrative: 'Second stone removed. Tower noticeably shorter. The creature\'s legs straighten slightly. Two things done is not nothing. Your body registers the difference.',
            toast: 'Progress compounds \u2014 two is not zero',
            threatDelta: -15, xpDelta: 30,
            effects: { drakeScale: -0.08 },
            correct: true,
          },
        },
      },
      {
        intro: 'The tower is manageable now. Not gone. Manageable. That is the actual goal.',
        fieldNote: 'Order does not solve the list. It makes starting possible.',
        actions: {
          a: {
            label: 'Break It Down',
            description: 'Final decomposition. Split the largest stone.',
            narrative: 'Final decomposition. The largest remaining stone splits into four. Each is manageable. There was never one impossible thing. There were always several possible things pretending to be one.',
            toast: 'The impossible was always several possibles in disguise',
            threatDelta: -18, xpDelta: 30,
            effects: { drakeScale: -0.15, drakeOpacity: -0.2 },
            correct: true,
          },
          b: {
            label: 'Write It Out',
            description: 'Prioritize. Give each stone an order.',
            narrative: 'List complete, prioritized. The tower organizes itself into a short orderly column. Order does not solve the list. It makes starting possible.',
            toast: 'Structure precedes action',
            threatDelta: -15, xpDelta: 30,
            effects: { drakeScale: -0.1, drakeOpacity: -0.15 },
            correct: true,
          },
          c: {
            label: 'Just One Thing',
            description: 'Third removal. One more stone down.',
            narrative: 'Third removal. Tower is low. The creature looks peaceful. You did three small things instead of one impossible thing. The math was always in your favor.',
            toast: 'Small things done are worth more than big things planned',
            threatDelta: -20, xpDelta: 30,
            effects: { drakeScale: -0.2, drakeOpacity: -0.25 },
            correct: true,
          },
        },
      },
    ],
    debrief: {
      technique: 'Task Decomposition',
      explanation: 'Overwhelm is almost never caused by having too much to do in absolute terms. It is caused by the brain treating a list of separate tasks as one merged impossibility. Decomposition breaks the fusion. Starting anything at all interrupts the freeze response.',
      microAction: 'Write down everything in your head right now, one line each. Then pick the smallest thing on the list and do only that. Not the most important \u2014 the smallest. Starting is the skill.',
      source: 'Based on Task Decomposition and Behavioral Activation (CBT)',
      correctActions: ['a', 'b', 'c'],
      wrongActions: [],
    },
  },

  the_static: {
    id: 'the_static',
    name: 'THE STATIC',
    level: 'Lv.05',
    accentColor: '#c4c4d4',
    lore: 'A dense churning storm cloud at head height, shaped loosely like a face but never resolving into one. It crackles with pale white-blue lightning running in short repetitive arcs \u2014 the same patterns looping over and over. It has no mouth but emits a constant low-frequency hum. It pulses faster when you engage with it directly. When you try to analyze it or argue with it, the arcs get longer and more chaotic.',
    cbtLabel: 'Cognitive Defusion / Attention Redirection (ACT)',
    hasWrongMove: true,
    beats: [
      {
        intro: 'The Static fills the upper right. The same arcs running the same paths. You have been watching this loop for a while.',
        fieldNote: 'Rumination is not problem-solving. It is the simulation of problem-solving with no exit condition.',
        wrongMoveId: 'c',
        actions: {
          a: {
            label: 'Name It',
            description: 'Say out loud what the loop is.',
            narrative: 'You say out loud what the loop is: \u201cI keep replaying what I said at the meeting.\u201d The cloud flickers. Lightning pauses for one second. It does not like being described.',
            toast: 'Defusion \u2014 naming the thought from outside the thought',
            threatDelta: -12, xpDelta: 30,
            effects: { drakeOpacity: -0.1 },
            correct: true,
          },
          b: {
            label: 'Let It Pass',
            description: 'Watch without engaging or following the thought.',
            narrative: 'You watch without engaging. You do not argue with it, do not follow the thought. The cloud continues but the noise drops slightly. You are not feeding it.',
            toast: 'Non-engagement \u2014 the loop runs but you are not in it',
            threatDelta: -8, xpDelta: 30,
            effects: { drakeOpacity: -0.08 },
            correct: true,
          },
          c: {
            label: 'Analyze It',
            description: 'Follow the thought. Try to find the answer inside it.',
            narrative: 'You follow the thought, trying to solve it. The cloud expands. Lightning intensifies. There is no solution down there. The loop offered you a door and you walked through it.',
            toast: 'Analyzing a rumination loop from inside the loop keeps it running',
            threatDelta: +15, xpDelta: 0,
            effects: { drakeScale: +0.1, drakeOpacity: +0.1 },
            correct: false,
          },
        },
      },
      {
        intro: 'The Static is still running. But you have been here before and you did not disappear. That is data.',
        fieldNote: 'Distance is accumulating. You are practicing not chasing it.',
        wrongMoveId: 'b',
        actions: {
          a: {
            label: 'Name It',
            description: 'Get more specific. Name the exact shape of the loop.',
            narrative: 'More specific: \u201cI am doing the thing where I decide in advance that everyone thought I was stupid.\u201d Lightning stops completely for two seconds. That level of specificity is almost funny. The loop hates precision.',
            toast: 'Precision dissolves the loop \u2014 vagueness is its fuel',
            threatDelta: -15, xpDelta: 30,
            effects: { drakeOpacity: -0.15 },
            correct: true,
          },
          b: {
            label: 'Solve It',
            description: 'Find the root cause of the worry.',
            narrative: 'You try to find the root cause. The cloud grows larger than beat 1. It found the answer it was looking for: more questions.',
            toast: 'The loop has no bottom \u2014 searching for one feeds it',
            threatDelta: +15, xpDelta: 0,
            effects: { drakeScale: +0.15, drakeOpacity: +0.1 },
            correct: false,
          },
          c: {
            label: 'Redirect',
            description: 'Focus on something concrete and present.',
            narrative: 'Deeper redirect. Five things you can see. Name them. The cloud contracts visibly. You cannot ruminate and observe simultaneously.',
            toast: 'Present-tense observation is incompatible with rumination',
            threatDelta: -12, xpDelta: 30,
            effects: { drakeOpacity: -0.12 },
            correct: true,
          },
        },
      },
      {
        intro: 'This is the beat that matters. The Static cannot survive being seen clearly from the outside.',
        fieldNote: 'You cannot be inside the loop and observe it simultaneously.',
        wrongMoveId: 'a',
        actions: {
          a: {
            label: 'Resolve It',
            description: 'Trace it back until it makes sense.',
            narrative: 'You try to trace it back until it makes sense. The cloud is now the largest it has ever been. Some loops have no origin story worth finding.',
            toast: 'Resolution is not available inside a rumination loop',
            threatDelta: +15, xpDelta: 0,
            effects: { drakeScale: +0.2, drakeOpacity: +0.15 },
            correct: false,
          },
          b: {
            label: 'Name It',
            description: 'Full precise labeling. Name its structure completely.',
            narrative: 'Full precise labeling: \u201cThis is the shame spiral about the meeting. It is a feeling, not a fact. I have had this exact loop before and survived it.\u201d The cloud collapses to a small orb that drifts upward and fades.',
            toast: 'You described it so accurately it had nowhere left to hide',
            threatDelta: -100, xpDelta: 30,
            effects: { drakeScale: -0.4, drakeOpacity: -0.6 },
            correct: true,
          },
          c: {
            label: 'Let It Pass',
            description: 'Stop giving it your attention entirely.',
            narrative: 'The cloud fades slowly to the orb. Slow win. You never fought it. You just stopped giving it your attention and eventually it ran out of fuel.',
            toast: 'Non-engagement is not passivity \u2014 it is a deliberate choice',
            threatDelta: -100, xpDelta: 30,
            effects: { drakeScale: -0.3, drakeOpacity: -0.5 },
            correct: true,
          },
        },
      },
    ],
    debrief: {
      technique: 'Cognitive Defusion',
      explanation: 'Rumination persists because we treat thoughts as problems to solve rather than events to observe. Defusion means stepping back from the thought and describing it rather than being inside it. Analyzing a rumination loop from inside the loop is exactly what keeps it running. Naming it from outside breaks the spell.',
      microAction: 'Next time you notice the loop starting, say out loud or write: \u201cI am having the thought that...\u201d and complete the sentence. Do not try to solve it. Just name the structure of it. That single act of labeling creates enough distance to interrupt the arc.',
      source: 'Based on Cognitive Defusion from Acceptance and Commitment Therapy (ACT)',
      correctActions: ['Name It', 'Let It Pass', 'Redirect'],
      wrongActions: ['Analyze It', 'Solve It', 'Resolve It'],
    },
  },

  mirror_twin: {
    id: 'mirror_twin',
    name: 'THE MIRROR TWIN',
    level: 'Lv.06',
    accentColor: '#6af789',
    lore: 'Your exact character, mirrored, wearing heavy layered armor made of cracked dark material cast from old memories. Each plate is slightly translucent \u2014 frozen inside are images of bad performances, embarrassing moments, failures. The twin\'s face is your face, but the expression is a cold permanent sneer. When you attack it directly, the armor thickens. When you name a piece, it cracks.',
    cbtLabel: 'Self-Compassion / Cognitive Defusion from Shame',
    hasWrongMove: true,
    beats: [
      {
        intro: 'The Mirror Twin stands across from you. Same face. Different expression. The armor catches the light from every failure you have ever been shown.',
        fieldNote: 'The inner critic uses your own memories as evidence. It has been preparing its case for years.',
        wrongMoveId: 'c',
        actions: {
          a: {
            label: 'Name a Piece',
            description: 'Look at one armor plate and say what it is.',
            narrative: 'You look at one armor plate. \u201cThat one is the presentation I froze during in 2019.\u201d The plate cracks. Doesn\'t fall \u2014 but loses its shine. You named it. It was using the darkness to stay big.',
            toast: 'Naming shame in the light \u2014 it cannot survive precision',
            threatDelta: -12, xpDelta: 30,
            effects: { drakeOpacity: -0.08 },
            correct: true,
          },
          b: {
            label: 'Soften',
            description: 'Say something you would say to a close friend.',
            narrative: 'You say something you would say to a close friend: \u201cThat was genuinely hard.\u201d The twin\'s expression flickers. The armor does not crack but the twin shrinks one notch. It was built on the assumption you would never do that.',
            toast: 'Self-compassion is not agreement \u2014 it is threat deactivation',
            threatDelta: -10, xpDelta: 30,
            effects: { drakeScale: -0.06 },
            correct: true,
          },
          c: {
            label: 'Fight Back',
            description: 'That is not true. Push back directly.',
            narrative: '\u201cThat is not true, I am actually fine.\u201d An armor plate thickens immediately. The twin grows. The critic has a full archive of counterarguments. It has been preparing for this.',
            toast: 'Direct confrontation of shame strengthens it \u2014 this is the clinical pattern',
            threatDelta: +15, xpDelta: 0,
            effects: { drakeScale: +0.1, drakeOpacity: +0.05 },
            correct: false,
          },
        },
      },
      {
        intro: 'The twin is still here. But you have made a dent. Something is different \u2014 either in the armor or in you.',
        fieldNote: 'Compassion is not indulgence. It is the most disorienting thing you could offer the critic.',
        wrongMoveId: 'b',
        actions: {
          a: {
            label: 'Name a Piece',
            description: 'Second plate. Be more specific this time.',
            narrative: 'Second plate. More specific: \u201cThis one is the story that I always mess things up when it matters.\u201d The plate falls entirely \u2014 clatters and dissolves. Stories are not facts. That one was old.',
            toast: 'Stories are not verdicts \u2014 naming them ends their case',
            threatDelta: -15, xpDelta: 30,
            effects: { drakeOpacity: -0.12 },
            correct: true,
          },
          b: {
            label: 'Argue It',
            description: 'Present the evidence that the critic is wrong.',
            narrative: 'You present your evidence. The twin has better evidence. Two more plates appear where one cracked. The armor was built exactly for this.',
            toast: 'Arguing with shame gives it the engagement it needs to grow',
            threatDelta: +15, xpDelta: 0,
            effects: { drakeScale: +0.12, drakeOpacity: +0.08 },
            correct: false,
          },
          c: {
            label: 'Just Notice',
            description: 'Observe the twin without engaging.',
            narrative: '\u201cI notice I am believing the critic right now.\u201d Threat drops sharply. Belief is optional. You just made it optional.',
            toast: 'You can notice a thought without obeying it',
            threatDelta: -10, xpDelta: 30,
            effects: { drakeScale: -0.06 },
            correct: true,
          },
        },
      },
      {
        intro: 'This is the core of it. One plate left \u2014 or many, depending on how you have been playing.',
        fieldNote: 'You did not defeat it. You stopped fighting it. That is not the same thing and it is harder.',
        wrongMoveId: 'c',
        actions: {
          a: {
            label: 'Name a Piece',
            description: 'The final plate. The core belief underneath all the others.',
            narrative: 'The final plate. The core one. \u201cThis one says I am fundamentally not enough. I have carried that since I was young. It is a feeling, not a verdict.\u201d All remaining armor shatters. The twin stands small, tired, expression neutral.',
            toast: 'That was the one it was protecting all along \u2014 you saw it anyway',
            threatDelta: -100, xpDelta: 30,
            effects: { drakeScale: -0.4, drakeOpacity: -0.5 },
            correct: true,
          },
          b: {
            label: 'Soften',
            description: 'Full compassionate acknowledgment.',
            narrative: '\u201cYou were doing your best. We both were.\u201d The twin\'s armor dissolves slowly. The expression shifts to something close to relief. You did not defeat it. You stopped fighting it.',
            toast: 'Self-compassion is not the end of standards \u2014 it is the end of cruelty',
            threatDelta: -100, xpDelta: 30,
            effects: { drakeScale: -0.35, drakeOpacity: -0.45 },
            correct: true,
          },
          c: {
            label: 'Counter It',
            description: 'Prove it wrong. You have the evidence.',
            narrative: '\u201cI can prove that wrong.\u201d The twin smiles for the first time. Full armor returns. The critic has been waiting for you to make it a fair fight. This was never meant to be a fair fight.',
            toast: 'The armor was built to win arguments \u2014 compassion is the only move it cannot counter',
            threatDelta: +15, xpDelta: 0,
            effects: { drakeScale: +0.15, drakeOpacity: +0.1 },
            correct: false,
          },
        },
      },
    ],
    debrief: {
      technique: 'Shame Resilience & Self-Compassion',
      explanation: 'Research by Kristin Neff shows that self-criticism activates the same threat response as external danger. The nervous system cannot distinguish between an external attacker and an internal one. Self-compassion is not self-indulgence \u2014 it is threat deactivation. The armor thickening when you fight back is not a game mechanic. It is the actual clinical pattern.',
      microAction: 'Write one sentence you would say to a close friend who had done the thing you are criticizing yourself for. Then read it back to yourself with your own name at the start. The gap between what you offer someone else and what you offer yourself is exactly the size of the work.',
      source: 'Based on Self-Compassion research (Kristin Neff) and Shame Resilience Theory (Bren\u00e9 Brown)',
      correctActions: ['Name a Piece', 'Soften', 'Just Notice'],
      wrongActions: ['Fight Back', 'Argue It', 'Counter It'],
    },
  },
};
