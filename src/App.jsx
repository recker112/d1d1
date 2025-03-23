import { useMemo, useState } from "react";
import MenuBox from "./menu/MenuBox";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Name from "./components/Name";
import Dydy from "./components/Dydy";

function App() {
  const [view, setView] = useState("menu");
  const [isHer, setIsHer] = useState(false);

  const themeConfig = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["SF Pixelate", "sans-serif", "Noto Color Emoji"].join(
            ","
          ),
        },
        palette: {
          mode: "dark",
          primary: {
            main: "#FFC107", // Amarillo
          },
          secondary: {
            main: "#c41826", // Rojo que combina con amarillo
          },
          background: {
            default: "#000", // Fondo negro
            paper: "#1c1c1c",
          },
          text: {
            primary: "#fff",
            secondary: "#a0a2a6",
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiStepIcon: {
            styleOverrides: {
              root: {
                fontSize: "30px",
              },
            },
          },
          MuiStepConnector: {
            styleOverrides: {
              root: {
                marginLeft: "15px",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                textTransform: "none",
                fontSize: 16,
                lineHeight: 1.5,
                fontFamily: ["SF Pixelate", "sans-serif"].join(","),
                "&:hover": {
                  boxShadow: "none",
                },
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      {view === "menu" && <MenuBox setView={setView} />}
      <Name setIsHer={setIsHer} />
      <Dydy isHer={isHer} />
    </ThemeProvider>
  );
}

export default App;
