import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { shakeText } from "./Textos";

export default function Dydy({ isHer }) {
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
        {isHer.is && (
          <DialogContentText>
            <Box component='span' sx={{color: 'red'}}>{shakeText("Solo tienes una oportunidad")}</Box>. Después de escojer podrás probar las otras opciones. Procura que la primera vez sea tú respuesta.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Todo claro</Button>
      </DialogActions>
    </Dialog>
  );
}
