import React, { useEffect, useState } from 'react'
import Pj from '../components/Pj'

export default function Dialogs({ sfx, collisionCount }) {
  const [nextText, setNextText] = useState(false);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [textos, setTextos] = useState([
    "Entendible, pero aún así, no estoy conforme.",
    ". . Juguemos un rato.",
  ]);

  useEffect(() => {
    if (collisionCount === 30) {
      setTextos([
        '¿Cansado? Tranqui, ya casi acabo.'
      ]);
      setCurrentDialog(0);
    } else if (collisionCount >= 102) {
      localStorage.setItem("d1d1-no", JSON.stringify("completed"));
      setTextos([
        'Creo que ya fue suficiente...',
        'Sin resentimientos.',
        'Ya no queda más nada que hacer por aquí, puedes irte.',
        '...',
        '¿Aún sigues ahí? Sabes que ya te puedes ir, ¿no?',
        'Bueno, tendré que hacerlo yo.',
      ]);
      setCurrentDialog(0);

      setTimeout(() => {
        window.location.reload();
      }, 44000);
    }

  }, [collisionCount]);
  
  useEffect(() => {
      const changeText = async () => {
        await new Promise((resolve) =>
          setTimeout(() => {
            setNextText(false);
            setCurrentDialog((prev) => prev + 1);
            resolve();
          }, 2500)
        );
      };
  
      if (nextText) {
        changeText();
      }
    }, [nextText]);

  return (
    <Pj text={textos[currentDialog]} setNextText={setNextText} sfx={sfx} />
  )
}
