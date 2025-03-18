import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  ListItemIcon,
  Avatar,
  Divider,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";
import { Logout, Menu, Settings } from "@mui/icons-material";
import { toggleMobileMenu } from "../redux/features/settingsSlice";

const PageLayout = ({ children, title }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [lang, setLang] = useState("tr");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettingsDrawer = (open) => {
    setSettingsOpen(open);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => dispatch(toggleMobileMenu())}
              >
                <Menu />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>

            <IconButton
              color="inherit"
              onClick={() => toggleSettingsDrawer(true)}
            >
              <Settings />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={settingsOpen}
          onClose={() => toggleSettingsDrawer(false)}
        >
          <Box
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Avatar sx={{ width: 80, height: 80, margin: "auto" }}>AB</Avatar>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Akay Bul
              </Typography>
              <Typography variant="body2" color="textSecondary">
                akaybul@saatvesaat.com
              </Typography>
            </Box>

            <Divider />

            <List
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItem>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    displayEmpty
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="tr">Türkçe</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>

            <Box sx={{ p: 2 }}>
              <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                <ThemeToggle />
              </ListItem>
              <Tooltip title="Çıkış Yap" placement="top">
                <ListItem
                  onClick={handleLogout}
                  sx={(theme) => ({
                    borderRadius: 1,
                    justifyContent: "flex-start",
                    transition: "all 0.2s",
                    "&:hover": {
                      cursor: "pointer",
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "error.dark"
                          : "error.light",
                      color: "common.white",
                      "& .MuiListItemIcon-root": {
                        color: "common.white",
                      },
                    },
                  })}
                >
                  <ListItemIcon sx={{ minWidth: "auto" }}>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Çıkış Yap" />
                </ListItem>
              </Tooltip>
            </Box>
          </Box>
        </Drawer>

        <div className="p-3">{children}</div>
      </Box>
    </Box>
  );
};

export default PageLayout;
