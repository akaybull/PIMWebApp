import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { Delete, FileDownload, Save, Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchCategoryQuery } from "../../../redux/apis/categoriesApi";

const columns = [
  { field: "categoryName", headerName: "Ad", editable: true, flex: 1 },
  {
    field: "Published",
    headerName: "Yayınlandı",
    type: "boolean",
    editable: true,
    width: 120,
  },
  {
    field: "DisplayOrder",
    headerName: "Görüntüleme Sırası",
    type: "number",
    editable: true,
    width: 150,
  },
  {
    field: "save",
    headerName: "Kaydet",
    width: 100,
    renderCell: (params) => (
      <Save
        onClick={() => handleSave(params.row.id)}
        style={{ cursor: "pointer" }}
      />
    ),
  },
  {
    field: "delete",
    headerName: "Sil",
    width: 100,
    renderCell: (params) => (
      <Delete
        onClick={() => handleDelete(params.row.id)}
        style={{ cursor: "pointer" }}
      />
    ),
  },
];

export default function CategoriesTable() {
  const [keyword, setKeyword] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [searchParams, setSearchParams] = useState({
    Keyword: "",
    SkipCount: 0,
    MaxResultCount: 10,
  });

  const { data, error, isLoading, refetch } =
    useSearchCategoryQuery(searchParams);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data?.result?.result) {
      setRows(
        data.result.result.map((item) => ({
          id: item.categoryId,
          categoryName: item.categoryName,
          Published: item.Published || false,
          DisplayOrder: item.DisplayOrder || 0,
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      SkipCount: paginationModel.page * paginationModel.pageSize,
      MaxResultCount: paginationModel.pageSize,
    }));
  }, [paginationModel]);

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kategoriler");
    XLSX.writeFile(workbook, "categories.xlsx");
  };

  const handleSearch = () => {
    setSearchParams((prev) => ({
      ...prev,
      Keyword: keyword,
      SkipCount: 0, // Yeni aramada ilk sayfadan başlamalı
    }));
    setPaginationModel((prev) => ({ ...prev, page: 0 })); // Sayfayı sıfırla
    refetch();
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <Button
        variant="text"
        color="primary"
        startIcon={<FileDownload />}
        onClick={handleExportToExcel}
      >
        Excel'e Aktar
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex w-full gap-2 mb-4">
        <TextField
          variant="outlined"
          size="small"
          label="Kategori Adı"
          className="w-1/2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" endIcon={<Search />} onClick={handleSearch}>
          Ara
        </Button>
      </div>
      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p>Hata: {error.message}</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slots={{ toolbar: CustomToolbar }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
