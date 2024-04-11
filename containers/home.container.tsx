"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from "./home.module.scss";
import Section from '@/components/section/section.component';
import { songs } from "@/data/songs";
import Image from 'next/image';
import PlayIcon from "@/public/play.png";
import PauseIcon from "@/public/pause.png";
import AddIcon from "@/public/add.png";
import RemoveIcon from "@/public/remove.png";

const HomeContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(200);

  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const filteredSongs = songs.filter(song => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      song.title.toLowerCase().includes(normalizedSearchTerm) ||
      song.artist.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const increaseScrollSpeed = () => {
    setScrollSpeed(prevSpeed => prevSpeed - 20);
  };

  const decreaseScrollSpeed = () => {
    setScrollSpeed(prevSpeed => prevSpeed + 20);
  };

  useEffect(() => {
    if (isAutoScrolling) {
      scrollInterval.current = setInterval(() => {
        window.scrollBy(0, 1);
      }, scrollSpeed);
    } else if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }

    // Cleanup fonksiyonu
    return () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };
  }, [isAutoScrolling, scrollSpeed]);


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
      <div className={styles.scrollButton}>
        <button onClick={increaseScrollSpeed}><Image src={AddIcon} width={30} height={30} alt="add_icon" /></button>
        <button onClick={toggleAutoScroll}>
          {!isAutoScrolling ? (<Image src={PlayIcon} width={30} height={30} alt="play_icon" />
          ) : (<Image src={PauseIcon} width={30} height={30} alt="pause_icon" />)}

        </button>
        <button onClick={decreaseScrollSpeed}><Image src={RemoveIcon} width={30} height={30} alt="remove_icon" /></button>
      </div>
    </div>
  );
};

export default HomeContainer;
