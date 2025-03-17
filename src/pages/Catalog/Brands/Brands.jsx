import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore, Search } from "@mui/icons-material";
import CategoriesTable from "../CategoriesTable";

import PageLayout from "../../../components/PageLayout";

const Brands = () => {
  const [isPublished, setIsPublished] = React.useState(1);

  const handlePublishedChange = (event) => {
    setIsPublished(event.target.value);
  };

  return (
    <PageLayout>
      <div className="flex items-center h-16">
        <Typography variant="h5">MARKALAR</Typography>
      </div>
      <div className="flex flex-col mt-4 gap-y-4">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className="flex items-center gap-2">
              <Search />
              <Typography component="span">Ara</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex w-full gap-2">
              <TextField
                variant="outlined"
                size="small"
                label="Üretici Adı"
                className="w-1/2"
              />
              <FormControl className="w-1/2">
                <InputLabel id="demo-simple-select-label">
                  Yayınlandı
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isPublished}
                  label="Yayınlandı"
                  onChange={handlePublishedChange}
                  size="small"
                >
                  <MenuItem value={1}>Tümü</MenuItem>
                  <MenuItem value={2}>Sadece Yayınlananlar</MenuItem>
                  <MenuItem value={3}>Sadece Yayınlanmayanlar</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" endIcon={<Search />}>
                Ara
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <CategoriesTable />
      </div>
    </PageLayout>
  );
};

export default Brands;
