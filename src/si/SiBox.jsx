import React, { useEffect, useState } from 'react'

import musDydy from "../music/mus_dydy.wav";

export default function SiBox({ volume }) {
  const [dydySong] = useState(new Audio(musDydy));

  useEffect(() => {
    dydySong.play();

    dydySong.loop = true
    dydySong.volume = volume / 100;
  }, []);

  return (
    <div>SiBox</div>
  )
}
