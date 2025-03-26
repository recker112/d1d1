import React, { useEffect, useRef, useState } from "react";

import musMadness from "../music/mus_madness.wav";
import musPreMadness from "../music/mus_madness_pre.wav";
import sfxDamage from "../music/sfx_damage.wav";
import sfxHealth from "../music/sfx_health.wav";
import { Box } from "@mui/material";
import Dialogs from "./Dialogs";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function NoBox({ volume, sfx }) {
  const [madnessSong] = useState(new Audio(musMadness));
  const [introSong] = useState(new Audio(musPreMadness));
  const [damageSfx] = useState(new Audio(sfxDamage));
  const [healthSfx] = useState(new Audio(sfxHealth));
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [circles, setCircles] = useState([]);
  const [collisionCount, setCollisionCount] = useState(0);
  const containerRef = useRef(null);
  const arrowRef = useRef(null);
  const intervalRef = useRef(null);
  const keysPressed = useRef({});
  const [gameStop, setGameStop] = useState(false);

  const handleStop = () => {
    setGameStop(true);
  }

  useEffect(() => {
    // Generar círculos aleatorios
    const generateCircles = () => {
      const newCircles = [];
      for (let i = 0; i < 10; i++) {
        newCircles.push({
          id: i,
          top: Math.random() * 90,
          left: Math.random() * 90,
          color: "red",
          type: i < 2 ? "chaser" : "random", // 20% persiguen a la X, el resto se mueven aleatoriamente
        });
      }
      // Añadir un círculo especial
      newCircles.push({
        id: 10,
        top: Math.random() * 90,
        left: Math.random() * 90,
        color: "green",
        type: "special",
      });
      setCircles(newCircles);
    };

    setTimeout(generateCircles, 12000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current[event.key] = true;
      if (!intervalRef.current) {
        intervalRef.current = setInterval(move, 16); // Aproximadamente 60 FPS
      }
    };

    const handleKeyUp = (event) => {
      keysPressed.current[event.key] = false;
      if (!Object.values(keysPressed.current).includes(true)) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const move = () => {
      if (!containerRef.current || !arrowRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const arrowRect = arrowRef.current.getBoundingClientRect();

      let newTop = position.top;
      let newLeft = position.left;

      if (keysPressed.current["w"] && !keysPressed.current["s"]) {
        newTop = Math.max(0, position.top - 1);
      }
      if (keysPressed.current["s"] && !keysPressed.current["w"]) {
        newTop = Math.min(
          100 - (arrowRect.height / containerRect.height) * 100,
          position.top + 1
        );
      }
      if (keysPressed.current["a"] && !keysPressed.current["d"]) {
        newLeft = Math.max(0, position.left - 1);
      }
      if (keysPressed.current["d"] && !keysPressed.current["a"]) {
        newLeft = Math.min(
          100 - (arrowRect.width / containerRect.width) * 100,
          position.left + 1
        );
      }

      setPosition({ top: newTop, left: newLeft });

      // Mover círculos y detectar colisiones
      let specialCircleExists = false;
      let removeChasers = false;
      const newCircles = circles
        .map((circle) => {
          let circleTop = circle.top;
          let circleLeft = circle.left;

          if (circle.type === "chaser") {
            // Mover el círculo hacia la X
            if (circleTop < newTop) {
              circleTop += 0.5;
            } else if (circleTop > newTop) {
              circleTop -= 0.5;
            }

            if (circleLeft < newLeft) {
              circleLeft += 0.5;
            } else if (circleLeft > newLeft) {
              circleLeft -= 0.5;
            }
          } else if (circle.type === "random") {
            // Movimiento aleatorio
            circleTop += (Math.random() - 0.5) * 2;
            circleLeft += (Math.random() - 0.5) * 2;

            // Asegurarse de que los círculos no se salgan del contenedor
            circleTop = Math.max(0, Math.min(90, circleTop));
            circleLeft = Math.max(0, Math.min(90, circleLeft));
          }

          // Ajustar el tamaño del rectángulo de colisión del círculo especial
          const circleRect =
            circle.type === "special"
              ? {
                  top:
                    (circleTop / 100) * containerRect.height +
                    containerRect.top -
                    5,
                  left:
                    (circleLeft / 100) * containerRect.width +
                    containerRect.left -
                    5,
                  right:
                    (circleLeft / 100) * containerRect.width +
                    containerRect.left +
                    25,
                  bottom:
                    (circleTop / 100) * containerRect.height +
                    containerRect.top +
                    25,
                }
              : {
                  top:
                    (circleTop / 100) * containerRect.height +
                    containerRect.top +
                    2,
                  left:
                    (circleLeft / 100) * containerRect.width +
                    containerRect.left +
                    2,
                  right:
                    (circleLeft / 100) * containerRect.width +
                    containerRect.left +
                    18,
                  bottom:
                    (circleTop / 100) * containerRect.height +
                    containerRect.top +
                    18,
                };

          // Reducir el tamaño del rectángulo de colisión de la X
          const smallArrowRect = {
            top: arrowRect.top + 5,
            left: arrowRect.left + 5,
            right: arrowRect.right - 5,
            bottom: arrowRect.bottom - 5,
          };

          const isColliding = !(
            smallArrowRect.right < circleRect.left ||
            smallArrowRect.left > circleRect.right ||
            smallArrowRect.bottom < circleRect.top ||
            smallArrowRect.top > circleRect.bottom
          );

          if (isColliding) {
            if (circle.type === "special") {
              setCollisionCount((prevCount) =>
                prevCount > 3 ? prevCount - 3 : prevCount
              );
              healthSfx.play();
              healthSfx.volume = sfx / 100;

              // Señalar que se deben eliminar los círculos que persiguen
              removeChasers = true;
              return null;
            } else {
              setCollisionCount((prevCount) => prevCount + 3);
              damageSfx.play();
              damageSfx.volume = sfx / 100;

              // Generar una nueva bola en una posición aleatoria
              return {
                id: circle.id,
                top: Math.random() * 90,
                left: Math.random() * 90,
                color: circle.type === "special" ? "green" : "red",
                type: circle.type,
              };
            }
          }

          if (circle.type === "special") {
            specialCircleExists = true;
          }

          return {
            ...circle,
            top: circleTop,
            left: circleLeft,
          };
        })
        .filter((circle) => circle !== null);

      // Eliminar los círculos que persiguen si se tocó el círculo especial
      let finalCircles = removeChasers
        ? newCircles.filter((circle) => circle.type !== "chaser")
        : newCircles;

      // Generar nuevos círculos que persiguen si se eliminaron
      if (removeChasers) {
        for (let i = 0; i < 2; i++) {
          finalCircles.push({
            id: finalCircles.length,
            top: Math.random() * 90,
            left: Math.random() * 90,
            color: "red",
            type: "chaser",
          });
        }
      }

      // Si no existe un círculo especial, generar uno nuevo
      if (
        !specialCircleExists &&
        finalCircles.some((circle) => circle.type === "chaser")
      ) {
        finalCircles.push({
          id: finalCircles.length,
          top: Math.random() * 90,
          left: Math.random() * 90,
          color: "green",
          type: "special",
        });
      }

      setCircles(finalCircles);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Mover círculos continuamente
    const circleInterval = setInterval(() => {
      move();
    }, 16); // Aproximadamente 60 FPS

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearInterval(circleInterval);
    };
  }, [position, circles, gameStop]);

  useEffect(() => {
    // Reproducir el sonido de introducción
    introSong.play();
    introSong.volume = volume / 100;

    // Cuando el sonido de introducción termine, reproducir madnessSong en bucle
    introSong.onended = () => {
      setTimeout(() => {
        madnessSong.play();
        madnessSong.loop = true;
        madnessSong.volume = volume / 100;
      }, 2000);
    };

    return () => {
      introSong?.pause();
      madnessSong?.pause();
    };
  }, [introSong, madnessSong, volume]);

  useEffect(() => {
      if (!localStorage.getItem("d1d1-no")) {
        localStorage.setItem("d1d1-no", 'init');
      }
    }, []);

  return (
    <Box textAlign="center">
      Vida: {collisionCount - 100 > 0 ? 0 : 100 - collisionCount}
      <Dialogs sfx={sfx} collisionCount={collisionCount} handleStop={handleStop} />
      {collisionCount <= 99 && (
        <div
        ref={containerRef}
        style={{
          position: "relative",
          margin: "auto",
          width: "300px",
          height: "400px",
          marginTop: 170,
          border: "5px solid white",
        }}
      >
        <div
          ref={arrowRef}
          style={{
            position: "absolute",
            top: `${position.top}%`,
            left: `${position.left}%`,
            transition: "top 0.1s, left 0.1s",
            transform: "scale(1)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <FavoriteIcon color='secondary' />
        </div>
        {circles.map((circle) => (
          <div
            key={circle.id}
            style={{
              position: "absolute",
              top: `${circle.top}%`,
              left: `${circle.left}%`,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: circle.color,
            }}
          />
        ))}
      </div>
      )}
    </Box>
  );
}
