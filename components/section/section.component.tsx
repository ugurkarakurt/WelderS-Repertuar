"use client";
// Section.tsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./section.module.scss";
import Image from "next/image";
import Link from "next/link";
import DropdownIcon from "@/public/caret-down.png";
import DetailsIcon from "@/public/details.png";

interface Props {
  song: any;
  id: string;
  isActive: boolean;
  forceExpand: any;
}

const Section: React.FC<Props> = ({ song, id, isActive, forceExpand }) => {
  const [isChordsVisible, setIsChordsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleChordsVisibility = () => {
    setIsChordsVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setIsChordsVisible(forceExpand);
  }, [forceExpand]);

  return (
    <div
      className={`${styles.sectionContainer} ${isActive ? styles.active : ""}`}
      ref={sectionRef}
      id={id}
    >
      <div className={styles.sectionHeader}>
        <h2 onClick={toggleChordsVisibility}>
          {song.id}. {song.artist} - {song.title}
          <Image
            className={`${isChordsVisible && styles.active}`}
            width={20}
            height={20}
            src={DropdownIcon}
            alt="Akorları göster/gizle"
          />
        </h2>
        <Link
          href={`/song/${song.id}`}
          className={styles.detailsButton}
          aria-label={`${song.title} şarkısının detaylarını göster`}
        >
          <Image width={20} height={20} src={DetailsIcon} alt="Detaylar" />
          <span>Detaylar</span>
        </Link>
      </div>

      {isChordsVisible && song.chordsHTML && (
        <div className={styles.songWrapper}>
          {song.chordsHTML}
          {song.soloTab && (
            <Image
              unoptimized
              width={100}
              height={100}
              src={song.soloTab}
              alt="solo_tab"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Section;
