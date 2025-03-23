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
import React, { useEffect, useState } from "react";
import { shakeText } from "./Textos";

export default function Dydy({ isHer, handleVolumeChange, volume, handleSfxChange, sfx }) {
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
          <Grid size={10}>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-labelledby="continuous-slider"
              min={0}
              max={100}
              sx={{maxWidth: 300}}
            />
          </Grid>
          <Grid size={2}>
            <Typography variant="caption">Efectos</Typography>
          </Grid>
          <Grid size={10}>
            <Slider
              value={sfx}
              onChange={handleSfxChange}
              aria-labelledby="continuous-slider"
              min={0}
              max={100}
              step={10}
              marks
              sx={{maxWidth: 300}}
            />
          </Grid>
        </Grid>
        <br />
        <DialogContentText>
          Si puedes, usa un PC...
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
