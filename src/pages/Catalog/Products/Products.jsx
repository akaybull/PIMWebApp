import PageLayout from "../../../components/PageLayout";
import { Button } from "@mui/material";
import { Delete, FileDownload, FileUpload } from "@mui/icons-material";

const Products = () => {
  return (
    <PageLayout title={"ÜRÜNLER"}>
      <div className="flex justify-end items-center h-16">
        <div className="flex gap-2">
          <Button
            startIcon={<FileDownload />}
            variant="contained"
            color="success"
          >
            Dışa Aktar
          </Button>
          <Button
            startIcon={<FileUpload />}
            variant="contained"
            color="secondary"
          >
            İçe Aktar
          </Button>
          <Button startIcon={<Delete />} variant="contained" color="error">
            SİL (SEÇİLENLERİ)
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Products;
