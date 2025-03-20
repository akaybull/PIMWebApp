import { Fragment, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  useTheme,
  IconButton,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import { ChevronLeft, ExpandMore } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../redux/features/settingsSlice";

const drawerWidth = 240;

const Sidebar = ({ menuItems }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isOpenMobileMenu = useSelector(
    (state) => state.settings.isOpenMobileMenu
  );

  const [isCollapsed, setIsCollapsed] = useState(() => {
    return Cookies.get("isCollapsed") === "true";
  });

  const [openSubmenu, setOpenSubmenu] = useState("/catalog");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    Cookies.set("isCollapsed", newCollapsedState, { expires: 30 });
    setIsCollapsed(newCollapsedState);
  };

  const drawerContent = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          alignItems: "center",
          display: "flex",
          justifyContent: isCollapsed ? "center" : "space-between",
        }}
      >
        {!isCollapsed && (
          <img
            src="/logo.png"
            alt="Saat Teknik Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
        <IconButton
          onClick={handleCollapseToggle}
          sx={{
            transition: "transform 0.3s ease-in-out",
            transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronLeft />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <Fragment key={item.text}>
            <ListItem
              to={item.path}
              component={item.submenu ? undefined : NavLink}
              onClick={() =>
                item.submenu
                  ? setOpenSubmenu((prev) =>
                      prev !== item.path ? item.path : null
                    )
                  : null
              }
              sx={{
                width: "auto",
                mx: "8px",
                borderRadius: "8px",
                justifyContent: isCollapsed ? "center" : "flex-start",
                "&.active": {
                  bgcolor: "action.selected",
                  fontWeight: "bold",
                },
                "&:hover": { cursor: "pointer", bgcolor: "action.hover" },
                transition: "background-color 0.2s",
              }}
            >
              <ListItemIcon sx={{ minWidth: isCollapsed ? "auto" : 40 }}>
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
              {item.submenu && (
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.3s ease-in-out",
                    transform:
                      openSubmenu === item.path
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                >
                  <ExpandMore />
                </Box>
              )}
            </ListItem>

            {item.submenu && (
              <Collapse
                in={openSubmenu === item.path}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem
                      key={subItem.text}
                      component={NavLink}
                      to={subItem.path}
                      sx={{
                        width: "auto",
                        ml: "24px",
                        mr: "8px",
                        borderRadius: "8px",
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        "&.active": {
                          bgcolor: "action.selected",
                          fontWeight: "bold",
                        },
                        "&:hover": {
                          cursor: "pointer",
                          bgcolor: "action.hover",
                        },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <ListItemIcon
                        sx={{ minWidth: isCollapsed ? "auto" : 40 }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                      {!isCollapsed && <ListItemText primary={subItem.text} />}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isOpenMobileMenu}
      onClose={() => dispatch(toggleMobileMenu())}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: isCollapsed ? 80 : drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create(["width"], {
          easing: theme.transitions.easing.sharp,
          duration: "0.3s",
        }),
        "& .MuiDrawer-paper": {
          width: isCollapsed ? 80 : drawerWidth,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: "0.3s",
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
