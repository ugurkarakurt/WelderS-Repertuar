"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { songs } from "@/data/songs";
import styles from "./song-detail.module.scss";
import MetronomeComponent from "@/components/metronome/metronome.component";
import TransposeControl from "@/components/transpose/transpose-control.component";

const SongDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [transpose, setTranspose] = useState(0);

  useEffect(() => {
    // ID ile şarkıyı bul
    const foundSong = songs.find((s) => s.id.toString() === id);

    if (foundSong) {
      setSong(foundSong);
    }

    setLoading(false);
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleTranspose = (newValue: number) => {
    setTranspose(newValue);
  };

  if (loading) {
    return <div className={styles.loading}>Yükleniyor...</div>;
  }

  if (!song) {
    return <div className={styles.notFound}>Şarkı bulunamadı!</div>;
  }

  return (
    <div className={styles.songDetailContainer}>
      <div className={styles.songHeader}>
        <h1>
          {song.artist} - {song.title}
        </h1>
        <button onClick={handleBack} className={styles.backButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Geri</span>
        </button>
      </div>

      <div className={styles.controlsContainer}>
        <TransposeControl onTranspose={handleTranspose} />
      </div>

      <div className={styles.songContent}>
        {song.chordsHTML && (
          <div className={styles.chordsContainer} data-transpose={transpose}>
            {song.chordsHTML}
          </div>
        )}

        {song.soloTab && (
          <div className={styles.soloTabContainer}>
            <h3>Solo Tab</h3>
            <Image
              unoptimized
              width={600}
              height={300}
              src={song.soloTab}
              alt={`${song.title} solo tab`}
              className={styles.soloTabImage}
            />
          </div>
        )}
      </div>

      {/* <MetronomeComponent /> */}
    </div>
  );
};

export default SongDetailPage;
