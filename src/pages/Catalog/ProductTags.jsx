import React from "react";
import PageLayout from "../../components/PageLayout";
import { Typography } from "@mui/material";

const ProductTags = () => {
  return (
    <PageLayout>
      <div className="flex justify-between items-center h-16">
        <Typography variant="h5">ÜRÜN ETİKETLERİ</Typography>
      </div>
    </PageLayout>
  );
};

export default ProductTags;
