import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MusicBox from "./MusicBox";

import musMadness from "../music/mus_madness.wav";

export default function LogroBox({ open, handleClose, mainSong, volume }) {

  return (
    <Dialog open={open}>
      <DialogTitle>Vaul de recuerdos</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <MusicBox song={musMadness} mainSong={mainSong} volume={volume} title='Madness' unlock={true} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
