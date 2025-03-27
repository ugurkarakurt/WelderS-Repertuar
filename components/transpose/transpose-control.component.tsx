"use client";

import React, { useState, useEffect } from "react";
import styles from "./transpose-control.module.scss";

interface TransposeControlProps {
  onTranspose: (value: number) => void;
}

// Akor transpozisyon için kullanılacak akorlar ve karşılıkları
const CHORDS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const TransposeControl: React.FC<TransposeControlProps> = ({ onTranspose }) => {
  const [transposeValue, setTransposeValue] = useState(0);

  // Transpozisyon değerini değiştir
  const handleTranspose = (amount: number) => {
    const newValue = transposeValue + amount;
    setTransposeValue(newValue);
    onTranspose(newValue);

    // Akorları transpoz etmek için sayfa üzerindeki span.c elementlerini bul
    updateChords(newValue);
  };

  // Transpozisyonu sıfırla
  const resetTranspose = () => {
    setTransposeValue(0);
    onTranspose(0);
    updateChords(0);
  };

  // Akorları transpoz et
  const updateChords = (steps: number) => {
    const chordElements = document.querySelectorAll("span.c");

    chordElements.forEach((element) => {
      const chordText = element.textContent || "";

      // Temel akoru ve ek notasyonları (m, 7, sus4 vb.) ayır
      const match = chordText.match(/^([A-G][#b]?)(.*)$/);

      if (match) {
        const [, baseChord, suffix] = match;

        // Akorun CHORDS dizisindeki indeksini bul
        const chordIndex = CHORDS.indexOf(baseChord);

        if (chordIndex !== -1) {
          // Yeni indeksi hesapla, mod 12 alarak 12 nota içinde döndür
          const newIndex = (chordIndex + steps + 12) % 12;
          const newChord = CHORDS[newIndex] + suffix;

          // Yeni akoru ata
          element.textContent = newChord;
        }
      }
    });
  };

  // Komponentin ilk render'ında akorları güncellemek için
  useEffect(() => {
    updateChords(transposeValue);
  }, []);

  return (
    <div className={styles.transposeControl}>
      <button
        onClick={() => handleTranspose(-1)}
        aria-label="Yarım ton düşür"
        title="Yarım ton düşür"
      >
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

      <div className={styles.transposeValueContainer}>
        <span className={styles.transposeLabel}>Transpose:</span>
        <span className={styles.transposeValue}>
          {transposeValue > 0 ? `+${transposeValue}` : transposeValue}
        </span>
      </div>

      <button
        onClick={() => handleTranspose(1)}
        aria-label="Yarım ton yükselt"
        title="Yarım ton yükselt"
      >
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

      {transposeValue !== 0 && (
        <button
          className={styles.resetButton}
          onClick={resetTranspose}
          aria-label="Sıfırla"
          title="Sıfırla"
        >
          Sıfırla
        </button>
      )}
    </div>
  );
};

export default TransposeControl;
