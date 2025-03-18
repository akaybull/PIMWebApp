import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.mode === "dark" ? "#333" : "#ffff",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
}));

const CustomModal = ({
  open,
  setOpen,
  title,
  content,
  actions,
  maxWidth = "md",
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CustomDialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth={maxWidth}
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
      disableEscapeKeyDown
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        })}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </CustomDialog>
  );
};

export default CustomModal;
