"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { songs } from "@/data/songs";
import styles from "./song-detail.module.scss";
import BackIcon from "@/public/back.png";
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
        <button onClick={handleBack} className={styles.backButton}>
          <Image src={BackIcon} width={20} height={20} alt="Geri" />
          <span>Geri</span>
        </button>
        <h1>
          {song.artist} - {song.title}
        </h1>
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

      <MetronomeComponent />
    </div>
  );
};

export default SongDetailPage;
