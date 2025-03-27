import React, { useEffect, useState } from 'react'
import Pj from '../components/Pj'

export default function DialogsEnd({ sfx }) {
  const [nextText, setNextText] = useState(false);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [textos] = useState([
    "La primera te la entiendo, ¿pero esta?",
    "Parece que no tienes corazón, con una era suficiente, ¿sabes?",
    "Ya los modales no existen en estos tiempos, tienen nulo aprecio por las cosas...",
    "Sabes que me acordaré de esto siempre, ¿verdad?",
    `Quién diría que ${JSON.parse(localStorage.getItem('d1d1-names'))[0]} diría que no... 2 veces...`,
    'Ese fue el primer nombre que intentaste, lástima que ya no valga de mucho...',
    JSON.parse(localStorage.getItem('d1d1-yes')) !== 'completed' ? 'Tranqui, ya entendí la indirecta, bloquearé todo lo demás. Ya no es necesario que lo veas.' : 'Ni te dignaste en ver la otra opción. Entonces no habrá problema si lo dejas así.',
  ]);

  useEffect(() => {
    if (currentDialog === 6 && nextText) {
      localStorage.setItem('d1d1-end', JSON.stringify("completed"));
      setTimeout(() => {
        window.location.reload();
      }, 4000)
    }

  }, [currentDialog, nextText]);
  
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
