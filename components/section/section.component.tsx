import React from 'react';
import styles from "./section.module.scss";
import { Song } from "@/types";

interface Props {
  song: Song;
}

const Section: React.FC<Props> = ({ song }) => {

  return (
    <div className={styles.sectionContainer}>
      <h2>{song.id}. {song.artist} - {song.title}</h2>
      {song.chordsHTML && (
        <>
          {
            song.chordsHTML
          }
        </>
      )}
    </div>
  );
};

export default Section;
