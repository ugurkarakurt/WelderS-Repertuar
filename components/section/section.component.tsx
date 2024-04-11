import React, { useState } from 'react';
import styles from "./section.module.scss";
import { Song } from "@/types";
import Image from 'next/image';
import DropdownIcon from "@/public/caret-down.png";

interface Props {
  song: Song;
}

const Section: React.FC<Props> = ({ song }) => {
  const [isChordsVisible, setIsChordsVisible] = useState(true);

  const toggleChordsVisibility = () => {
    setIsChordsVisible(prevState => !prevState);
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 onClick={toggleChordsVisibility}>
        {song.id}. {song.artist} - {song.title}
        <Image className={`${isChordsVisible && styles.active}`} width={20} height={20} src={DropdownIcon} alt="icon" />
      </h2>
      {isChordsVisible && song.chordsHTML && (
        <div>
          {song.chordsHTML}
        </div>
      )}
    </div>
  );
};

export default Section;
