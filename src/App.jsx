import { useEffect, useState } from "react";
import MenuBox from "./menu/MenuBox";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import Name from "./components/Name";
import Dydy from "./components/Dydy";
import useThemeConf from "./hooks/useThemeConf";
import SiBox from "./si/SiBox";

import musIntro from "./music/mus_intro.mp3";
import sfxButton from "./music/sfx_buttons.wav";
import { shakeText } from "./components/Textos";
import Intermediario from "./no/Intermediario";

function App() {
  const themeConfig = useThemeConf();
  const [view, setView] = useState("menu");
  const [isHer, setIsHer] = useState(false);
  const [mainSong] = useState(new Audio(musIntro));
  const [buttonSfx] = useState(new Audio(sfxButton));
  const [volume, setVolume] = useState(30);
  const [sfx, setSfx] = useState(30);
  const [audioInitialized, setAudioInitialized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    if (params.get("reset") === "true") {
      localStorage.clear();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    mainSong.volume = newValue / 100;
  };

  const handleSfxChange = (event, newValue) => {
    setSfx(newValue);
    buttonSfx.play();
    buttonSfx.volume = newValue / 100;
  };

  const initializeAudio = () => {
    mainSong.loop = true;
    mainSong.volume = volume / 100; // Ajusta el volumen inicial
    mainSong.play();
    setAudioInitialized(true);
  };

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      {!audioInitialized && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button color="secondary" onClick={initializeAudio}>{shakeText('Iniciar')}</Button>
        </div>
      )}
      {audioInitialized && (
        <>
          {view === "menu" && <MenuBox setView={setView} buttonSfx={buttonSfx} mainSong={mainSong} sfx={sfx} volume={volume} />}
          {view === "si" && <SiBox volume={volume} sfx={sfx} isHer={isHer} />}
          {view === "no" && <Intermediario volume={volume} sfx={sfx} isHer={isHer} />}
          <Name setIsHer={setIsHer} sfx={sfx} />
          <Dydy isHer={isHer} handleVolumeChange={handleVolumeChange} volume={volume} handleSfxChange={handleSfxChange} sfx={sfx} />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
