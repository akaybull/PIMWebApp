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
import {
  Dashboard,
  ChevronLeft,
  ExpandMore,
  ProductionQuantityLimits,
  Category,
  Label,
  BrandingWatermark,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../redux/features/settingsSlice";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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

  const menuItems = [
    {
      text: "Yönetim Paneli",
      icon: <Dashboard />,
      path: "/dashboard",
      mainPath: "/dashboard",
    },
    {
      text: "Katalog",
      icon: <Category />,
      path: "/catalog",
      mainPath: "/catalog",
      submenu: [
        {
          text: "Kategori",
          icon: <Category />,
          path: "/categories",
          mainPath: "/catalog",
        },
        {
          text: "Markalar",
          icon: <BrandingWatermark />,
          path: "/brands",
          mainPath: "/catalog",
        },
        {
          text: "Ürünler",
          icon: <ProductionQuantityLimits />,
          path: "/products",
          mainPath: "/catalog",
        },
        {
          text: "Ürün Etiketleri",
          icon: <Label />,
          path: "/product-tags",
          mainPath: "/catalog",
        },
      ],
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
          transition: theme.transitions.create(["width", "opacity", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: "1s",
          }),
        },
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
            src={
              "https://testteknik.saatbayi.com/assets/saatteknik-logo-DIJS7vep.png"
            }
            alt="Saat Teknik Logo"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        )}
        <IconButton
          onClick={handleCollapseToggle}
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.3s ease-in-out",
            transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronLeft />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menuItems.map((item) => {
          return (
            <div key={item.text}>
              <ListItem
                key={item.text}
                onClick={() =>
                  item.submenu
                    ? setOpenSubmenu((prev) =>
                        prev !== item.path ? item.path : null
                      )
                    : navigate(item.path)
                }
                sx={() => ({
                  width: "auto",
                  marginX: "8px",
                  borderRadius: "8px",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  bgcolor:
                    location.pathname === item.path
                      ? "action.selected"
                      : "transparent",
                  "&:hover": {
                    cursor: "pointer",
                    bgcolor: "action.hover",
                  },
                  transition: "background-color 0.2s",
                })}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isCollapsed ? "auto" : 40,
                  }}
                >
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
                  in={openSubmenu == item.path}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem) => (
                      <ListItem
                        key={subItem.text}
                        onClick={() => navigate(subItem.path)}
                        sx={() => ({
                          width: "auto",
                          marginLeft: "24px",
                          marginRight: "8px",
                          borderRadius: "8px",
                          justifyContent: isCollapsed ? "center" : "flex-start",
                          bgcolor:
                            location.pathname === subItem.path
                              ? "action.selected"
                              : "transparent",
                          "&:hover": {
                            cursor: "pointer",
                            bgcolor: "action.hover",
                          },
                          transition: "background-color 0.2s",
                        })}
                      >
                        <ListItemIcon
                          sx={{
                            color:
                              location.pathname === item.path
                                ? "common.white"
                                : "text.primary",
                            transition: "color 0.2s",
                            minWidth: isCollapsed ? "auto" : 40,
                          }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        {!isCollapsed && (
                          <ListItemText primary={subItem.text} />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isOpenMobileMenu}
        onClose={() => dispatch(toggleMobileMenu())}
        ModalProps={{
          keepMounted: true,
        }}
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
    </>
  );
};

export default Sidebar;
