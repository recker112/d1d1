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
import musEndOfMadness from "../music/mus_madness_end_gift.wav";
import musDydy from "../music/mus_dydy.wav";

export default function LogroBox({ open, handleClose, mainSong, volume }) {

  return (
    <Dialog open={open}>
      <DialogTitle>Baúl de recuerdos</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <MusicBox song={musDydy} mainSong={mainSong} volume={volume} title='Dydy' unlock={true} />
          <MusicBox song={musMadness} mainSong={mainSong} volume={volume} title='Madness' unlock={true} />
          <MusicBox song={musEndOfMadness} mainSong={mainSong} volume={volume} title='End Of Madness' unlock={true} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
