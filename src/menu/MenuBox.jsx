import { Grid2 as Grid, Typography } from "@mui/material";

import { motion } from "motion/react";
import { useState } from "react";

import sfxSelected from "../music/sfx_selected.wav";

export default function MenuBox({ setView, buttonSfx, mainSong, sfx }) {
  const [desition, setDesition] = useState(false);

  const handleSound = () => {
    buttonSfx.play();
  };

  const handleView = (view) => {
    if (desition) return;
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
              color: desition ? "text.disabled" : "error.main",
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
              color: desition ? "text.disabled" : "primary.main",
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
              color: desition ? "text.disabled" : "primary.main",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 2 }}
              onHoverStart={handleSound}
            >
              Finales
            </motion.div>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
