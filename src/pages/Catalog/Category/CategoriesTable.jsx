import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { Edit, FileDownload, Search } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchCategoryQuery } from "../../../redux/apis/categoriesApi";

const columns = [
  { field: "breadCrumbs", headerName: "Ad", editable: false, flex: 1 },
  {
    field: "edit",
    headerName: "Düzenle",
    width: 100,
    renderCell: (params) => <Edit style={{ cursor: "pointer" }} />,
  },
];

export default function CategoriesTable() {
  const [keyword, setKeyword] = useState("");
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [searchParams, setSearchParams] = useState({
    Keyword: "",
    SkipCount: 0,
    MaxResultCount: paginationModel.pageSize,
  });

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      SkipCount: paginationModel.page * paginationModel.pageSize,
      MaxResultCount: paginationModel.pageSize,
    }));
  }, [paginationModel]);

  const { data, error, isLoading } = useSearchCategoryQuery(searchParams);

  useEffect(() => {
    if (data?.result?.result) {
      setRows(
        data.result.result.items.map((item) => ({
          id: item.categoryId,
          breadCrumbs: item.breadCrumbs,
          coreId: item.coreId,
          parentId: item.parentId,
          categoryName: item.categoryName,
          language: item.language,
        }))
      );
    } else {
      setRows([]);
    }
  }, [data, error]);

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kategoriler");
    XLSX.writeFile(workbook, "Kategoriler.xlsx");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams((prev) => ({
      ...prev,
      Keyword: keyword,
      SkipCount: 0,
    }));
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize }); // Aramada ilk sayfaya dön
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
      <form onSubmit={handleSearch} className="flex w-full gap-2 mb-4">
        <TextField
          variant="outlined"
          size="small"
          label="Kategori Adı"
          className="w-1/2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" endIcon={<Search />} type="submit">
          Ara
        </Button>
      </form>
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
          slots={{ toolbar: CustomToolbar }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
