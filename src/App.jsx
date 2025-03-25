import { useState } from "react";
import MenuBox from "./menu/MenuBox";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Name from "./components/Name";
import Dydy from "./components/Dydy";
import useThemeConf from "./hooks/useThemeConf";
import SiBox from "./si/SiBox";

import musIntro from "./music/mus_intro.mp3";
import sfxButton from "./music/sfx_buttons.wav";
import NoBox from "./no/NoBox";

function App() {
  const themeConfig = useThemeConf();
  const [view, setView] = useState("menu");
  const [isHer, setIsHer] = useState(false);
  const [mainSong] = useState(new Audio(musIntro));
  const [buttonSfx] = useState(new Audio(sfxButton));
  const [volume, setVolume] = useState(10);
  const [sfx, setSfx] = useState(10);
  const [audioInitialized, setAudioInitialized] = useState(false);

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
          <button onClick={initializeAudio}>Play</button>
        </div>
      )}
      {audioInitialized && (
        <>
          DEBUG: {view}
          {view === "menu" && <MenuBox setView={setView} buttonSfx={buttonSfx} mainSong={mainSong} />}
          {view === "si" && <SiBox volume={volume} sfx={sfx} />}
          {view === "no" && <NoBox volume={volume} sfx={sfx} />}
          <Name setIsHer={setIsHer} sfx={sfx} />
          <Dydy isHer={isHer} handleVolumeChange={handleVolumeChange} volume={volume} handleSfxChange={handleSfxChange} sfx={sfx} />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
