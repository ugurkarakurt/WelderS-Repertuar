"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./metronome.module.scss";

const MetronomeComponent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(80);
  const [isOpen, setIsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Metronom sesini oluştur
  const playClick = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = 1000;
    gainNode.gain.value = 0.5;
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + 0.1
    );

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  // Metronom başlat/durdur
  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      playClick();
      const interval = 60000 / tempo;
      intervalRef.current = setInterval(playClick, interval);
    }

    setIsPlaying(!isPlaying);
  };

  // Tempoyu değiştir
  const changeTempo = (amount: number) => {
    const newTempo = Math.max(30, Math.min(240, tempo + amount));
    setTempo(newTempo);

    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      const interval = 60000 / newTempo;
      intervalRef.current = setInterval(playClick, interval);
    }
  };

  // Açık/Kapalı durumunu değiştir
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Komponentin kaldırılması durumunda interval'i temizle
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Tempo değiştiğinde interval güncelle
  useEffect(() => {
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      const interval = 60000 / tempo;
      intervalRef.current = setInterval(playClick, interval);
    }
  }, [tempo]);

  return (
    <div className={`${styles.metronome} ${isOpen ? "" : styles.collapsed}`}>
      <button
        className={styles.metronomeToggle}
        onClick={toggleOpen}
        aria-label={isOpen ? "Metronomu gizle" : "Metronomu göster"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8V12L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      <div className={styles.metronomeContent}>
        <div className={styles.tempoControl}>
          <button onClick={() => changeTempo(-5)} aria-label="Tempoyu azalt">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className={styles.tempoValue}>{tempo}</span>
          <button onClick={() => changeTempo(5)} aria-label="Tempoyu artır">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <button
          className={`${styles.playButton} ${isPlaying ? styles.active : ""}`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Metronomu durdur" : "Metronomu başlat"}
        >
          {isPlaying ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 4H6V20H10V4Z" fill="currentColor" />
              <path d="M18 4H14V20H18V4Z" fill="currentColor" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 4L19 12L5 20V4Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MetronomeComponent;
