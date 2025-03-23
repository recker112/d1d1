import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
  Slider,
  Typography,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import { motion } from "motion/react";
import { shakeText } from "./Textos";

export default function Dydy({
  isHer,
  handleVolumeChange,
  volume,
  handleSfxChange,
  sfx,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHer) return;

    setOpen(true);
  }, [isHer]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Ten en cuenta lo siguiente</DialogTitle>
      {isHer.is ? (
        <Box
          sx={(theme) => ({
            position: "absolute",
            right: 16,
            top: 16,
            color: theme.palette.grey[500],
          })}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1.1, 1.5, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <MeetingRoomIcon />
          </motion.div>
        </Box>
      ) : (
        <Box
          sx={(theme) => ({
            position: "absolute",
            right: 16,
            top: 16,
            color: theme.palette.grey[500],
          })}
        >
          <motion.div
            animate={{ x: [0, 5, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <DoorBackIcon />
          </motion.div>
        </Box>
      )}
      <DialogContent>
        <DialogContentText>
          Usa audífonos, así podrás escuchar todo mejor.
        </DialogContentText>
        <br />
        <DialogContentText>
          Puede que el volumen no sea de tú agrado, ¡ajústalo!
        </DialogContentText>
        <Grid container>
          <Grid size={2}>
            <Typography variant="caption">Música</Typography>
          </Grid>
          <Grid container alignItems="center" spacing={1} size={10}>
            <Grid>
              <MusicOffIcon />
            </Grid>
            <Grid>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="continuous-slider"
                min={0}
                max={100}
                sx={{ width: 300 }}
              />
            </Grid>
            <Grid>
              <MusicNoteIcon />
            </Grid>
          </Grid>
          <Grid size={2}>
            <Typography variant="caption">Efectos</Typography>
          </Grid>
          <Grid container alignItems="center" spacing={1} size={10}>
            <Grid>
              <VolumeDownIcon />
            </Grid>
            <Slider
              value={sfx}
              onChange={handleSfxChange}
              aria-labelledby="continuous-slider"
              min={0}
              max={100}
              step={10}
              marks
              sx={{ width: 300 }}
            />
            <Grid>
              <VolumeUpIcon />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <DialogContentText>
          Los controles son WASD, no uses las flechas, no harán nada...
        </DialogContentText>
        <br />
        {isHer.is && (
          <DialogContentText>
            <Box component="span" sx={{ color: "red" }}>
              {shakeText("Solo tienes una oportunidad")}
            </Box>
            . Después de escojer podrás probar las otras opciones. Procura que
            la primera vez sea tú respuesta.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Todo claro
        </Button>
      </DialogActions>
    </Dialog>
  );
}
