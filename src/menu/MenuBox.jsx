import { Grid2 as Grid, Typography } from "@mui/material";

import { motion } from "motion/react";
import { useState } from "react";

import LogroBox from "./LogroBox";
import sfxSelected from "../music/sfx_selected.wav";
import sfxLock from "../music/sfx_lock.wav";

export default function MenuBox({ setView, buttonSfx, mainSong, sfx, volume }) {
  const [desition, setDesition] = useState(false);
  const [logros, setLogros] = useState(false);
  const block = JSON.parse(localStorage.getItem('d1d1-end')) === 'completed';

  const handleOpenLogros = () => {
    setLogros(true);
  }

  const handleCloseLogros = () => {
    setLogros(false);
  }

  const handleSound = () => {
    buttonSfx.play();
  };

  const handleView = (view) => {
    if (block) {
      const lockSfx = new Audio(sfxLock);

      lockSfx.play();
      lockSfx.volume = sfx / 100;
    }

    if (desition || block) return;
    setDesition(true);

    const selectedSfx = new Audio(sfxSelected);
    selectedSfx.play();
    selectedSfx.volume = sfx / 100;

    const fadeOutInterval = setInterval(() => {
      if (mainSong.volume > 0.1) {
        mainSong.volume -= 0.1;
      } else {
        mainSong.volume = 0;
        mainSong.pause();
        clearInterval(fadeOutInterval);
      }
    }, 300);

    setTimeout(() => {
      setView(view);
    }, 2000);
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }} spacing={20}>
      <Grid>
        <Typography variant='h5'>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            ¿Cuál es tú desición?
          </motion.div>
        </Typography>
      </Grid>
      <Grid container justifyContent="center" size={12}>
        <Grid>
          <Typography
            variant="h4"
            sx={{
              color: (desition || block) ? "text.disabled" : "error.main",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 2 }}
              onClick={() => handleView("no")}
              onHoverStart={handleSound}
            >
              No
            </motion.div>
          </Typography>
        </Grid>
        <Grid>
          <Typography
            variant="h4"
            sx={{
              color: (desition || block) ? "text.disabled" : "primary.main",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 2 }}
              onClick={() => handleView("si")}
              onHoverStart={handleSound}
            >
              Si
            </motion.div>
          </Typography>
        </Grid>
        <Grid container justifyContent='center' size={12}>
          <Typography
            variant="h3"
            sx={{
              color: "primary.main",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 2 }}
              onHoverStart={handleSound}
              onClick={handleOpenLogros}
            >
              Baúl
            </motion.div>
            <LogroBox open={logros} handleClose={handleCloseLogros} mainSong={mainSong} volume={volume} />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
