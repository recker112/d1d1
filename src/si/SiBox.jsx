import React, { useEffect, useRef, useState } from "react";
import { Box, Grow } from "@mui/material";

import musDydy from "../music/mus_dydy.wav";
import assetFlor from "../assets/flor.svg";
import Pj from "../components/Pj";

export default function SiBox({ volume, sfx }) {
  const [dydySong] = useState(new Audio(musDydy));
  const [nextText, setNextText] = useState(false);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 50,
  });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const changeText = async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          console.log("NEXT");
          setNextText(false);
          setCurrentDialog((prev) => prev + 1);
          resolve();
        }, 2500)
      );
    };

    if (nextText) {
      console.log("Texto terminado.");
      changeText();
    }
  }, [nextText]);

  const textos = [
    "Vaya, no me esperaba esa respuesta. ¿Quién lo diría? De algo sirvió resarle a esos cuadros.",
    "¿Sabes la diferencia entre un duende y tú? Verga... Era hobbit. JA JA JA.",
    "Solo bromeo, mira, dijiste que siempre eras espectadora, ¿verdad?",
    "Deja que busque un momento...",
    "¡Lo encontré!",
    "Es una flor amarilla directamente de Hogwarts. Para ser más especifico, del episodio 2...",
    "¿No me crees? Yo tampoco, pero está bonita, ¿no?",
    "",
  ];

  useEffect(() => {
    dydySong.play();

    dydySong.volume = volume / 100;

    dydySong.onended = () => {
      alert("Finish");

      dydySong.play();
      dydySong.loop = true;
    };

    return () => {
      dydySong.pause();
    };
  }, []);

  const handleMouseDown = (e) => {
    dragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (dragging.current) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Pj text={textos[currentDialog]} setNextText={setNextText} sfx={sfx} />
      {currentDialog > 4 && (
        <Grow in>
          <Box
            onMouseDown={handleMouseDown}
            sx={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: "100px",
              height: "100px",
              backgroundColor: "lightgrey",
              cursor: "move",
              userSelect: "none",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0)",
                zIndex: 1,
              }
            }}
          >
            <img src={assetFlor} style={{ userSelect: "none" }} />
          </Box>
        </Grow>
      )}
    </Box>
  );
}
