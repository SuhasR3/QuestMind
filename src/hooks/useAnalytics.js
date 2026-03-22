import { useCallback, useRef } from 'react';

export function useAnalytics() {
  const sessionId = useRef(`qm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);

  const emit = useCallback(
    (event, data = {}) => {
      const payload = {
        event,
        sessionId: sessionId.current,
        timestamp: new Date().toISOString(),
        ...data,
      };
      if (import.meta.env.DEV) {
        console.log(`%c[QuestMind] ${event}`, 'color: #06b6d4; font-weight: bold', payload);
      }
    },
    []
  );

  return { emit };
}
