"use client"
import React, { useState } from 'react';
import styles from "./home.module.scss";
import { Song } from "@/types";
import Section from '@/components/section/section.component';
import { songs } from "@/data/songs";

const HomeContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredSongs = songs.filter(song => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      song.title.toLowerCase().includes(normalizedSearchTerm) ||
      song.artist.toLowerCase().includes(normalizedSearchTerm)
    );
  });


  return (
    <div className={styles.homeContainer}>
      <h2>Şarkı Listesi</h2>
      <input
        type="text"
        placeholder="Şarka Adıyla Ara"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredSongs.map(song => (
        <Section key={song.id} song={song} />
      ))}

      {/* {songsList.map((song: Song) => (
        <Section key={song.id} song={song} />
      ))} */}
    </div>
  );
};

export default HomeContainer;
