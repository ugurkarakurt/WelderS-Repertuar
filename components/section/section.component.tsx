// Section.tsx
"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from "./section.module.scss";
import { Song } from "@/types";
import Image from 'next/image';
import DropdownIcon from "@/public/caret-down.png";

interface Props {
  song: Song;
}

const Section: React.FC<Props> = ({ song }) => {
  const [isChordsVisible, setIsChordsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.offsetHeight;
      // HomeContainer bileşenine bölümün yüksekliğini aktar
      // sectionHeight değişkeni, HomeContainer bileşeninde kullanılacak
    }
  }, []);

  const toggleChordsVisibility = () => {
    setIsChordsVisible(prevState => !prevState);
  };

  return (
    <div className={styles.sectionContainer} ref={sectionRef}>
      <h2 onClick={toggleChordsVisibility}>
        {song.id}. {song.artist} - {song.title}
        <Image className={`${isChordsVisible && styles.active}`} width={20} height={20} src={DropdownIcon} alt="icon" />
      </h2>
      {isChordsVisible && song.chordsHTML && (
        <div className={styles.songWrapper}>
          {song.chordsHTML}
          {song.soloTab && <Image unoptimized width={100} height={100} src={song.soloTab} alt="solo_tab" />}
        </div>
      )}
    </div>
  );
};

export default Section;
