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
import ArrowUpwardIcon from "@/public/top.png";
import MenuIcon from "@/public/menu.png";
import ExpandIcon from "@/public/expand.png";  // Yeni ikon
import ArrowIcon from "@/public/arrows.png";  // Yeni ikon

const HomeContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(200);
  const [showMenu, setShowMenu] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [areAllSectionsExpanded, setAreAllSectionsExpanded] = useState(true);

  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleAllSections = () => {
    setAreAllSectionsExpanded(prev => !prev);
  };

  const filteredSongs = songs.filter(song => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      song.title.toLowerCase().includes(normalizedSearchTerm) ||
      song.artist.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  const scrollToSection = (songId: string) => {
    const element = document.getElementById(`song-${songId}`);
    if (element) {
      // Elementin ekranın en üstüne yapışması için
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'  // En üste hizala
      });

      setActiveSection(songId);
      setShowMenu(false); // Mobil menüyü kapat
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }

      const sections = songs.map(song => document.getElementById(`song-${song.id}`));
      const currentSection = sections.find(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id.replace('song-', ''));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const increaseScrollSpeed = () => {
    setScrollSpeed(prevSpeed => Math.max(50, prevSpeed - 20));
  };

  const decreaseScrollSpeed = () => {
    setScrollSpeed(prevSpeed => Math.min(500, prevSpeed + 20));
  };

  useEffect(() => {
    if (isAutoScrolling) {
      scrollInterval.current = setInterval(() => {
        window.scrollBy(0, 1);
      }, scrollSpeed);
    } else if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }

    return () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };
  }, [isAutoScrolling, scrollSpeed]);

  return (
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <div className={styles.headerContent}>
          <button
            className={styles.hamburgerButton}
            onClick={toggleMenu}
          >
            <Image src={MenuIcon} width={30} height={30} alt="menü" />
          </button>

          <h2>Şarkı Listesi</h2>

          <button
            className={styles.expandAllButton}
            onClick={toggleAllSections}
          >
            <Image
              src={areAllSectionsExpanded ? ArrowIcon : ExpandIcon}
              width={30}
              height={30}
              alt={areAllSectionsExpanded ? "Tümünü Daralt" : "Tümünü Genişlet"}
            />
          </button>
        </div>

        <input
          type="search"
          placeholder="Şarkı Adıyla Ara"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </header>

      <div className={styles.sectionsContainer}>
        <div className={styles.songsContainer}>
          {filteredSongs.map(song => (
            <Section
              key={song.id}
              song={song}
              id={`song-${song.id}`}
              isActive={activeSection === song.id.toString()}
              forceExpand={areAllSectionsExpanded}  // Section componentine yeni prop
            />
          ))}
        </div>
        <div
          ref={menuRef}
          className={`${styles.stickyMenu} ${showMenu ? styles.open : ''}`}
        >
          <h3>Şarkı Listesi</h3>
          <ul>
            {songs.map((song, index) => (
              <li
                key={song.id}
                className={activeSection === song.id.toString() ? styles.active : ''}
                onClick={() => scrollToSection(song.id.toString())}
              >
                {index + 1}. {song.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.scrollButton}>
        {showGoToTop && (
          <button onClick={scrollToTop}>
            <Image src={ArrowUpwardIcon} width={50} height={50} alt="yukarı_çık_icon" />
          </button>
        )}
        <button onClick={increaseScrollSpeed}>
          <Image src={AddIcon} width={40} height={40} alt="add_icon" />
        </button>
        <button onClick={toggleAutoScroll}>
          {!isAutoScrolling ? (
            <Image src={PlayIcon} width={50} height={50} alt="play_icon" />
          ) : (
            <Image src={PauseIcon} width={50} height={50} alt="pause_icon" />
          )}
        </button>
        <button onClick={decreaseScrollSpeed}>
          <Image src={RemoveIcon} width={40} height={40} alt="remove_icon" />
        </button>
      </div>
    </div>
  );
};

export default HomeContainer;