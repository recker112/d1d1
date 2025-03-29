import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import MusicBox from "./MusicBox";

import musMadness from "../music/mus_madness_gift.wav";
import musEndOfMadness from "../music/mus_madness_end_gift.wav";
import musDydy from "../music/mus_dydy.wav";
import musDydyWithFear from "../music/mus_dydy_with_fear.wav";
import { useState } from "react";
import { shakeText } from "../components/Textos";

export default function LogroBox({ open, handleClose, mainSong, volume }) {
  const [fear, setFear] = useState(false);
  const dydyUnlock =
    JSON.parse(localStorage.getItem("d1d1-yes")) === "completed";
  const madnessUnlock =
    JSON.parse(localStorage.getItem("d1d1-no")) === "completed";
  const endUnlock =
    JSON.parse(localStorage.getItem("d1d1-end")) === "completed";

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Baúl de recuerdos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MusicBox
              song={musDydy}
              mainSong={mainSong}
              volume={volume}
              title="Dydy"
              unlock={dydyUnlock}
            />
            <MusicBox
              song={musMadness}
              mainSong={mainSong}
              volume={volume}
              title="Madness"
              unlock={madnessUnlock}
            />
            <MusicBox
              song={musEndOfMadness}
              mainSong={mainSong}
              volume={volume}
              title="End Of Madness"
              unlock={endUnlock}
            />
            {endUnlock && (
              <MusicBox
                song={musDydyWithFear}
                mainSong={mainSong}
                volume={volume}
                title="Dydy With Fear"
                unlock={true}
                handle={() => setFear(true)}
                fear
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={fear}>
        <DialogTitle>¿Tienes miedo?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Siempre va a estar el <Box component='span' color='secondary.main'>{shakeText('miedo')}</Box> presente, pero se qué no vas a dejar que te gane. Hacer muchas cosas perfectas, <Typography component='span' variant='h4' color='info'>{shakeText('¡levanta tú voz!')}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFear(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
