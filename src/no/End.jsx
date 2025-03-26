import React, { useEffect, useState } from 'react'

import musEndOfMadness from "../music/mus_madness_end_gift.wav";
import musBucle from "../music/mus_madness_end.wav";
import DialogsEnd from './DialogsEnd';
import { Box } from '@mui/material';

export default function End({ volume, sfx }) {
  const [endOfMadnessSong] = useState(new Audio(musEndOfMadness));
  const [bucleSong] = useState(new Audio(musBucle));

  useEffect(() => {
      // Reproducir el sonido de introducción
      endOfMadnessSong.play();
      endOfMadnessSong.volume = volume / 100;
  
      endOfMadnessSong.onended = () => {
        setTimeout(() => {
          bucleSong.play();
          bucleSong.loop = true;
          bucleSong.volume = volume / 100;
        }, 2000);
      };
  
      return () => {
        endOfMadnessSong?.pause();
      };
    }, [endOfMadnessSong, volume]);

  return (
    <Box textAlign="center">
      <DialogsEnd sfx={sfx} />
    </Box>
  )
}
