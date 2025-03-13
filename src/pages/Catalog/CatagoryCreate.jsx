import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Box,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { Label } from "@mui/icons-material";

// Bayrak Bileşenleri
const UKFlag = (props) => (
  <SvgIcon {...props}>
    <image
      href="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
      width="24"
      height="24"
    />
  </SvgIcon>
);
const TRFlag = (props) => (
  <SvgIcon {...props}>
    <image
      href="https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
      width="24"
      height="24"
    />
  </SvgIcon>
);
const ITFlag = (props) => (
  <SvgIcon {...props}>
    <image
      href="https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
      width="24"
      height="24"
    />
  </SvgIcon>
);
const RUFlag = (props) => (
  <SvgIcon {...props}>
    <image
      href="https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg"
      width="24"
      height="24"
    />
  </SvgIcon>
);

// TabPanel Bileşeni
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: "45px" }}>{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

// Ana Bileşen
const CategoryCreate = () => {
  const theme = useTheme();
  const [editorValue, setEditorValue] = React.useState("");

  const handleChange = (value) => {
    setEditorValue(value); // Değerin doğru şekilde güncellendiğinden emin olun
  };
  const [value, setValue] = React.useState(0);

  const handleChangee = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ bgcolor: "background.paper", position: "relative", minHeight: 300 }}
    >
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">Kategori Bilgisi</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              sx={{ minHeight: 50 }}
              onChange={handleChangee}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Standart" {...a11yProps(0)} />
              <Tab
                label="EN"
                iconPosition="start"
                icon={<UKFlag />}
                sx={{ minHeight: 50, fontSize: 14 }}
                {...a11yProps(1)}
              />
              <Tab
                label="TR"
                iconPosition="start"
                icon={<TRFlag />}
                sx={{ minHeight: 50, fontSize: 14 }}
                {...a11yProps(2)}
              />
              <Tab
                label="IT"
                iconPosition="start"
                icon={<ITFlag />}
                sx={{ minHeight: 50, fontSize: 14 }}
                {...a11yProps(3)}
              />
              <Tab
                label="RU"
                iconPosition="start"
                icon={<RUFlag />}
                sx={{ minHeight: 50, fontSize: 14 }}
                {...a11yProps(4)}
              />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0} dir={theme.direction}>
            <TextField
              variant="outlined"
              size="small"
              label="Kategori Adı"
              className="w-1/2"
            />
            <Label>Açıklama</Label>
            {/* <ReactQuill value={editorValue || ""} onChange={handleChange} /> */}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            EN İçeriği
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            TR İçeriği
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            IT İçeriği
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            RU İçeriği
          </TabPanel>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CategoryCreate;
