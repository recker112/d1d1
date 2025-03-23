import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'

import sfxUnlock from "../music/sfx_unlock.wav";
import sfxLock from "../music/sfx_lock.wav";

export default function Name({ setIsHer, sfx }) {
  const [open, setOpen] = useState(true);
  const [unlockSfx] = useState(new Audio(sfxUnlock));
  const [lockSfx] = useState(new Audio(sfxLock));

  const onSubmit = (e) => {
    e.preventDefault();
    setOpen(false);

    const name = e.target.name.value.toLowerCase();

    let is = false;
    if (name === 'dydy' || name === 'wendy') {
      is = true;
      unlockSfx.play();
      unlockSfx.volume = sfx / 100;
    } else {
      lockSfx.play();
      lockSfx.volume = sfx / 100;
    }

    const existingNames = JSON.parse(localStorage.getItem('d1d1-names') || '[]');
    if (!existingNames.includes(name)) {
      existingNames.push(name);
      localStorage.setItem('d1d1-names', JSON.stringify(existingNames));
    }

    setIsHer({ is });
  }

  return (
    <Dialog open={open} fullWidth component='form' autoComplete='off' onSubmit={onSubmit}>
      <DialogTitle>Dime tu nombre</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Solo el nombre, no necesito más...
        </DialogContentText>
        <TextField autoFocus fullWidth size='small' variant='standard' id='name' />
      </DialogContent>
      <DialogActions>
          <Button type='submit'>
            Listo
          </Button>
        </DialogActions>
    </Dialog>
  )
}
