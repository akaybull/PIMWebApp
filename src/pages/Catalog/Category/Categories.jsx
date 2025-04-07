import { useState } from "react";
import PageLayout from "../../../components/PageLayout";
import { Button, Input, Typography } from "@mui/material";
import { Add, CloudUpload, Delete, FileUpload } from "@mui/icons-material";
import CustomModal from "../../../components/CustomModal";
import CatagoryCreate from "./CatagoryCreate";
import CategoriesTable from "./CategoriesTable";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [createOpenModal, setCreateOpenModal] = useState(false);
  const [files, setFiles] = useState([]);

  return (
    <PageLayout title={"KATEGORİLER"}>
      <div className="flex h-16 justify-end items-center flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate("/categories/create")}
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
                  <Input
                    sx={{ display: "none" }}
                    multiple
                    type="file"
                    onChange={(event) => setFiles(event.target.files)}
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
