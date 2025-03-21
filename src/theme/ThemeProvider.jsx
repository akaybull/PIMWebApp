import { useState, useMemo, useEffect } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import Cookies from "js-cookie";
import { ColorModeContext } from "../context/ColorModeContext";
import { trTR } from "@mui/x-data-grid/locales";
import { trTR as coreTrTR } from "@mui/material/locale";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return Cookies.get("theme") || "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          Cookies.set("theme", newMode, { expires: 30 });
          return newMode;
        });
      },
    }),
    []
  );

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setMode(savedTheme);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
            ...(mode === "light"
              ? {
                  primary: {
                    main: "#1976d2",
                  },
                  background: {
                    default: "#f5f5f5",
                    paper: "#ffffff",
                  },
                }
              : {
                  primary: {
                    main: "#90caf9",
                  },
                  background: {
                    default: "#121212",
                    paper: "#1e1e1e",
                  },
                }),
          },
        },
        trTR,
        coreTrTR
      ),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};
