import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

import sfxReckerVoice from "../music/sfx_recker_voice.wav";

export default function Pj({ text, sfx, setNextText }) {
  const [displayedText, setDisplayedText] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let i = 0;

    const displayText = async () => {
      if (i < text.length) {
        const letraActual = text[i];

        setDisplayedText(text.slice(0, i + 1));

        if (letraActual === ",") {
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else if (letraActual === ".") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else if (letraActual === "?") {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else if (letraActual === ":") {
          await new Promise((resolve) => setTimeout(resolve, 700));
        } else if (letraActual === "!") {
          await new Promise((resolve) => setTimeout(resolve, 700));
        } else if (letraActual !== " ") {
          const reckerVoiceSfx = new Audio(sfxReckerVoice);
          reckerVoiceSfx.play();
          reckerVoiceSfx.volume = sfx / 100;
        }

        i++;
        setTimeout(displayText, 70);
      } else {
        setNextText(true);
      }
    };

    displayText();
  }, [text]);

  useEffect(() => {
    hasRun.current = false;
  }, [text]);

  return (
    <div>
      <Tooltip
        open={true}
        title={text ? <Box textAlign='center' p={1.5}>{displayedText}</Box> : null}
        placement="left-start"
        arrow
      >
        Recker
      </Tooltip>
    </div>
  );
}
