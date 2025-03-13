import React from "react";
import PageLayout from "../../components/PageLayout";
import { Button, Typography } from "@mui/material";
import { Add, Delete, FileDownload, FileUpload } from "@mui/icons-material";

const Products = () => {
  return (
    <PageLayout>
      <div className="flex justify-between items-center">
        <Typography variant="h5">ÜRÜNLER</Typography>
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
