import { createTheme } from '@mui/material';
import React, { useMemo } from 'react'

export default function useThemeConf() {
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
            paper: "#111111",
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
  return themeConfig;
}
