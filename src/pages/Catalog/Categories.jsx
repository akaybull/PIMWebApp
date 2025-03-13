import React from "react";
import PageLayout from "../../components/PageLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Add,
  CloudUpload,
  Delete,
  ExpandMore,
  FileDownload,
  FileUpload,
  KeyboardArrowDown,
  Search,
} from "@mui/icons-material";
import CustomModal from "../../components/CustomModal";
import CategoriesTable from "./CategoriesTable";
import CatagoryCreate from "./CatagoryCreate";

const StyledMenuItem = styled(MenuItem)`
  font-size: 0.75rem;
  padding: 8px 16px;
`;
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
const Categories = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = React.useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = React.useState(false);
  const [createOpenModal, setCreateOpenModal] = React.useState(false);
  const [isPublished, setIsPublished] = React.useState(1);
  const [files, setFiles] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePublishedChange = (event) => {
    setIsPublished(event.target.value);
  };

  return (
    <PageLayout>
      <div className="flex justify-between items-center flex-wrap">
        <Typography variant="h5">KATEGORİLER</Typography>
        <div className="flex gap-2 flex-wrap">
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setCreateOpenModal(true)}
          >
            Yeni Ekle
          </Button>
          {/* <Button
            startIcon={<FileDownload />}
            endIcon={<KeyboardArrowDown />}
            variant="contained"
            color="success"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dışa Aktar
          </Button>
          <Menu
            id="basic-menu"
            elevation={0}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <StyledMenuItem onClick={handleClose}>
              XML'e Aktar(Tümü)
            </StyledMenuItem>
            <StyledMenuItem onClick={handleClose}>
              XML'e Aktar (Seçili)
            </StyledMenuItem>
            <Divider />
            <StyledMenuItem onClick={handleClose}>
              Excel'e Aktar (Tümü)
            </StyledMenuItem>
            <StyledMenuItem onClick={handleClose}>
              Excel'e Aktar (Seçili)
            </StyledMenuItem>
          </Menu> */}
          <Button
            startIcon={<FileUpload />}
            variant="contained"
            color="secondary"
            onClick={() => setOpenModal(true)}
          >
            İçe Aktar
          </Button>
          <Button
            startIcon={<Delete />}
            variant="contained"
            color="error"
            onClick={() => setDeleteOpenModal(true)}
          >
            SİL (SEÇİLENLERİ)
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
                label="Kategori Adı"
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
        open={createOpenModal}
        setOpen={setCreateOpenModal}
        maxWidth="xl"
        title="Kategori Ekle"
        content={<CatagoryCreate />}
        actions={
          <div className="flex gap-2 justify-end items-center">
            <Button variant="contained">Kaydet</Button>
            <Button variant="contained" color="error">
              Kaydet ve Düzenlemeye Devam Et
            </Button>
          </div>
        }
      />
      <CustomModal
        open={deleteOpenModal}
        setOpen={setDeleteOpenModal}
        maxWidth="xs"
        title="Emin misiniz?"
        content={
          <div className="flex flex-col gap-1">
            <Typography>
              Bu işlemi gerçekleştirmek istediğinizden emin misiniz?
            </Typography>
          </div>
        }
        actions={
          <div className="flex gap-2 justify-end items-center">
            <Button variant="contained">Evet</Button>
            <Button variant="contained" color="error">
              Hayır, iptal et
            </Button>
          </div>
        }
      />
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

export default Categories;
