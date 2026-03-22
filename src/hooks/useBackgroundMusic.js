import { useRef, useCallback, useEffect } from 'react';

const BGM_SRC = '/bgm.mp3';

export function useBackgroundMusic() {
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const ensurePlaying = useCallback(() => {
    if (startedRef.current || !audioRef.current) return;
    audioRef.current.play().then(() => {
      startedRef.current = true;
    }).catch(() => {});
  }, []);

  return { ensurePlaying };
}
