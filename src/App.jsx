import { useEffect, useState } from "react";
import MenuBox from "./menu/MenuBox";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Name from "./components/Name";
import Dydy from "./components/Dydy";
import useThemeConf from "./hooks/useThemeConf";

import musIntro from "./music/mus_intro.mp3";
import sfxButton from "./music/sfx_buttons.wav";

function App() {
  const themeConfig = useThemeConf();
  const [view, setView] = useState("menu");
  const [isHer, setIsHer] = useState(false);
  const [mainSong] = useState(new Audio(musIntro));
  const [buttonSfx] = useState(new Audio(sfxButton));
  const [volume, setVolume] = useState(50);
  const [sfx, setSfx] = useState(50);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    mainSong.volume = newValue / 100;
  };

  const handleSfxChange = (event, newValue) => {
    setSfx(newValue);
    buttonSfx.play();
    buttonSfx.volume = newValue / 100;
  };

  useEffect(() => {
    mainSong.loop = true;
    mainSong.volume = volume / 100; // Ajusta el volumen inicial
    mainSong.play();
  }, [])

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      {view === "menu" && <MenuBox setView={setView} />}
      <Name setIsHer={setIsHer} />
      <Dydy isHer={isHer} handleVolumeChange={handleVolumeChange} volume={volume} handleSfxChange={handleSfxChange} sfx={sfx} />
    </ThemeProvider>
  );
}

export default App;
