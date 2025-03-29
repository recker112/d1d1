import React, { useState, useEffect, useRef } from "react";
import { Grid2 as Grid, Slider, IconButton, Typography, Button } from "@mui/material";
import { PlayArrowRounded, PauseRounded } from "@mui/icons-material";

export default function MusicBox({ song, volume, mainSong, title, unlock, fear = false, handle = () => {} }) {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio(song));

  useEffect(() => {
    const audio = audioRef.current;

    // Actualizar la duración cuando se carga el audio
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Actualizar el tiempo actual mientras se reproduce
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (paused) {
      if (fear && !JSON.parse(localStorage.getItem('d1d1-fear'))) {
        localStorage.setItem('d1d1-fear', JSON.stringify(true));
        handle();
      }
      audio.play();
      audio.volume = volume / 100;

      audio.onended = () => togglePlayPause();
      mainSong.pause();
    } else {
      mainSong.play();
      audio.pause();
    }
    setPaused(!paused);
  };

  const handleSliderChange = (event, newValue) => {
    const audio = audioRef.current;
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const downloadSong = () => {
    const link = document.createElement("a");
    link.href = song;
    link.download = `${title}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Grid container alignItems='center' spacing={0.5}>
      <Grid size={12}>
        <Typography color={unlock ? 'primary' : 'textDisabled'}>
          {title}
        </Typography>
      </Grid>
      <Grid size='auto'>
        <IconButton
          aria-label={paused ? "play" : "pause"}
          onClick={togglePlayPause}
          size="small"
          disabled={!unlock}
        >
          {paused ? (
            <PlayArrowRounded />
          ) : (
            <PauseRounded />
          )}
        </IconButton>
      </Grid>
      <Grid size='grow'>
        <Slider
          value={currentTime}
          max={duration}
          disabled={!unlock}
          onChange={handleSliderChange}
          sx={(t) => ({
            color: "rgba(255, 255, 255, 0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${t.palette.mode === "dark" ? "rgb(255 255 255 / 16%)" : "rgb(0 0 0 / 16%)"}`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          })}
        />
      </Grid>
      <Grid container justifyContent="space-between" size={12}>
        <Typography variant="body2">{formatTime(currentTime)}</Typography>
        <Typography variant="body2">{formatTime(duration)}</Typography>
      </Grid>
      <Grid textAlign='right' size={12}>
        <Button color='secondary' onClick={downloadSong} disabled={!unlock}>Guardar recuerdo</Button>
      </Grid>
    </Grid>
  );
}
