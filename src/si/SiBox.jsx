import React, { useEffect, useRef, useState } from "react";
import { Box, Grow } from "@mui/material";
import Pj from "../components/Pj";  

import musDydy from "../music/mus_dydy.wav";
import assetFlor from "../assets/flor.png";

export default function SiBox({ volume, sfx }) {
  const [dydySong] = useState(new Audio(musDydy));
  const [nextText, setNextText] = useState(false);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [position1, setPosition1] = useState({
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 50,
  });
  const [position2, setPosition2] = useState({
    x: window.innerWidth / 2 + 50,
    y: window.innerHeight / 2 - 50,
  });
  const dragging1 = useRef(false);
  const dragging2 = useRef(false);
  const dragStart1 = useRef({ x: 0, y: 0 });
  const dragStart2 = useRef({ x: 0, y: 0 });

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
    "Me constó hacerla ya que no dibujo media verga.",
    "Me inspiré en una flor amarilla directamente de Hogwarts. Para ser más especifico, del episodio 2...",
    "¿No me crees? Yo tampoco, pero está bonita, ¿no? (si me quedó fea ajajaajja)",
    "¡Disfruta! No todos los días se regalan flores. Pero siempre se puede regalar algo.",
    "Toma otra, porque puedo.",
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

  const handleMouseDown1 = (e) => {
    dragging1.current = true;
    dragStart1.current = {
      x: e.clientX - position1.x,
      y: e.clientY - position1.y,
    };
  };

  const handleMouseMove1 = (e) => {
    if (dragging1.current) {
      setPosition1({
        x: e.clientX - dragStart1.current.x,
        y: e.clientY - dragStart1.current.y,
      });
    }
  };

  const handleMouseUp1 = () => {
    dragging1.current = false;
  };

  const handleMouseDown2 = (e) => {
    dragging2.current = true;
    dragStart2.current = {
      x: e.clientX - position2.x,
      y: e.clientY - position2.y,
    };
  };

  const handleMouseMove2 = (e) => {
    if (dragging2.current) {
      setPosition2({
        x: e.clientX - dragStart2.current.x,
        y: e.clientY - dragStart2.current.y,
      });
    }
  };

  const handleMouseUp2 = () => {
    dragging2.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove1);
    window.addEventListener("mouseup", handleMouseUp1);
    window.addEventListener("mousemove", handleMouseMove2);
    window.addEventListener("mouseup", handleMouseUp2);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove1);
      window.removeEventListener("mouseup", handleMouseUp1);
      window.removeEventListener("mousemove", handleMouseMove2);
      window.removeEventListener("mouseup", handleMouseUp2);
    };
  }, []);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Pj text={textos[currentDialog]} setNextText={setNextText} sfx={sfx} />
      {currentDialog >= 4 && (
        <Grow in>
          <Box>
            {currentDialog > 4 && (
              <Box
                onMouseDown={handleMouseDown1}
                sx={{
                  position: "absolute",
                  left: `${position1.x}px`,
                  top: `${position1.y}px`,
                  width: "100px",
                  height: "100px",
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
                  },
                }}
              >
                <img
                  src={assetFlor}
                  style={{ width: "100%", height: "100%" }}
                  alt="Flor 1"
                />
              </Box>
            )}
            {currentDialog > 8 && (
              <Box
                onMouseDown={handleMouseDown2}
                sx={{
                  position: "absolute",
                  left: `${position2.x}px`,
                  top: `${position2.y}px`,
                  width: "100px",
                  height: "100px",
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
                  },
                }}
              >
                <img
                  src={assetFlor}
                  style={{ width: "100%", height: "100%" }}
                  alt="Flor 2"
                />
              </Box>
            )}
          </Box>
        </Grow>
      )}
    </Box>
  );
}
