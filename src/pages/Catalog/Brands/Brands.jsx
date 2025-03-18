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
  styled,
} from "@mui/material";
import {
  Add,
  CloudUpload,
  ExpandMore,
  FileUpload,
  Search,
} from "@mui/icons-material";
import CategoriesTable from "../CategoriesTable";
import PageLayout from "../../../components/PageLayout";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { useState } from "react";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Brands = () => {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState([]);

  const handlePublishedChange = (event) => {
    setIsPublished(event.target.value);
  };

  return (
    <PageLayout title={"MARKALAR"}>
      <div className="flex h-16 justify-end items-center flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate("/brands/create")}
          >
            Yeni Ekle
          </Button>
          <Button
            startIcon={<FileUpload />}
            variant="contained"
            color="secondary"
            onClick={() => setOpenModal(true)}
          >
            İçe Aktar
          </Button>
        </div>
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
                label="Marka Adı"
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
      <CustomModal
        open={openModal}
        setOpen={setOpenModal}
        maxWidth="sm"
        title="Excel'den içe aktar"
        content={
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle2" fontStyle={"italic"}>
              İçe aktarılan ürünler SKU ile ayırt edilir. SKU zaten mevcutsa,
              ilgili ürün güncellenecektir.
            </Typography>
            <Typography variant="subtitle2" fontStyle={"italic"}>
              İçe aktarma, çok fazla bellek kaynağı gerektirir. Bu nedenle, aynı
              anda 500 - 1.000'den fazla kaydı içe aktarmanız önerilmez. Daha
              fazla kaydınız varsa, bunları birden çok Excel dosyasına bölmek ve
              ayrı ayrı içe aktarmak daha iyi olur.
            </Typography>
            <div className="flex items-center gap-2">
              <Typography fontSize={"14px"} fontWeight={"bold"}>
                Excel Dosyası:
              </Typography>

              <div className="p-1 border flex flex-1 items-center gap-2">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Dosya Seç
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => setFiles(event.target.files)}
                    multiple
                  />
                </Button>
                <Typography fontSize={"14px"}>{files[0]?.name}</Typography>
              </div>
            </div>
          </div>
        }
        actions={
          <>
            <Button variant="contained">Excel'den İçe Aktar</Button>
          </>
        }
      />
    </PageLayout>
  );
};

export default Brands;
