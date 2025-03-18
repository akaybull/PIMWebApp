import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";

const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Tooltip
      title={
        theme.palette.mode === "dark"
          ? "Aydınlık Moda Geç"
          : "Karanlık Moda Geç"
      }
      placement="bottom"
    >
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        sx={{
          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? "action.selected"
                : "action.hover",
          },
        }}
      >
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
